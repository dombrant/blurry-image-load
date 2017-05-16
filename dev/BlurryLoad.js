var images = document.getElementsByClassName("blur-image");
//Make an array of each image that has the blur-image class

var dataLargeArray = [];
for (var i = 0; i < images.length; i++) {
  dataLargeArray.push(images[i].getAttribute("data-large"));
}
//Make an array of the data-large attribute for each image with the image-blur class
//This will be a separate array
//because the CSS Filter Fallback below requires the data-large attribute
//be removed from each image

if (!Modernizr.cssfilters) {
  for (var i = 0; i < images.length; i++) {
    images[i].src="";
    images[i].setAttribute("data-large", null);
    images[i].classList.add("no-blur");
    images[i].classList.remove("blur-image");
  }
}
//Fallback for browsers that don't support support CSS filters (mainly IE)
//If the browser doesn't support CSS filters,
//Display a gray background with a shimmer gradient
//To keep it from displaying the image before it's loaded,
//the data-large attribute has to be set to null

function fetchImage (url, image){
  if (!Modernizr.fetch) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    //The request takes three parameters: the type of request, the url to load
    //and a boolean to determine if the request is asynchronous
    xhr.onload = function () {
      if (this.status === 200){
        image.src = url;
        image.classList.add("blur-out");
        image.classList.remove("blur-image");
      }
    };
    xhr.send();
  }
  //Fallback for browsers that don't support fetch
  //Uses an XMLHttpRequest
  else {
    fetch(url, {
      mode: 'cors'})
    .then(function () {
      image.src = url;
      image.classList.add("blur-out");
      image.classList.remove("blur-image");
    });
  }
}
//Primary function to load the images
//After loading the image, it removes the blur with an animation

window.onload = function(){
  for (var i = 0; i < images.length; i++) {
    fetchImage(dataLargeArray[i], images[i]);
  }
};
//Run the fetchImage function for each image once the page has loaded
