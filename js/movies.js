"use strict";

$('#loading').html('<h1>Loading...</h1> <img src=\"assets/loading-circle.gif\" alt="loading-gif">');

var movieList = [];


function updateMovies(movies){
    $('#cards').html('');
    movies.forEach(movie => $('#cards').append("<div class=\"card\" style=\"width: 18rem;\">\n" +
        // "  <img src=\"...\" class=\"card-img-top\" alt=\"...\">\n" +
        "  <div class=\"card-body\">\n" +
        "    <h5 class=\"card-title\"> "+ movie.title + "</h5>\n" +
        "    <p class=\"card-text\">"+ movie.director +"</p>\n" +
        "  </div>\n" +
        "  <ul class=\"list-group list-group-flush\">\n" +
        "    <li class=\"list-group-item\">Genre: "+ movie.genre +"</li>\n" +
        "    <li class=\"list-group-item\">Rating: "+ movie.rating +"</li>\n" +
        "  </ul>\n" +
        "<a href=\"#\" class=\"btn btn-primary deleteButton\">Delete</a>"+
        "</div>")
    )
}

// fetch("https://glitch.com/edit/#!/positive-half-anger?path=db.json%3A14%3A18")
const url = "https://positive-half-anger.glitch.me/movies";
fetch(url)
    .then(response => response.json())
    .then(movies => {
        updateMovies(movies);
        $('#loading').html('');
        movieList += movies;
})

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // add director and genre here
    const title = document.querySelector('#title').value;
    const director = document.querySelector('#director').value;
    const genre = document.querySelector('#genre').value;
    const rating = document.querySelector('#rating').value;
    var newMovie = {
        title,
        director,
        genre,
        rating
    }
    movieList += newMovie;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
});
// $('.updateList').click(updateMovies(movieList));
// console.log(movieList);













