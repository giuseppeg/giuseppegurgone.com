---
layout: post
title: Twitter's div Soup and Uglyfied CSS, Explained
date: 2021/09/01
preview_image: https://user-images.githubusercontent.com/711311/131694366-53640918-907d-4109-9f71-da9600f63253.png
suggested: true
---

Twitter web is a complex application built with [React Native for Web](https://necolas.github.io/react-native-web) – an implementation of the React Native components and APIs for the browser.

React Native for Web provides cross platform primitives that normalize inconsistencies and allow to build web applications that are, among other things, touch friendly.

To the eyes of somebody who's not familiar with the framework, the HTML produced by React Native for Web might look utterly ugly and full of bad practices.

In this blog post we will see how to make sense of this source code and why the authors made some unconventional and controversial choices.

## Primitives

React Native provides a small number of cross platform primitives that are the building blocks for your application. The most important ones are:

- View
- Text
- Image
- Touchable
- Button - implemented with Touchable

To ensure reliable interactions like touch or gestures and to provide a higher degree of compatibility, React Native for Web reimplements some web primitives making sure that semantics and accessibility are preserved if not enhanced.

Because of this some of the primitives compile to `div`, hence the div soup 🍜 that is visible when inspecting twitter.com

Let's look at an example of React Native for Web code with three instances of Text and a Button

<!-- prettier-ignore-->
```jsx
<View>
  <Text accessibilityRole="heading" accessibilityLevel={1}>
    This is a heading
  </Text>
  <Text accessibilityRole="paragraph">
    This is a paragraph
  </Text>
  <Text accessibilityRole="link" href="https://twitter.com">
    This is a link
  </Text>
  <Button onPress={() => {}} title="This is a button" />
</View>
```

Most of this code compiles to divs with appropriate, though sometimes redundant, accessibility attributes:

<!-- prettier-ignore-->
```html
<div class="css-1dbjc4n">
  <h1 dir="auto" aria-level="1" role="heading" class="css-4rbku5 css-901oao">
    This is a heading
  </h1>
  <div dir="auto" role="paragraph" class="css-901oao">
    This is a paragraph
  </div>
  <a href="https://twitter.com" dir="auto" role="link" class="css-4rbku5 css-18t94o4 css-901oao">
    This is a link
  </a>
  <div role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-14sbq61 r-1jkafct r-1loqt21 r-1otgn73 r-1i6wzkk r-lrvibr" style="transition-duration: 0s;">
    <div dir="auto" class="css-901oao r-jwli3a r-majxgm r-edyy15 r-q4m81j r-tsynxw">
      This is a button
    </div>
  </div>
</div>
```

This looks messy but let's see what is going on.

### Accessibility

The accessibility tree produced by our code snippet looks correct, recognising a heading, paragraph, link and a button.

![screenshot of the accessibility tree](https://user-images.githubusercontent.com/711311/131561295-2f1e267f-6d0b-470e-9c38-c506f2156931.png)

The framework author has put in a lot of effort into producing advanced yet accessible components that give us better cross platform primitives.

Cross platform normalization and consistent behavior are crucial or else they’d use web native and semantic elements.

### Elements made of divs

At this point you might be wondering "What's wrong with native elements?" "Why not use web platform primitives that come with semantics and built-in behavior?".

#### Button

Why reimplement a button when the web platform provides one?

The short answer is that the button element [doesn't support flexbox children](https://github.com/necolas/react-native-web/issues/1899) and on touch devices the implementation of the web platform button is not good enough to match the behavior of correspondent mobile native versions.

In a talk called "The Untouchable Web", @rickhanlonii does a superb job at explaining in detail why React Native for Web implements a Button component

<iframe aria-label="youtube embed of the video talk" class="Video" src="https://www.youtube.com/embed/LhKglxQT4sU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Paragraph

Why would you output a div with a paragraph role when you can use a p element instead?

The author provides a reasonable explanation in the [framework docs](https://necolas.github.io/react-native-web/docs/accessibility/#semantic-html):

> The "paragraph" role isn’t mapped to a <p> tag because it’s an HTML conformance error to include block-level children within the element; in React Native for Web both Text and View support block-level children.

## Hashed CSS class names

Looking at the final HTML produced by React Native for Web it is impossible not to notice the abundant amount of hashed CSS class names that goes with every element.

<!-- prettier-ignore-->
```html
<div class="css-18t94o4 css-1dbjc4n r-14sbq61 r-1jkafct r-1loqt21 r-1otgn73 r-1i6wzkk r-lrvibr" style="transition-duration: 0s;" role="button" tabindex="0" >
  <div class="css-901oao r-jwli3a r-majxgm r-edyy15 r-q4m81j r-tsynxw" dir="auto">
    This is a button
  </div>
</div>
```

Let's make sense of these classes.

### Primitive classes

The classes prefixed with `css-` are for CSS rules that define base styles for the View, Text, Image and TextInput primitives.

Imagine those as User Agent styles but for the React Native primitives.

In development the prefix includes the primitive name. For example View will get `css-view-`.

As a developer you write `<View />` and get the following HTML:

<!-- prettier-ignore-->
```html
<div class="css-view-1dbjc4n"></div>
```

### User styles

The other type of class name is the one prefixed with `r-`. These are for styles authored by the consumers of the framework, for example Twitter's engineers.

React Native for Web implements the React Native StyleSheet API and produces atomic CSS class names that are resolved deterministically in application order.

As for primitive classes, in development the prefix includes the CSS property name. For example `r-marginTop-`.

Styles are authored in JavaScript using the `StyleSheet.create` API which accepts an object of name-rule pairs. Developers can then reference rules by name using the dictionary returned by `StyleSheet.create`:

<!-- prettier-ignore -->
```jsx
<View style={styles.foo} />

const styles = StyleSheet.create({
  foo: {
    marginTop: 10
  }
})
```

Styles can be composed by passing an array of rules references to the style prop:

<!-- prettier-ignore -->
```jsx
<View style={[styles.foo, styles.bar]} />
```

You can learn more about styling in React Native for Web by reading the [official documentation](https://necolas.github.io/react-native-web/docs/styling/).

## How can devs make sense of all of this?

Even knowing all the implementation details mentioned above, the disconnect between source code and output can make it hard to use the browser developer tools to debug an application built with React Native for Web.

So how do developers work around this issue?

The answer is "by using more developer tools", specifically the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

The React Developer Tools have first-class support for React Native and come with a panel to inspect primitives and edit styles.

![screenshot of the dev tools where I selected a Text element and edited its styles](https://user-images.githubusercontent.com/711311/131680941-b39ca48f-ff6a-4259-b2c2-434b467021d0.png)

By clicking the eye icon at the top-right corner of the selected element panel, the developers tools can then help us trace down the host DOM element that React Native for Web renders.

![screenshot of the button to inspect the matching DOM element](https://user-images.githubusercontent.com/711311/131682604-3ee8b874-4e52-42dd-a3c9-2034549b4e8d.png)

## Conclusion

While not being a good choice for every kind of website, React Native for Web is a framework that can help developers build better cross platform **applications**.

The not-so human readable source code of twitter.com is the output of a framework that provides new, cross platform primitives which overcome the limitations of similar web platform primitives.

The author of the framework cares about accessibility and building superior cross platform abstractions – they are definitely not a clueless javascripter throwing aria attributes and `role` at divs.

Hopefully the high level explanation in this blog post can help with making sense of twitter.com's HTML and seeing beyond the div soups and ugly CSS class names that show up in the developers tools.

I surely have been learning a lot from the new twitter.com source code and by using this knowledge I have been able to hack on the site to tweak some of its user interface and features in [Refined Twitter Lite](https://github.com/giuseppeg/refined-twitter-lite/blob/master/index.user.js).
