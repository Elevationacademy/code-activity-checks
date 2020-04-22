//DO NOT REMOVE
const movies = require('./movies.json');
//===================================

const findMoviesByDurRange = function (minDur, maxDur) {
  let moviesFound = [];
  for (let movie of movies) {
    if (parseInt(movie.runtime) > minDur && parseInt(movie.runtime) < maxDur) {
      moviesFound.push(movie.title);
    }
  }
  return moviesFound;
};

//DO NOT REMOVE =====================
module.exports = findMoviesByDurRange;
