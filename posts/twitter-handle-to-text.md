---
layout: post
title: Twitter Handle to Text
date: 2022/05/28
---

Sometimes on Twitter you want to type a word that starts with `@` without mentioning the handle.

To do so you can add a zero-width space between `@` and the handle but doing it manually is cumbersome.

That's why I created a boomarklet that simplifies this process. Drag the link below to your Bookmarks Bar, click it and type a handle.

<div style="text-align: center; font-size: 1.2em; margin-top: 1.5em">
  <a href='javascript:window.prompt("", "@\u200B"+window.prompt("type a twitter handle"))'>
    Twitter @handle to text
  </a>
</div>

## Source Code

<!-- prettier-ignore-->
```html
<a href=
  'javascript:window.prompt(
    "",
    "@\u200B"+window.prompt("type a twitter handle")
  )'
>
  Twitter @handle to text
</a>
```
