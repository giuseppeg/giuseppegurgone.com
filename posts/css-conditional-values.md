---
layout: post
title: Conditional CSS Values
date: 2022/07/13
preview_image: https://user-images.githubusercontent.com/711311/178680559-ef18a9a1-4d76-4c5a-8357-f21955b662c5.png
suggested: true
---

CSS lacks a general purpose ternary operator or if/else statements.

However, in many situations there is a small trick that we can use to toggle values using invalid custom properties and fallback values. I learn't this trick from Devon Govett.

Let's say we want to switch `visibility` between `visible` and `hidden` when a custom property is set or unset.

```css
body {
  --switch: on;
}

.widget {
  visibility: /* on ? visible : hidden */ ;
}
```

When `--switch` is `on`, the value for `visibility` should be `visible`, otherwise it should be `hidden`.

Since we know that `visible` is the default value for `visibility`, we can set `visibility` to an invalid value `var(--switch)` so that CSS skips the declaration and the element remains visible.

```css
body {
  --switch: on;
}

.widget {
  /*
   "on" is an invalid value for visiblity
   therefore this declaration is skipped and
   the value for visibility is visible
  */
  visibility: var(--switch);
}
```

Now comes the interesting part. How do we switch to `hidden`?

The answer is with a fallback value that CSS will pick up when the `--switch` property is set to an invalid value!

```css
body {
  /* initial is an invalid value! */
  --switch: initial;
}

.widget {
  /* CSS will fallback to hidden */
  --visibility: var(--switch, hidden);
  visibility: var(--visibility);
}
```

By setting `--switch` to `initial` (a [guaranteed-invalid value](https://www.w3.org/TR/css-variables-1/#invalid-variables)), the `--visibility` property will compute to the fallback `hidden`.

We can therefore switch the value of `--switch` between `on` and `initial` to change visibility!
