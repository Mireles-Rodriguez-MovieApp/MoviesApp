"use strict";

$('#loading').html('<h1>Loading...</h1> <img src=\"assets/loading-circle.gif\">');






// fetch("https://glitch.com/edit/#!/positive-half-anger?path=db.json%3A14%3A18")

fetch("https://positive-half-anger.glitch.me/movies")
    .then(response => response.json())
    .then(movies => movies.forEach(movie => $('#cards').append("<div class=\"card\" style=\"width: 18rem;\">\n" +
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
        "</div>")), $('#loading').html(''))

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // add director and genre here
    const title = document.querySelector('#title').value;
    const rating = document.querySelector('#rating').value;

    // send the new movie data to the server
    fetch('https://positive-half-anger.glitch.me/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, rating })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});






const movieId = 3; //example movie ID
/*
const movieToEdit = movie.find(movie => movie.id === movieId);
*/



const editSubmit = document.querySelector('#editSubmit');
editSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const updatedMovie = {
        title: document.querySelector('#title').value,
        director: document.querySelector('#director').value,
        genre: document.querySelector('#genre').value,
        rating: document.querySelector('#rating').value,
    };

console.log(updatedMovie)
    /*send a PUt request to  update the movie data on the server*/
    fetch(`https://positive-half-anger.glitch.me/movies${movieToEdit.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
    })
        .then(response => response.json())
        .then(data => {
            // Update the movie data in your local "movies" variable
            const index = movie.findIndex(movie => movie.id === movieToEdit.id);
            movies[index] = data;

            // Show a success message to the user
            alert('Movie updated successfully!');
        })
        .catch(error => {
            console.error('Error updating movie:', error);
            alert('An error occurred while updating the movie.');


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
        url: 'https://example.com/movies/' + movieId,
        method: 'PUT',
        data: movieData
    })
        .done(function(response) {
        console.log('Movie updated successfully:', response);
        // Reset the form after successful update
        $('#edit-movie-form')[0].reset();
        // Optionally, update the movie list with the updated movie
    })
        .fail(function(error) {
        console.error('Error updating movie:', error);
    });
    });

        // When a movie is selected, pre-populate the form with its details
        function populateEditForm(movie) {
        $('#movie-id').val(movie.id);
        $('#movie-title').val(movie.title);
            $('#movie-director').val(movie.director);
            $('#movie-genre').val(movie.genre);
        $('#movie-rating').val(movie.rating);
    }
})
});











