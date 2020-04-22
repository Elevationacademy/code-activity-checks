//DO NOT REMOVE
const movies = require('./movies.json');
//===================================

const findNumOfMoviesByActors = function (actors) {
  let moviesFound = [];
  for (let movie of movies) {
    let movieValidation = true;
    for (let actor of actors) {
      if (!movie.actors.includes(actor)) {
        movieValidation = false;
      }
    }
    if (movieValidation) {
      moviesFound.push(movie.title);
    }
  }
  return moviesFound.length;
};

//DO NOT REMOVE =====================
module.exports = findNumOfMoviesByActors;
