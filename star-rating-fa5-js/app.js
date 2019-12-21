// Initial Rating
const ratings = {
  sony: 4.7,
  samsung: 3.4,
  vizio: 2.3,
  panasonic: 3.6,
  phillips: 1.8
}

// Total stars
const starsTotal = 5;

document.addEventListener('DOMContentLoaded', getRatings);

// Form Elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

// Init Porduct
let product;

// Product select change
productSelect.addEventListener('change', (e) => {
  product = e.target.value;
  // console.log(product)
  // Enable Rating COntrol
  ratingControl.disabled = false;
  ratingControl.value = ratings[product];
});

ratingControl.addEventListener('blur', (e) => {
  const rating = e.target.value;
  if(rating > 5){
    alert('Please rate 1 - 5');
    return;
  }
  ratings[product] = rating;
  getRatings();
});

// Get Ratings
function getRatings(){
  for(let rating in ratings){
    // Get percentage
    const starPercentage = ((ratings[rating]) / starsTotal) * 100
    // console.log(starPercentage)

    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage/10) * 10}%`
    // console.log(starPercentageRounded)

    // Set width of stars-inner to percentage

    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

    document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
  }
}