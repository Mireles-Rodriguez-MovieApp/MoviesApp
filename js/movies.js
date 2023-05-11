"use strict";


//loading screen
$('#loading').html('<h1>Loading...</h1> <img src=\"assets/loading-circle.gif\" alt="loading-gif">');
$('.hidden').css('visibility', 'hidden')

let movieList = [];

//make cards function
function card(movies){
    movies.forEach(movie => {
        let poster = ombdcall(movie.title);
        poster.then(function(result) {
            console.log(result)
                $('#cards').append(
                    `<div class="card shadow" style="width: 18rem;" id='${movie.id}'>
                        <img src='${result}' class="card-img-top" alt="...">
                        <div class="card-body bg-#FFD700 mb-3">
                           <h5 class="card-title">${movie.title} </h5>
                           <p class="card-text"> ${movie.director} </p>
                        </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Genre:  ${movie.genre} </li>
                                <li class="list-group-item ">Rating:  ${movie.rating} </li>
                            </ul>
                            <a class="btn btn-primary deleteBtn">Delete</a>
                    </div>`);
        })
    })
}

//update movies function
function updateMovies(){
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movieList = movies;
            $('#loading').html('');
            $('#cards').html('');
            $('.hidden').css('visibility', 'visible')
            card(movies);
        })
}
//fetches and shows movies
const url = "https://positive-half-anger.glitch.me/movies";
updateMovies();

// delete button
$(document).on("click", "a.deleteBtn", function(e){
    e.preventDefault();
    let deleteMovieId = $(this).parent("div").attr("id");
    fetch(`${url}/${deleteMovieId}`, {method: "DELETE"})
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            updateMovies();
        })

})

//Add New Movie
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // adds title director genre and rating
    const title = document.querySelector('#title').value;
    const director = document.querySelector('#director').value;
    const genre = document.querySelector('#genre').value;
    const rating = document.querySelector('#rating').value;
    let newId = movieList[movieList.length]

    var newMovie = {
        title,
        director,
        genre,
        rating,
        id: newId
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(movies =>{
            console.log(movies)
            updateMovies();
        });
});



const editSubmit = document.querySelector('#editSubmit');
editSubmit.addEventListener('click', (event) => {
    event.preventDefault();

            const updatedMovie = {
                title: document.querySelector('#movie-title').value,
                director: document.querySelector('#movie-director').value,
                genre: document.querySelector('#movie-genre').value,
                rating: document.querySelector('#movie-rating').value,
            };
    const movieId = document.querySelector('#movie-title').value;
    fetch(`${url}`).then(res => res.json()).then(movies => {
        movies.forEach(movie => {
            if(movie.title === movieId){
                fetchIndex(movie.id, updatedMovie);
            }
        })
    })


        // When the form is submitted, send an AJAX request to update the movie
        $('#edit-movie-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        var movieId = $('#movie-id').val();
        var movieTitle = $('#movie-title').val();
        var movieDirector = $('#movie-director').val();
        var movieRating = $('#movie-rating').val();
        var movieData = {
        title: movieTitle,
        rating: movieRating
    };
        $.ajax({
        method: 'PUT',
        data: movieData
    })
        .done(function(response) {
        console.log('Movie updated successfully:', response);
        // Reset the form after successful update
        $('#edit-movie-form')[0].reset();
        // Optionally, update the movie list with the updated movie
    })
    });


});
async function ombdcall(movie){
    return await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=` + OMBD_KEY).then(response => response.json()
    ).then(data =>data.Poster)
}


/*added some pseudo code after*/
document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.querySelector("h1");
    const afterElement = h1.querySelector("::after");
    const textWidth = h1.clientWidth + "px";
    afterElement.style.width = textWidth;
});

//fetches the movie based on id and changes it to new movie
function fetchIndex(movieId, editedMovie) {
    fetch(`${url}/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMovie),
    }).then(movies => {
        updateMovies();
    })
}
