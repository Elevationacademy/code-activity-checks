describe('Exercise 3', function () {
  it('findNumOfMoviesByActors function should receive 1 parameter - actors array, and return the number of movies in which all the actors included in', function () {
    try {
      let findNumOfMoviesByActors = require('../../src/exercise3');
      expect(
        findNumOfMoviesByActors(['John Lithgow']),
        `Expected to receive 2 when searching for number of movies with John Lithgow, but received ${JSON.stringify(
          findNumOfMoviesByActors(['John Lithgow'])
        )} instead`
      ).toBe(2);

      expect(
        findNumOfMoviesByActors(['Robert De Niro']),
        `Expected to receive 4 when searching for number of movies with Robert De Niro, but received ${JSON.stringify(
          findNumOfMoviesByActors(['Robert De Niro'])
        )} instead`
      ).toBe(4);

      expect(
        findNumOfMoviesByActors(['David Schwimmer', 'Simon Pegg']),
        `Expected to receive 1 when searching for number of movies with David Schwimmer and Simon Pegg, but received ${JSON.stringify(
          findNumOfMoviesByActors(['David Schwimmer', 'Simon Pegg'])
        )} instead`
      ).toBe(1);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
