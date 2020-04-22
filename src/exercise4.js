//DO NOT REMOVE
const movies = require('./movies.json');
const genres = require('./genres.js');
//===================================

const countMoviesByGenres = function () {
  moviesCount = {}
  for (let genre of genres) {
    for (let movie of movies) {
      if (movie.genres.includes(genre)) {
        if (moviesCount[genre]) {
          moviesCount[genre] ++
        } else {
          moviesCount[genre] = 1
        }
      }
    }
  }
  return moviesCount
};

//DO NOT REMOVE =====================
module.exports = countMoviesByGenres;
