# Blurry Image Load Version 2.0

## Synopsis

A simple library that loads remote images after the page has loaded. Until the images are loaded, a very small version of each image is displayed with a blur filter over it. Inspired by Medium's progressive image loading of a similar style.

If the user's browser doesn't support CSS filters, instead of applying the smaller image and blurring it, a blank, gray shimmer is shown until the full-sized image loads.

## Installation

Download the `blurry-load.min.css` and `blurry-load.min.js` files (found in the `dist` folder) and include in your HTML:

```html
<link rel="stylesheet" href="blurry-load.min.css">
<script src="blurry-load.min.js"></script>
```

## Usage

**NOTE:** If you do not want to see a flash of the tiny, blurry image in browsers that do not support CSS filters, link to the JavaScript file in the `head` tag of your HTML.

For each image that you want to apply the Blurry Load effect, add the class `blurry-load` class to the `<img>` tag in your HTML. Then, the `<img>` tag must have two attributes: an `src` that is the path to the image resized to be smaller, and a `data-large` attribute that is the URL of the full-sized image.

```html
<img class="blurry-load" src="img/image-1-small.jpg" data-large="img/image-1.jpg">
<img class="blurry-load" src="img/image-2-small.jpg" data-large="img/image-2.jpg">
<img class="blurry-load" src="img/image-3-small.jpg" data-large="img/image-3.jpg">
```

**NOTE:** This library does not provide functionality for creating smaller versions of your images. That must be done on your own. For resizing images, I use Preview in macOS and change the width to 40 with the “Scale proportionally” option enabled. For help on how to use Preview to resize images, see [this article](https://support.apple.com/kb/PH5936?locale=en_US). If you want to integrate resizing your images into your build workflow, you can use an image manipulation library like [sharp](https://github.com/lovell/sharp) or a gulp plugin like [gulp-image-resize](https://github.com/scalableminds/gulp-image-resize).

## "What about CSS background images?"

Unfortunately, background images are not yet ready to take advantage of this library's functionality. In calling this library, images are applied a CSS filter to blur them. There is no way to apply the same kind of filter to a background image in CSS, however the [back-drop filter draft](https://drafts.fxtf.org/filter-effects-2/#BackdropFilterProperty) shows hope that this could change in the future. At the time of writing this, it's [browser support](http://caniuse.com/#feat=css-backdrop-filter) is very small.

At the moment, my best recommendation is to make the background of your div the image's dominant color, then in your JavaScript, change the background to your image once the page has loaded. Below is a brief example of how to do this.

In your CSS:

```css
.my-div {
  background: #319ecb;
  /* The dominant color of the image below */
}

.my-div-background-image {
  background: url('img/background.jpg');
}
```

In your JavaScript:

```js
window.onload = () => {
  document.querySelector('.my-div').classList.add('my-div-background-image');
};
```

## Browser Support

Tested to work in Chrome 67+, Firefox 61+ and Safari 11.1+. The only part of this library that has browser support that you should consider is ES2015 syntax (let/const, arrow functions, etc.). If you want to support older browsers, you will have to transpile `blurry-load.min.js` yourself.

Otherwise, this library uses [CSS filters](http://caniuse.com/#feat=css-filters), but this has a fallback in place. For browsers that don't support CSS filters, a blank gray `div` with a shimmer animation is shown before the full sized image is loaded (see the `no-blur` class in `blurry-load.css` for details).

## Contributors

**Dominic Brant**.

[Follow me on Twitter](https://twitter.com/dombrant), and feel free to let me know if you have any thoughts/suggestions/problems.

## License

MIT©

Fork this to your heart's content. :D
