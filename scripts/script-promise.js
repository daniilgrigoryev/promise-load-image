function loadImages (images) {
  // each image will be loaded by this function.
  // it returns a Promise that will resolve once
  // the image has finished loading
  let loader = function (src) {
    return new Promise(function (resolve, reject) {
      let img = new Image();
      img.onload = function () {
        // resolve the promise with our url so it is
        // returned in the result of Promise.all
        resolve(src);
      };
      img.onerror = function (err) {
        reject(err);
      };
      img.src = src;
    });
  };

  // create an image loader for each url
  let loaders = [];
  images.forEach(function (image) {
    loaders.push(loader(image));
  });

  // Promise.all will return a promise that will resolve once all of of our
  // image loader promises resolve
  return Promise.all(loaders);
}


// the images we are going to display
let myImages = [
  'http://www.gifpng.com/400x200',
  'http://www.gifpng.com/400x200/ffffff/000000',
  'http://www.gifpng.com/400x200/000000/ffffff'
];

// $(document).ready(fn) is deprecated,
// use the $(fn) form instead
$(function() {

  // after the images are loaded this will be called with an array of the loaded images
  function cycleImages (images) {
    let index = 0;
    setInterval(function() {
      // since we need an array of the image names to preload them anyway,
      // just load them via JS instead of class switching so you can cut them
      // out of the CSS and save some space by not being redundant
      $('#backgrounds').css('backgroundImage', 'url("' + images[index] + '")');
      // increment, roll over to 0 if at length after increment
      index = (index + 1) % images.length;
    }, 750);
  }


  // load the images and start cycling through them after they are loaded
  loadImages(myImages).then(cycleImages).catch(function (err) {
    console.error(err);
  });
});