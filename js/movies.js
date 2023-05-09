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












