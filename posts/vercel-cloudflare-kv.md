---
layout: post
title: Using Cloudflare KV in Vercel functions
date: 2022/05/21
suggested: true
---

Cloudflare KV is a global, low-latency and eventually-consistent key-value data store.

I am a fan of simple solutions and KV is a good option for storing and reading values.

The easiest way to use KV is from within a Cloudflare Worker which you can roughly describe as a serverless function at the edge.

Generally speaking this is what you would go for, however recently I wanted to interact with KV directly from a Next.js API route or Vercel serverless function.

In this blog post I will walk you through doing exactly that.

## Cloudflare API

It seems that the only way to use KV without Workers is to use the [Cloudflare API](https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair).

To use the API you will need to [create a custom API Token](https://dash.cloudflare.com/profile/api-tokens) with the following configuration:

- Permissions
  - Account / Workers KV Storage / Edit
  - Account / Workers KV Storage / Read
- Account Resources
  - Include / your@email.com's Account

<figure aria-hidden="true">
<img src="https://user-images.githubusercontent.com/711311/169646801-a3c931f0-ac0c-4413-b7e3-9e34ce7f6490.png" alt>
</figure>

You will store the API Token in a [environment variable on Vercel](https://vercel.com/docs/concepts/projects/environment-variables), let's say `CLOUDFLARE_KV_API_TOKEN`. This will be the Bearer token that you pass with the `Authentication` header when making requests to the API.

<!-- prettier-ignore -->
```javascript
await fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.CLOUDFLARE_KV_API_TOKEN}`,
    "Content-Type": "application/json",
  }
})
```

## The KV project and API URL

Now that auth is taken care of we need to create a KV project which is technically called Namespace.

The Namespace is our KV store where we will write and read values from. We'd need its ID to assemble the API URL.

Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces), create a Namespace and grab its ID.

<figure aria-hidden="true">
<img src="https://user-images.githubusercontent.com/711311/169647973-2bf90a0c-2e98-4fb3-bebb-9469662c1f89.png" alt>
</figure>

Finally you need to grab your Account ID which you can find in the [workers overview page](https://dash.cloudflare.com/?to=/:account/workers/overview).

### API URL structure

Now that you have all the necessary information you can assemble the API URL that we will use to write and read.

<!-- prettier-ignore -->
```javascript
const endpoint = (
  key,
  accountID,
  namespaceID
) =>
  `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`;
```

## Read and Write from Serverless functions

Cloudflare offers a REST API therefore we'll be making `PUT` and `GET` requests to write and read respectivly.

Below are sample Vercel functions.

### Read a value from KV

<!-- prettier-ignore -->
```javascript
// /api/read.js
export default async function handler(req, res) {
  const { success, result, errors } = await fetch(endpoint("MY_KEY"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_KV_API_TOKEN}`,
      "Content-Type": "application/json",
    }
  }).then(response => response.json())

// ...
}
```

### Write a value to KV

<!-- prettier-ignore -->
```javascript
// /api/write.js
export default async function handler(req, res) {
  const body = JSON.stringify(req.query.value)
  const { success, result, errors } = await fetch(endpoint("MY_KEY"), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_KV_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body
  }).then(response => response.json())

// ...
}
```

—

That's it. Hope you found this helpful.
