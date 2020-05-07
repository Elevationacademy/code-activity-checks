describe('Exercise 4', function () {
  it('The countMoviesByGenres function should receive no parameter, and return an object with key-value pairs of genre name and number of movies that belong to that genre', function () {
    try {
      let countMoviesByGenres = require('../../src/exercise4');
      expect(
        countMoviesByGenres().Comedy,
        `Expected to receive an object containing a key of 'Comedy' with value of 36 when invoking countMoviesByGenres, but received a value of ${JSON.stringify(
          countMoviesByGenres().Comedy
        )} instead`
      ).toBe(36);

      expect(
        countMoviesByGenres().Thriller,
        `Expected to receive an object containing a key of 'Thriller' with value of 26 when invoking countMoviesByGenres, but received a value of  ${JSON.stringify(
          countMoviesByGenres().Thriller
        )} instead`
      ).toBe(26);

      expect(
        countMoviesByGenres().Horror,
        `Expected to receive an object containing a key of 'Horror' with value of 2 when invoking countMoviesByGenres, but received a value of  ${JSON.stringify(
          countMoviesByGenres().Horror
        )} instead`
      ).toBe(2);

      expect(
        Object.keys(countMoviesByGenres()).length,
        `Expected to receive an object containing 21 key-value pairs, but received an object containing ${JSON.stringify(
          Object.keys(countMoviesByGenres()).length
        )} key-value pairs instead`
      ).toBe(21);

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
