"use strict";

$('#loading').html('<h1>Loading...</h1> <img src=\"assets/loading-circle.gif\" alt="loading-gif">');




function updateMovies(movies){
    $('#cards').html('');
    movies.forEach(movie => {$('#cards').append(
        `<div class="card" style="width: 18rem;" id='${movie.id}'>
       
         <div class="card-body">
            <h5 class="card-title">  ${movie.title} </h5>
           <p class="card-text"> ${movie.director} </p>
        </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Genre:  ${movie.genre} </li>
            <li class="list-group-item">Rating:  ${movie.rating} </li>
          </ul>
        <a class="btn btn-primary deleteBtn">Delete</a>
        </div>`)
    })
}

const url = "https://positive-half-anger.glitch.me/movies";
fetch(url)
    .then(response => response.json())
    .then(movies => {
        updateMovies(movies);
        $('#loading').html('');

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
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
});
// update button

$(document).on("click", "a.deleteBtn", function(e){
    e.preventDefault();
    let deleteMovieId = $(this).parent("div").attr("id");
    fetch(`${url}/${deleteMovieId}`, {method: "DELETE"})
        .then(response => response.json())
        .then(movies => console.log(movies))
        .catch(error => console.log(error))

})














