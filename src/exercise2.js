//DO NOT REMOVE
const movies = require('./movies.json');
//===================================

const findMoviesByYearAndGenre = function (genre, year) {
  let moviesFound = [];
  for (let movie of movies) {
    if (parseInt(movie.year) === year && movie.genres.includes(genre)) {
      moviesFound.push(movie.title);
    }
  }
  return moviesFound;
};

//DO NOT REMOVE =====================
module.exports = findMoviesByYearAndGenre;
