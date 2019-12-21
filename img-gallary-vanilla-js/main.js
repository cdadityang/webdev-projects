const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
const opacity = 0.4;

imgs[0].style.opacity = 0.4;

//The Below is 1 line in ES6
// imgs.forEach(img => img.addEventListener('click', (e)=> current.src = e.target.src));

// This is Old Way method
imgs.forEach(function(img){
  img.addEventListener('click', function(e){
    // Before clicking reset all images opactiy to 1
    imgs.forEach(function(imgReset){
      imgReset.style.opacity = 1;
    });

    //Changing source of main image when clicked
    current.src = e.target.src;

    // Add fade In class
    current.classList.add('fade-in');

    // Remove fade-in class after 0.5 secs
    setTimeout(function(){
      current.classList.remove('fade-in');
    }, 500);

    //Changing opactiy of clicked image
    e.target.style.opacity = opacity;
  });
});