describe('Exercise 3', function () {
  it('findNumOfMoviesByActors function should receive 1 parameter - actors array, and return the number of movies in which all the actors included in', function () {
    let findNumOfMoviesByActors, hasError;
    try {
      findNumOfMoviesByActors = require('../../src/exercise3');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing when trying to import findNumOfMoviesByActors function. Please make sure you are using the correct function name and try again.'
      ).toBeTruthy();
    } else {
      expect(
        findNumOfMoviesByActors(["John Lithgow"]),
        `Expected to receive 2 when searching for number of movies with John Lithgow, but received ${findNumOfMoviesByActors(["John Lithgow"])}' instead`
      ).toBe(2);

      expect(
        findNumOfMoviesByActors(["Robert De Niro"]),
        `Expected to receive 4 when searching for number of movies with Robert De Niro, but received ${findNumOfMoviesByActors(["Robert De Niro"])}' instead`
      ).toBe(4);

      expect(
        findNumOfMoviesByActors(["David Schwimmer", "Simon Pegg"]),
        `Expected to receive 1 when searching for number of movies with David Schwimmer and Simon Pegg, but received ${findNumOfMoviesByActors(["David Schwimmer", "Simon Pegg"])}' instead`
      ).toBe(1);
    }
  });
});
