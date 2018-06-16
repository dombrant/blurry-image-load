// Copied from https://stackoverflow.com/a/11047247

const supportsCSSFilters = enableWebkit => {
  //As I mentioned in my comments, the only render engine which truly supports
  //CSS3 filter is webkit. so here we fill webkit detection arg with its default
  if (enableWebkit === undefined) {
    enableWebkit = false;
  }
  //creating an element dynamically
  const element = document.createElement('text');
  //adding filter-blur property to it
  element.style.cssText =
    (enableWebkit ? '-webkit-' : '') + 'filter: blur(2px)';
  //checking whether the style is computed or ignored
  const test1 = element.style.length != 0;
  //checking for false positives of IE
  //I prefer Modernizr's smart method of browser detection
  const test2 =
    document.documentMode === undefined || document.documentMode > 9; //non-IE browsers, including ancient IEs //IE compatibility moe
  //combining test results
  return test1 && test2;
};

const images = [];

for (let image of document.querySelectorAll('.image-blur')) {
  const currentImage = {
    element: image,
    dataLarge: image.getAttribute('data-large')
  };

  images.push(currentImage);
}
/* Make an array of objects containing each element in the DOM with the image-blur class
and its data-large attribute value */

if (!supportsCSSFilters) {
  for (let image of images.element) {
    image.src = '';
    image.setAttribute('data-large', null);
    image.classList.add('no-blur');
    image.classList.remove('image-blur');
  }
}
/* Fallback for browsers that don't support support CSS filters (mainly IE)
If the browser doesn't support CSS filters,
Display a gray background with a shimmer gradient
To keep it from displaying the image before it's loaded,
the data-large attribute has to be set to null */

window.onload = () => {
  for (let image of images.entries()) {
    const currentImage = new Image();
    currentImage.src = image.dataLarge;

    currentImage.onload = () => {
      image.element.src = currentImage.src;
    };
  }
};
// The main function that loads each image once the page has loaded
