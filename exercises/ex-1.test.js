describe('Exercise 1', function () {
  it('The findMoviesByDurRange function should receive 2 parameters (minDur and maxDur) and return an array with titles of movies which duration is between minDur and maxDur (not included)', function () {
    try {
      let findMoviesByDurRange = require('../../src/exercise1');
      expect(
        findMoviesByDurRange(80, 90),
        `Expected to receive ["Madagascar: Escape 2 Africa", "Madagascar", "Big Nothing", "Ice Age"] when searching for movies between 80 to 90 minutes, but received ${JSON.stringify(
          findMoviesByDurRange(80, 90)
        )} instead. Make sure the order of the given parameters is correct, and that you return an array with the matching movies' titles`
      ).toEqual(['Madagascar: Escape 2 Africa', 'Madagascar', 'Big Nothing', 'Ice Age']);

      expect(
        findMoviesByDurRange(0, 60),
        `Expected to receive [] when searching for movies between 0 to 60 minutes, but received ${JSON.stringify(findMoviesByDurRange(
          0,
          60
        ))} instead. Make sure the order of the given parameters is correct, and that you return an array with the matching movies' titles`
      ).toEqual([]);

      expect(
        findMoviesByDurRange(118, 120),
        `Expected to receive ["Looper", "The Beach", "Match Point", "American History X","Birdman or (The Unexpected Virtue of Ignorance)"] when searching for movies between 118 to 120 minutes, but received ${JSON.stringify(findMoviesByDurRange(
          118,
          120
        ))} instead. Make sure the order of the given parameters is correct, and that you return an array with the matching movies' titles`
      ).toEqual([
        'Looper',
        'The Beach',
        'Match Point',
        'American History X',
        'Birdman or (The Unexpected Virtue of Ignorance)',
      ]);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
