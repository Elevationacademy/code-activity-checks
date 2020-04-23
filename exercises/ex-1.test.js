describe('Exercise 1', function () {
  it('findMoviesByDurRange function should receive 2 parameters (minDur and maxDur) and return an array with titles of movies which duration is between minDur and maxDur (not included)', function () {
    let findMoviesByDurRange, hasError;
    try {
      findMoviesByDurRange = require('../../src/exercise1');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing when trying to import findMoviesByDurRange function. Please make sure you are using the correct function name and try again.'
      ).toBeTruthy();
    } else {
      expect(
        findMoviesByDurRange(80, 90),
        `Expected to receive ['Madagascar: Escape 2 Africa', 'Madagascar', 'Big Nothing', 'Ice Age'] when searching for movies between 80 to 90 minutes, but received ${findMoviesByDurRange(
          80,
          90
        )} instead`
      ).toEqual(['Madagascar: Escape 2 Africa', 'Madagascar', 'Big Nothing', 'Ice Age']);

      expect(
        findMoviesByDurRange(0, 60),
        `Expected to receive [] when searching for movies between 0 to 60 minutes, but received ${findMoviesByDurRange(
          0,
          60
        )} instead`
      ).toEqual([]);

      expect(
        findMoviesByDurRange(118, 120),
        `Expected to receive ['Looper', 'The Beach', 'Match Point', 'American History X','Birdman or (The Unexpected Virtue of Ignorance)'] when searching for movies between 118 to 120 minutes, but received ${findMoviesByDurRange(
          118,
          120
        )} instead`
      ).toEqual([
        'Looper',
        'The Beach',
        'Match Point',
        'American History X',
        'Birdman or (The Unexpected Virtue of Ignorance)',
      ]);
    }
  });
});
