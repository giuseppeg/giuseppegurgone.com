#!/usr/bin/env node
import config from "../config.mjs";
import { getPublicPosts } from "./posts.mjs";

const posts = getPublicPosts();

console.log(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${config.title}</title>
  <subtitle>${config.subtitle}</subtitle>
  <link href="${config.url}feed.xml" rel="self"/>
  <link href="${config.url}"/>
  <updated>${posts[0].date}</updated>
  <id>${config.url}</id>
  <author>
    <name>${config.title}</name>
  </author>
  ${posts.slice(0, 10).reduce(
    (acc, post) => `${acc}<entry>
    <id>${post.slug}</id>
    <title>${post.title}</title>
    <link href="${config.url}${post.slug}"/>
    <updated>${post.date}</updated>
  </entry>`,
    ""
  )}
</feed>`);
