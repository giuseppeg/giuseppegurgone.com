---
layout: post
title: Synchronizing Async Functions in Node.js
date: 2020/12/14
preview_image: https://user-images.githubusercontent.com/711311/102014427-27d9d080-3d56-11eb-923a-d6758810ef60.png
suggested: true
---

Recently I found myself researching for ways to run an async function in the main thread in a blocking and synchronous fashion.

The reason why I went on this journey is that a Babel plugin of mine needs to call an async function to perform some work, but Babel doesn't really provide an asynchronous API and therefore node visitors must be synchronous.

## Shared Memory and Semaphores to the Rescue

Thanks to a brilliant suggestion from [Nicolò Ribaudo](https://twitter.com/NicoloRibaudo), I settled on a solution that involves running the async function in a worker and blocking the main thread with a binary semaphore on a [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) implemented with [Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics).

## Details

At the core of this solution is a [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) that is an object that can be used to create views on shared memory.

Two threads, say main and worker, can share this object without having to transfer it back and forth.

When working on shared memory it is important to synchronize access to it in order to protect shared data from being simultaneously accessed by other threads. This is done via a synchronization primitive called semaphore.

In JavaScript we can use [Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics) to implement semaphores.

If we execute our async function in a worker thread, we can create a semaphore with `Atomics` and force the main thread to wait until the worker notifies us that our async function has been settled, hereby achieving our initial goal to synchronize the async function.

### Implementation

In the main thread

- Create an Int32Array mapped onto a SharedArrayBuffer
- Create an instance of the worker
- Post a message to the worker with a reference to the Int32Array
- Wait (sleep) for the Int32Array to be unlocked by the worker
- Read the message (result) from the worker <u>synchronously</u>

In the worker

- Invoke our async function
- When the async function resolves, post a message to the main thread with the result
- Unlock the Int32Array

Keep in mind that the return value of the async function must be serializable/transferable because the worker has to transfer it to the main thread.

Once the main thread is unblocked, it can read the message containing the result sent by the worker synchronously with Node.js' [receiveMessageOnPort](https://nodejs.org/api/worker_threads.html#worker_threads_worker_receivemessageonport_port).

Here's what this looks like in code:

<!-- prettier-ignore-->
```javascript
// Main Thread
const {
    Worker,
    receiveMessageOnPort,
    MessageChannel,
} = require("worker_threads");
//
function main(...args) {
  const worker = new Worker("./worker.js");
  const signal = new Int32Array(new SharedArrayBuffer(4));
  signal[0] = 0;
  try {
    const subChannel = new MessageChannel();
    worker.postMessage({ signal, port: subChannel.port1, args }, [
        subChannel.port1
    ]);
    // Sleep until the other thread sets signal[0] to 1
    Atomics.wait(signal, 0, 0);
    // Read the message (result) from the worker synchronously
    return receiveMessageOnPort(subChannel.port2).message.result;
  } finally {
    worker.unref();
  }
}
```

<!-- prettier-ignore-->
```javascript
// Worker Thread
const { parentPort } = require("worker_threads");
const asyncFunction = require("./asyncFunction");
//
parentPort.addListener("message", async ({ signal, port, args }) => {
  // This is the async function that we want to run "synchronously"
  const result = await asyncFunction(...args);
  // Post the result to the main thread before unlocking "signal"
  port.postMessage({ result });
  port.close();
  // Change the value of signal[0] to 1
  Atomics.store(signal, 0, 1);
  // This will unlock the main thread when we notify it
  Atomics.notify(signal, 0);
});
```

## Considerations

While blocking the main thread is usually a bad idea and something you might never need to do, I think that the approach I just showed you is very interesting.

This solution relies on two features that are unique to Node.js:

- `Atomics.wait` works in the main thread. In a browser environment this is not allowed and calling this method will result in a `TypeError`
- `receiveMessageOnPort` which is only available since Node.js v12.3.0

Finally in order to make the multi-thread solution blazing fast™️ I had to keep the worker around instead of instantiating it on every invocation of my `main` synchronous function.

## Alternatives

An alternative solution I have been using for a while is to run the async function in a child process which is spawned synchronously with Node's `child_process.spawnSync` and then to read the result from `stdout`.

However, spawning many processes is significantly slower than using threads (a worker).

## An OSS Success Story

This research started when a client hired me to perform an audit of their codebase with the goal of reducing build time in development.

With their financial support I was able to investigate and research for a solution to improve the speed of my open source plugin by 5x💨 &nbsp;and consequently bring their build time <u>from ~2 minutes to ~25 seconds</u>!

In return I decided to start sponsoring Nicolò Ribaudo not only as a way to thank him for taking the time to chat with me about this solution but also to support the outstanding work he has been doing on Babel.

Nicolò is a fellow Italian 🇮🇹 engineer and mathematician. He is a core member of the Babel team, TC39 invited expert and co-author of the [Record and Tuple ECMAScript proposal](https://github.com/tc39/proposal-record-tuple) which I am very excited about.

If you are reading this article there is a good chance that you benefit from his open source work, too. So if you or your company have the means, please consider [sponsoring him on GitHub](https://github.com/sponsors/nicolo-ribaudo)!
