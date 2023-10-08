console.log("Hello");
var dataforDisplay;

const inputdata = document.getElementById('inputData');
const movieDetails = document.getElementById('movieDetails');
const searchResults = document.getElementById('searchResults');
const responseDisplay = document.querySelector('#responseDisplay pre');
const suggestions = document.getElementById('suggestions');
var favList=0;



// function fetchData(){
//     fetch('https://www.omdbapi.com/?apikey=f135a77d&i=tt3896198').then(function(response){
//         console.log(response);
//         return response.json();
//     }).then(function(data) {
//         dataforDisplay = data;

//             const movie = `
           
//        <h2 style="color:white;">${dataforDisplay.Title}</h2>
//        <img src="${dataforDisplay.Poster}" alt="${dataforDisplay.Title} id="poster">
//         <p style="color:white;">${dataforDisplay.Plot}</p>
//         <p >${dataforDisplay.Actors}</p>
//         `;
         

//         movieDetails.innerHTML = movie;
        
        

//         console.log(dataforDisplay);
//     }).catch(function(err){
//        console.log(err);
//     })
// }




function listenFunc(func, delay){
  let  timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        func.apply(this, arguments);
    }, delay);
};

}

// function showDetails(idnumber) {
//     let showmovieId = idnumber;
//     localStorage.setItem("id", showmovieId);
//     console.log(showmovieId ," showmovieId");
//     window.location = "details.html";
// }

// function showDetails(movieId) {
//     // Redirect to the details page with the selected movie ID
//     console.log(movieId, " movieId");
//     window.location.href = `details.html?id=${movieId}`;
// }

function showDetails(movieId) {
    // Redirect to the details page with the selected movie ID
    localStorage.setItem("id", movieId);
    console.log(movieId, " movieId");
    window.location.href = `details.html?id=${movieId}`;
}


async function searchData(){

 const query = inputdata.value;
    

        // Check if the query is not empty
        if (query.trim() !== '') {
            // Construct the OMDB API URL with your API key and query
            const omdbUrl = `https://www.omdbapi.com/?apikey=f135a77d&s=${encodeURIComponent(query)}`;
            
            // Make an AJAX request using the Fetch API
            fetch(omdbUrl)
                .then(response => response.json())
                .then(data => {
                    // Check if the response contains movie data
                    if (data.Search) {
                        // Clear previous suggestions
                        suggestions.innerHTML = '';
                        
                        // Loop through the movie suggestions and display them
                        data.Search.forEach(movie => {
                            const suggestionItem = document.createElement('div');
                            suggestionItem.classList.add('suggestion');
                            
                            // Display the movie title and a "favorite" button
                            suggestionItem.innerHTML = `
                                <div class="displayCard">
                                <span><img src="${movie.Poster}" 
                                onclick="showDetails('${movie.imdbID}')"></span>
                                <br>
                                <h5 class="colorWhite">${movie.Title}</h5> <br>
                                <button class="favorite-button" data-movie="${movie.imdbID}" onclick="onClickToast()">Favorite</button>

                                </div>
                            `;

                         
                            
                            suggestions.appendChild(suggestionItem);

                           
                        });
                    } else {
                        // Handle no search results
                        suggestions.innerHTML = '<p class="colorWhite left35">No results found.</p>';
                    }
                })
                .catch(error => {
                    // Handle API request error
                    console.error('Error:', error);
                    suggestions.innerHTML = '<p>Error fetching data.</p>';
                });
        } else {
            // Clear suggestions if the input is empty
            suggestions.innerHTML = '';
        }
    }

    function addToFavorites(movieId) {
        // Check if the movie is already in favorites
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (existingFavorites.includes(movieId)) {
            alert('This movie is already in your favorites!');
            return; // Don't add it again
        }
    
        // Add the movie to favorites
        existingFavorites.push(movieId);
    
        // Update the 'favoritesList' in the UI
        const favoriteMovieItem = document.createElement('li');
        favoriteMovieItem.innerHTML = `
            <span>${movieId}</span>
            <button class="remove-from-favorites" data-movie="${movieId}">Remove</button>
        `;
        favoritesList.appendChild(favoriteMovieItem);
    
        // Save the updated favorites list to Local Storage
        localStorage.setItem('favorites', JSON.stringify(existingFavorites));
    }
    
    
   
    function removeFromFavorites(movieId) {
        // Get the existing favorites from Local Storage
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
        // Check if the movie is in the favorites list
        const movieIndex = existingFavorites.indexOf(movieId);
        if (movieIndex !== -1) {
            // Remove the movie from the favorites list
            existingFavorites.splice(movieIndex, 1);
    
            // Save the updated favorites list to Local Storage
            localStorage.setItem('favorites', JSON.stringify(existingFavorites));
    
            // Remove the movie from the UI
            const movieItem = document.querySelector(`[data-movie="${movieId}"]`);
           
                    movieItem.parentElement.removeChild(movieItem);
                
             location.reload();
        }
    }
    
   function onClickToast(){
        alert("Movie Is added to Favorites !!");
    }


function initializeApp(){
    // fetchData();
    inputdata.addEventListener('input',listenFunc(searchData ,300));
    // Event listener for clicking on a movie suggestion
     suggestions.addEventListener('click', (e) => {
    if (e.target.classList.contains('favorite-button')) {
        const movie = e.target.dataset.movie;
        addToFavorites(movie);
    }
});

favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-favorites')) {
        const movieId = e.target.dataset.movie;
        console.log('Clicked to remove movie:', movieId); // Add this line
        removeFromFavorites(movieId);
    }
});

}

initializeApp();


// Initialize the app
function init() {
    // Retrieve favorite movies from Local Storage
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Clear the favoritesList to start fresh
    favoritesList.innerHTML = '';

    // Add each favorite movie to the UI
    existingFavorites.forEach(movieId => {
        // You can fetch additional movie details from the API here if needed
        // Then add the movie to the UI
        const favoriteMovieItem = document.createElement('li');
        favoriteMovieItem.innerHTML = `
            <span>${movieId}</span>
            <button class="remove-from-favorites" data-movie="${movieId}">Remove</button>
        `;
        favoritesList.appendChild(favoriteMovieItem);
    });
}

// Run initialization
init();



