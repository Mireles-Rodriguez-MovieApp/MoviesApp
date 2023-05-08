"use strict";








// fetch("https://glitch.com/edit/#!/positive-half-anger?path=db.json%3A14%3A18")

fetch("https://positive-half-anger.glitch.me/movies")
    .then(response => response.json())
    .then(movies => console.log(movies));












