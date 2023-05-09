"use strict";

$('#loading').html('<h1>Loading...</h1> <img src=\"assets/loading-circle.gif\">');






// fetch("https://glitch.com/edit/#!/positive-half-anger?path=db.json%3A14%3A18")

fetch("https://positive-half-anger.glitch.me/movies")
    .then(response => response.json())
    .then(movies => console.log(movies), $('#loading').html(''));

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // add director and genre here
    const title = document.querySelector('#title').value;
    const rating = document.querySelector('#rating').value;

    // send the new movie data to the server
    fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, rating })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});












