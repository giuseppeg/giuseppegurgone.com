---
layout: post
title: Recording Excalidraw Drawing to Video
date: 2021/11/09
---

_Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them_.

Since Excalidraw renders to canvas, it is possible to capture and record drawing to video.

<!-- prettier-ignore -->
```javascript
const canvas = document.querySelector('.excalidraw__canvas');
const stream = canvas.captureStream(30 /* FPS */);
const recorder = new MediaRecorder(stream);
const frames = [];
recorder.ondataavailable = (event) => { frames.push(event.data); };
recorder.onstop = () => {
  stream.getTracks().forEach((track) => track.stop());
  const blob = new Blob(frames, { type: recorder.mimeType });
  const url = URL.createObjectURL(blob);
  window.open(url);
};

// Start recording.
recorder.start();

// Draw something ...

// Stop recording after 5s.
setTimeout(() => {
recorder.stop();
}, 5000);
```

Cool! Drag the link below to the bookmarks bar of your browser, head to [excalidraw.com](excalidraw.com) and press the bookmarked button to start recording. To stop press the button again ✨

<p style="text-align:center;">→ <a href="javascript:(function(){if(window._excalidrawRecorder)return window._excalidrawRecorder.stop(),void delete window._excalidrawRecorder;const e=document.querySelector('.excalidraw__canvas').captureStream(30),a=new MediaRecorder(e),r=[];a.ondataavailable=(e=>{r.push(e.data)}),a.onstop=(()=>{e.getTracks().forEach(e=>e.stop());const o=new Blob(r,{type:a.mimeType}),c=URL.createObjectURL(o);window.open(c)}),window._excalidrawRecorder=a,a.start()}());">Excalidraw Record</a> ←</p>

<video class="Video" width="700" height="525" controls autoplay>
  <source src="https://user-images.githubusercontent.com/711311/140911521-2157fc9c-ac10-4488-9c81-241098aee11e.mov" />
</video>
