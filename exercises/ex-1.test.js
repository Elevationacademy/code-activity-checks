const path = require('path');
const fs = require('fs');

describe('Exercise 1', function () {
  it(`You should use the 'forEach', 'map', and 'find' methods`, function () {
    const exercise1Content = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'exercise1.js'),
      'utf8'
    );
    expect(
      exercise1Content.includes('forEach'),
      `exercise1.js does not contain the 'forEach' method. Reminder: you should use the 'forEach' method in your code`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('map'),
      `exercise1.js does not contain the 'map' method. Reminder: you should use the 'map' method in your code`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('find'),
      `exercise1.js does not contain the 'find' method. Reminder: you should use the 'find' method in your code`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('=>'),
      `exercise1.js does not contain an arrow function. Reminder: you should use the '=>' sign to create an arrow function inside at least one of the array methods`
    ).toBeTruthy();
  });

  it(`The movies array should be modified - the type of the 'runtime' property should be a number and not a string`, function () {
    try {
      const movies = require('../../src/exercise1').movies;
      for (let movie of movies) {
        expect(
          typeof movie.runtime,
          `At least one of the movies in the 'movies' array was not modified, and its 'runtime' property did not change from a string to a number. Rememeber to use the 'forEach' method to change the type of the 'runtime' property from a string to a number for each movie in the array.`
        ).toBe('number');
      }
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
  it(`The 'selectedMovie' should be an object with the correct 'title' property`, function () {
    try {
      const selectedMovie = require('../../src/exercise1').selectedMovie;
      expect(
        selectedMovie.title,
        `Expected for 'selectedMovie' to have a 'title' property of 'Shogun', but instead it is - ${selectedMovie.title}`
      ).toBe('Shogun');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'selectedMovie' should be an object with the correct 'runtime' property`, function () {
    try {
      const selectedMovie = require('../../src/exercise1').selectedMovie;
      expect(
        typeof selectedMovie.runtime,
        `Expected for 'selectedMovie' to have a 'runtime' property of type number, but instead it is of type ${typeof selectedMovie.runtime}`
      ).toBe('number');
      expect(
        selectedMovie.runtime,
        `Expected for 'selectedMovie' to have a 'runtime' property with value 60, but instead the value is - ${selectedMovie.runtime}`
      ).toBe(60);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
