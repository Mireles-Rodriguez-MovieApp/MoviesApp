"use strict";


//loading screen
$('#loading').html('<h1>Loading...</h1> <img src=\"assets/loading-circle.gif\" alt="loading-gif">');
$('.hidden').css('display', 'none')

let movieList = [];
//make cards function
function card(movies){
    console.log(movies);
    // try it out: use for loop to go in order of the movies
    // movie[i] is the one being appended
    movies.forEach(movie => {
        let poster = ombdcall(movie.title);
        poster.then(function(result) {
            console.log(result)
                $('#cards').append(
                    `<div class="card" style="width: 18rem;" id='${movie.id}'>
                        <img src='${result}' class="card-img-top" alt="...">
                        <div class="card-body">
                           <h5 class="card-title">${movie.id}.  ${movie.title} </h5>
                           <p class="card-text"> ${movie.director} </p>
                        </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Genre:  ${movie.genre} </li>
                                <li class="list-group-item">Rating:  ${movie.rating} </li>
                            </ul>
                            <a class="btn btn-primary deleteBtn">Delete</a>
                    </div>`);
        })
    })
    // for( let i = 0; i<movies.length; i++){
    //     let poster = ombdcall(movies[i].title);
    //     poster.then(function(result) {
    //         console.log(result)
    //         $('#cards').append(
    //             `<div class="card" style="width: 18rem;" id='${movies[i].id}'>
    //                     <img src='${result}' class="card-img-top" alt="...">
    //                     <div class="card-body">
    //                        <h5 class="card-title">${movies[i].id}.  ${movies[i].title} </h5>
    //                        <p class="card-text"> ${movies[i].director} </p>
    //                     </div>
    //                         <ul class="list-group list-group-flush">
    //                             <li class="list-group-item">Genre:  ${movies[i].genre} </li>
    //                             <li class="list-group-item">Rating:  ${movies[i].rating} </li>
    //                         </ul>
    //                         <a class="btn btn-primary deleteBtn">Delete</a>
    //                 </div>`);
    //     })
    // }
}

//update movies function
function updateMovies(){
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movieList = movies;
            $('#loading').html('');
            $('#cards').html('');
            $('.hidden').css('display', 'inline-block')
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

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Example event listener for a button that shows the modal
    const showModalButton = document.querySelector('#editSubmit');
    showModalButton.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    });

    // adds title director and genre 
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

    const movieId = document.querySelector('#movie-number').value;

    /*send a Put request to  update the movie data on the server*/
    fetch(`${url}/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
    }).then(movies =>{
        console.log(movies)
        updateMovies();
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











