# Blurry Load Version 1.1.2
## Synopsis
A simple library that loads images asynchronously after the page has loaded. Until the images are loaded, a very small version of each image is displayed with a blur filter over it. Inspired by Medium's progressive image loading of a similar style.

## Dependencies
This libary's only dependency is a custom Modernizr script, found in `dist/lib`. This is used to apply fallbacks for CSS Filters and Fetch.

Built with vanilla Javascript, no need for JQuery.

## Installation

Download the `BlurryLoad.min.css` and `BlurryLoad.min.js` files (found in `dist`) and the `Modernizr-custom.js` file (found in `dist/lib`). Include them in your HTML (be sure to include `Modernizr-custom.js` **before** `BlurryLoad.min.js`).

```
<link rel="stylesheet" href="BlurryLoad.min.css">
<script src="modernizr-custom.js"></script>
<script src="BlurryLoad.min.js"></script>
```

## Usage
For each image that you want to apply the Blurry Load effect, add the class `image-blur` class to the `<img>` tag in your HTML. Then, the `<img>` tag must have two attributes: an `src` that is the path to the image resized to be smaller, and a `data-large` attribute that is the URL of the full-sized image.

```
<img class="image-blur" src="img/Image1small.jpg" data-large="img/Image1Full.jpg">
<img class="image-blur" src="img/Image2small.jpg" data-large="img/Image2Full.jpg">
<img class="image-blur" src="img/Image3small.jpg" data-large="img/Image3Full.jpg">
```

For resizing the images, I use Preview in macOS and change the width to 40 with the “Scale proportionally” option enabled. For help on how to use Preview to resize images, see [this article](https://support.apple.com/kb/PH5936?locale=en_US).

If the user's browser doesn't support CSS Filters, instead of applying the smaller image and blurring it, a blank, gray shimmer is shown until the full-sized image loads.

## Browser Support
Tested to work in Safari 10.1+ and Chrome 58+. The only two parts of this library that have browser support to consider are [CSS Filters](http://caniuse.com/#feat=css-filters) and [Fetch](http://caniuse.com/#feat=fetch). Both of these have fallbacks for older browsers. For browsers that don't support CSS Filters, a blank gray image is used instead of blurring the image before it is loaded. For browsers that don't support the JavaScript Fetch API, a good old XMLHttpRequest is used to load the images instead.

## Contributors
**Dominic Brant**.

[Follow me on Twitter](https://twitter.com/dombrant), and feel free to let me know if you have any thoughts/suggestions/problems.

## License

MIT©

Fork this to your heart's content. :D
