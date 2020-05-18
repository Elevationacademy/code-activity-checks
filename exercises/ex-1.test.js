const path = require('path');
const fs = require('fs');

describe('Exercise 1', function () {
  it(`Should contain the 'forEach', 'filter', 'map', and 'find' methods`, function () {
    const exercise1Content = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'exercise1.js'),
      'utf8'
    );
    expect(
      exercise1Content.includes('forEach'),
      `exercise1.js do not contain the 'forEach' method. Reminder: you should use the 'forEach' method in your code}`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('filter'),
      `exercise1.js do not contain the 'filter' method. Reminder: you should use the 'filter' method in your code}`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('map'),
      `exercise1.js do not contain the 'map' method. Reminder: you should use the 'map' method in your code}`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('find'),
      `exercise1.js do not contain the 'find' method. Reminder: you should use the 'find' method in your code}`
    ).toBeTruthy();
    expect(
      exercise1Content.includes('=>'),
      `exercise1.js do not contain an arrow function. Reminder: you should use the '=>' sign to create an arrow function inside at least one of the array method`
    ).toBeTruthy();
  });

  it(`selectedMovie should be an object with a correct 'title' property`, function () {
    try {
      const selectedMovie = require('../../src/exercise1');
      expect(
        selectedMovie.title,
        `Expected for selectedMovie to have a 'title' property of 'Shogun', but instead it is - ${selectedMovie.title}`
      ).toBe('Shogun');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`selectedMovie should be an object with a correct 'runtime' property`, function () {
    try {
      const selectedMovie = require('../../src/exercise1');
      expect(
        typeof selectedMovie.runtime,
        `Expected for selectedMovie to have a 'runtime' property of a number type, but instead it is a ${typeof selectedMovie.runtime} type. rememeber to use the 'forEach' method to change the type of 'runtime' property from a string to a number`
      ).toBe('number');
      expect(
        selectedMovie.runtime,
        `Expected for selectedMovie to have a 'runtime' property of 60, but instead it is - ${selectedMovie.runtime}`
      ).toBe(60);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
