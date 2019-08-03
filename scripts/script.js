var srcImage = './images/image_load_full.jpg';
var sectionBG = document.getElementsByClassName('promo-screen')[0];


function loadImage (image) {
  // image will be loaded by this function.
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


  // Promise.all will return a promise that will resolve once all of of our
  // image loader promises resolve
  return Promise.resolve(loader(image));
}

function setBackground(image) {
  // sectionBG.classList.add('image_load_full'); // additin class
  sectionBG.style.backgroundImage = 'url("' + image + '")';  // additin class
}


document.addEventListener('DOMContentLoaded', function(){
  loadImage(srcImage).then(setBackground).catch(function (err) {
    console.error(err);
  });
});
