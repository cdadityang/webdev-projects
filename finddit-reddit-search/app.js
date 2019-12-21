const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', e => {

	// Get Search Term
	const searchTerm = searchInput.value;
	// console.log(searchTerm);
	const sortBy = document.querySelector('input[name="sortby"]:checked').value;
	
	const searchLimit = document.getElementById('limit').value;

	// Check Input - Empty
	if(searchTerm === ''){
		// Show Msg
		showMessage('Please add a search term!', 'alert-danger')
	}

	// CLear Input
	searchInput.value = '';

	//Search Reddit
	axios.get(`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
  	.then(function (response) {
    	// console.log(response.data.data.children);
    	// console.log(response.data.data.children.map(data => data.data));
    	results = response.data.data.children.map(data => data.data);
    	let output = '<div class="card-columns">';
    	// Loop through posts
    	results.forEach(post => {
    		// check for image
    		let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
    		output += `
    			<div class="card">
					  <img class="card-img-top" src="${image}" alt="Card image cap">
					  <div class="card-body">
					    <h5 class="card-title">${post.title}</h5>
					    <p class="card-text">${truncateText(post.selftext, 100)}</p>
					    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
					    <hr />
					    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
					    <span class="badge badge-dark">Score: ${post.score}</span>
					  </div>
					</div>
    		`;
    	});
    	output += '</div>'
    	document.getElementById('results').innerHTML = output;
  	})
  	.catch(function (error) {
    	console.log(error);
  });

	e.preventDefault();
});


function showMessage(message, className){
	// Create Div
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));

	// Get parent container and put before search
	const searchContainer = document.getElementById('search-container');
	const search = document.getElementById('search');

	searchContainer.insertBefore(div, search);

	// Time out
	setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function truncateText(text, limit){
	const shortened = text.indexOf(' ', limit);
	if(shortened == -1) return text;
	return text.substring(0, shortened);
}