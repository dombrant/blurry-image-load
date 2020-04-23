# Blurry Image Load

## Synopsis

A simple library that loads images on demand. Until the images are loaded, a very small version of each image is displayed with a blur filter over it. Inspired by Medium's progressive image loading of a similar style. Below is an example:

![blur effect example](img/blur-effect.gif)

If the user's browser doesn't support CSS filters, a blank, gray shimmer is shown until the full-sized image loads. Below is an example:

![shimmer effect example](img/shimmer-effect.gif)

[Click here to see a live demo](https://dombrant.github.io/blurry-image-load/)

## Installation

Download the `blurry-load.min.css` and `blurry-load.min.js` files (found in the `dist` folder) and include them in your HTML:

```html
<link rel="stylesheet" href="blurry-load.min.css" />
<script src="blurry-load.min.js"></script>
```

**NOTE:** If you do not want to see a flash of the tiny, pixelated image in browsers that do not support CSS filters, link to the JavaScript file in the `head` tag of your HTML.

## Usage

In your JavaScript, create an instance of the `BlurryImageLoad` class:

```js
const blurryImageLoad = new BlurryImageLoad();
```

The class has one function, `load`. If you want to call the function once and have it load all of your images, add the class `blurry-load` to every `<img>` tag in your HTML. Then, the `<img>` tag must have two attributes: an `src` that is the path to the image resized to be smaller, and a `data-large` attribute that is the URL of the full-sized image. That implementation looks like this:

```html
<img
  class="blurry-load"
  src="img/image-1-small.jpg"
  data-large="img/image-1.jpg"
/>
```

```js
blurryImageLoad.load();
```

Alternatively, the `load` function can be called by passing an array of the element(s) you would like to load:

```js
blurryImageLoad.load([
  document.querySelector(".img-1"),
  document.querySelector(".img-2"),
  document.querySelector(".img-3"),
]);
```

One possible implemention would be to pair this with the IntersectionObserver API to load each image as it comes into the viewport.

**NOTE:** The argument must be passed as an array, even if you are only passing one element.

This library does NOT provide functionality for creating smaller versions of your images. That must be done on your own. For resizing images, I use Preview in macOS and change the width to 50px with the “Scale proportionally” option enabled. For help on how to use Preview to resize images, see [this article](https://support.apple.com/kb/PH5936?locale=en_US). If you want to integrate resizing your images into your build workflow, you can use an image manipulation library like [sharp](https://github.com/lovell/sharp) or a Gulp plugin like [gulp-image-resize](https://github.com/scalableminds/gulp-image-resize).

## "What about background images?"

Unfortunately, background images are not yet ready to take advantage of this library's functionality. In calling this library, images are applied a CSS filter to blur them. There is no way to apply the same kind of filter to a background image in CSS, however the [back-drop filter draft](https://drafts.fxtf.org/filter-effects-2/#BackdropFilterProperty) shows hope that this could change in the future. At the time of writing this, its [browser support](http://caniuse.com/#feat=css-backdrop-filter) is very small.

At the moment, my best recommendation is to make the background of your `div` the image's dominant color, then in your JavaScript, change the background to your image once the page has loaded. Below is a brief example of how to do this.

In your CSS:

```css
.my-div {
  background: #319ecb;
  /* The dominant color of the image below */
}

.my-div-background-image {
  background: url("img/background.jpg");
}
```

In your JavaScript:

```js
window.onload = () => {
  document.querySelector(".my-div").classList.add("my-div-background-image");
};
```

## Browser Support

Tested to work in the latest version of Chrome, Firefox, Edge, and Safari. The only part of this library that has browser support that you should consider is ES2015 syntax (let/const, classes, etc.). If you want to support older browsers, you will have to transpile `blurry-load.min.js` yourself.

Otherwise, this library uses [CSS filters](http://caniuse.com/#feat=css-filters), but this has a fallback in place. For browsers that don't support CSS filters, a blank gray `div` with a shimmer animation is shown before the full sized image is loaded (see the `no-blur` class in `blurry-load.css` for details).

## Contributors

**Dominic Brant**.

[Follow me on Twitter](https://twitter.com/dombrant), and feel free to let me know if you have any thoughts/suggestions/problems.

## License

MIT©

Fork this to your heart's content. :D
