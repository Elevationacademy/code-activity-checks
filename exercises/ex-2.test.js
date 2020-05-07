describe('Exercise 2', function () {
  it('The findMoviesByYearAndGenre function should receive 2 parameters (year and genre) and return an array with titles of movies with year and genre matching the parameters', function () {
    try {
      let findMoviesByYearAndGenre = require('../../src/exercise2');
      expect(
        findMoviesByYearAndGenre(2002, 'Animation'),
        `Expected to receive ["Ice Age"] when searching for movies with year of 2002 and genre of Animation, but received ${JSON.stringify(
          findMoviesByYearAndGenre(2002, 'Animation')
        )} instead. Make sure the order of the given parameters is correct, and that you return an array with the matching movies' titles`
      ).toEqual(['Ice Age']);

      expect(
        findMoviesByYearAndGenre(2003, 'History'),
        `Expected to receive ["The Last Samurai"] when searching for movies with year of 2003 and genre of History, but received ${JSON.stringify(
          findMoviesByYearAndGenre(2003, 'History')
        )} instead. Make sure the order of the given parameters is correct, and that you return an array with the matching movies' titles`
      ).toEqual(['The Last Samurai']);

      expect(
        findMoviesByYearAndGenre(2007, 'Family'),
        `Expected to receive ["Ratatouille", "Stardust"] when searching for movies with year of 2007 and genre of Family, but received ${JSON.stringify(
          findMoviesByYearAndGenre(2007, 'Family')
        )} instead. Make sure the order of the given parameters is correct, and that you return an array with the matching movies' titles`
      ).toEqual(['Ratatouille', 'Stardust']);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
