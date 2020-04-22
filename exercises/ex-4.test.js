describe('Exercise 4', function () {
  it('countMoviesByGenres function should receive no parameter, and return an object with key-value pairs of genre and number of movies that belong to that genre', function () {
    let countMoviesByGenres, hasError;
    try {
      countMoviesByGenres = require('../../src/exercise4');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing when trying to import countMoviesByGenres function. Please make sure you are using the correct function name and try again.'
      ).toBeTruthy();
    } else {
      expect(
        countMoviesByGenres().Comedy,
        `Expected to receive an object containing a key of 'Comedy' with value of 36 when invoking countMoviesByGenres, but received '${countMoviesByGenres()}' instead`
      ).toBe(36);

      expect(
        countMoviesByGenres().Thriller,
        `Expected to receive an object containing a key of 'Thriller' with value of 26 when invoking countMoviesByGenres, but received '${countMoviesByGenres()}' instead`
      ).toBe(26);

      expect(
        countMoviesByGenres().Horror,
        `Expected to receive an object containing a key of 'Horror' with value of 2 when invoking countMoviesByGenres, but received '${countMoviesByGenres()}' instead`
      ).toBe(2);
    }
  });
});
