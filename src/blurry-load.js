//@preserve Blurry Image Load

// Copied from https://stackoverflow.com/a/11047247
const supportsCSSFilters = (enableWebkit) => {
  //As I mentioned in my comments, the only render engine which truly supports
  //CSS3 filter is webkit. so here we fill webkit detection arg with its default
  if (enableWebkit === undefined) {
    enableWebkit = false;
  }
  //creating an element dynamically
  const element = document.createElement("test");
  //adding filter-blur property to it
  element.style.cssText =
    (enableWebkit ? "-webkit-" : "") + "filter: blur(2px)";
  //checking whether the style is computed or ignored
  const test1 = element.style.length != 0;
  //checking for false positives of IE
  //I prefer Modernizr's smart method of browser detection
  const test2 =
    document.documentMode === undefined || document.documentMode > 9;
  //non-IE browsers, including ancient IEs
  //IE compatibility mode
  //combining test results
  return test1 && test2;
};

class BlurryImageLoad {
  constructor() {
    this.images = this.createImagesArray();
  }

  createImagesArray() {
    const images = [];

    for (let image of document.querySelectorAll(".blurry-load")) {
      const currentImage = {
        element: image,
        dataLarge: image.getAttribute("data-large"),
      };

      images.push(currentImage);
    }

    return images;
    /* Make an array of objects containing each element in the DOM with the blurry-load class
    and its data-large attribute value */
  }

  load(imagesToLoad = this.images) {
    if (!supportsCSSFilters(true) && !supportsCSSFilters(false)) {
      /* If the browser does not support CSS filters
        Checks with and without the -webkit- prefix */
      for (let image of imagesToLoad) {
        image.element.src = "";
        image.element.classList.add("no-blur");
        image.element.classList.remove("blurry-load");
      }
    }
    /* Fallback for browsers that don't support support CSS filters (mainly IE)
      If the browser doesn't support CSS filters,
      display a gray background with a shimmer gradient (see the CSS class no-blur for details) */

    for (let image of imagesToLoad) {
      const currentImage = new Image();
      currentImage.src = image.dataLarge;

      currentImage.onload = () => {
        image.element.src = currentImage.src;
        image.element.classList.add("blur-out");
        image.element.classList.remove("blurry-load");
      };
    }
    // The main function that loads each image once the page has loaded
  }
}
