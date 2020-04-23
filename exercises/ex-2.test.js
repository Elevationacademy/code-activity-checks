describe('Exercise 2', function () {
  it('findMoviesByYearAndGenre function should receive 2 parameters (year and genre) and return an array with titles of movies with matching year and genre', function () {
    let findMoviesByYearAndGenre, hasError;
    try {
      findMoviesByYearAndGenre = require('../../src/exercise2');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing when trying to import findMoviesByYearAndGenre function. Please make sure you are using the correct function name and try again.'
      ).toBeTruthy();
    } else {
      expect(
        findMoviesByYearAndGenre(2002, 'Animation'),
        `Expected to receive ['Ice Age'] when searching for movies with year of 2002 and genre of Animation, but received ${findMoviesByYearAndGenre(
          2002,
          'Animation'
        )} instead`
      ).toEqual(['Ice Age']);

      expect(
        findMoviesByYearAndGenre(2003, 'History'),
        `Expected to receive ['The Last Samurai'] when searching for movies with year of 2003 and genre of History, but received ${findMoviesByYearAndGenre(
          2003,
          'History'
        )} instead`
      ).toEqual(['The Last Samurai']);

      expect(
        findMoviesByYearAndGenre(1974, 'Mystery'),
        `Expected to receive ['Chinatown'] when searching for movies with year of 2003 and genre of History, but received ${findMoviesByYearAndGenre(
          1974,
          'Mystery'
        )} instead`
      ).toEqual(['Chinatown']);
    }
  });
});
