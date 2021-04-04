//@preserve Blurry Image Load

class BlurryImageLoad {
  supportsCSSFilters(enableWebkit) {
    // Copied from https://stackoverflow.com/a/11047247
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
  }

  load(...images) {
    // Make all DOM elements with the class blurry-load the default value of the images parameter
    if (images.length === 0) {
      images = document.querySelectorAll(".blurry-load");
    }

    /* Fallback for browsers that don't support support CSS filters (mainly IE)
      If the browser doesn't support CSS filters,
      display a gray background with a shimmer gradient (see the CSS class no-blur for details) */
    if (!this.supportsCSSFilters(true) && !this.supportsCSSFilters(false)) {
      /* If the browser does not support CSS filters
        Checks with and without the -webkit- prefix */
      for (let image of images) {
        image.src = "";
        image.classList.add("no-blur");
        image.classList.remove("blurry-load");
      }
    }

    for (let image of images) {
      const currentImage = new Image();
      currentImage.src = image.getAttribute("data-large");

      // The main function that loads each image once the page has loaded
      currentImage.onload = () => {
        image.src = currentImage.src;
        image.classList.add("blur-out");
        image.classList.remove("blurry-load");
      };
    }
  }
}
