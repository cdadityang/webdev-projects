//Global Vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

//Get media stream
navigator.mediaDevices.getUserMedia({
  video: true, audio: false
}).then(function(stream){
    //Link to video src
    video.srcObject = stream;
    //Play video
    video.play();
  })
  .catch(function(err){
    console.log(`Error: ${err}`);
  });

//Play when ready
video.addEventListener('canplay', function(e){
  if(!streaming){
    // set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    streaming = true;
  }
}, false);

// Photo Button Even
photoButton.addEventListener('click', function(e){
  takePicture();
  e.preventDefault();
}, false);


// FIlter Event
photoFilter.addEventListener('change', function(e){
  // Set filter to chosen option
  filter = e.target.value;
  // FIlter to video
  video.style.filter = filter;
  e.preventDefault();
}, false);

// Clear button Event
clearButton.addEventListener('click', function(e){
  photos.innerHTML = '';
  //Change filter back to normal
  filter = 'none';
  video.style.filter = filter;
  photoFilter.selectedIndex = 0;
  e.preventDefault();
}, false);

// Take Pic  from canvas
function takePicture(){
  //create Canvas
  const context = canvas.getContext('2d');
  if(width && height){
    //set canvas props
    canvas.width = width;
    canvas.height = height;
    // Draw an image of video in the canvas
    context.drawImage(video, 0,0, width, height);

    // Create Image from canvas
    const imgUrl = canvas.toDataURL('image/png');
    //console.log(imgUrl);

    // Create img element
    const img = document.createElement('img');
    //Set img source
    img.setAttribute('src', imgUrl);

    //Set image filter
    img.style.filter = filter;

    // Add image to photos
    photos.appendChild(img);
  }
}