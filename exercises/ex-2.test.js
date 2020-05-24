describe('Exercise 2', function () {

  it(`moviesModule should return 'addMovie', 'getMovies', 'deleteMovie', and 'modifyMovies' functions`, function () {
    try {
      const { moviesModule} = require('../../src/exercise2');
      const m = moviesModule()
      expect(m.addMovie, "moviesModule do not return a 'addMovie' function. Make sure you return an object with 'addMovie' key-value").toBeTruthy()
      expect(m.getMovies, "moviesModule do not return a 'getMovies' function. Make sure you return an object with 'getMovies' key-value").toBeTruthy()
      expect(m.deleteMovie, "moviesModule do not return a 'deleteMovie' function. Make sure you return an object with 'deleteMovie' key-value").toBeTruthy()
      expect(m.modifyMovies, "moviesModule do not return a 'modifyMovies' function. Make sure you return an object with 'modifyMovies' key-value").toBeTruthy()
      expect(typeof(m.addMovie), `moviesModule do not return a 'addMovie' function. The type of 'addMovie' is ${typeof(m.addMovie)} instead of a 'function'`).toBe('function')
      expect(typeof(m.getMovies), `moviesModule do not return a 'getMovies' function. The type of 'getMovies' is ${typeof(m.getMovies)} instead of a 'function'`).toBe('function')
      expect(typeof(m.deleteMovie), `moviesModule do not return a 'deleteMovie' function. The type of 'deleteMovie' is ${typeof(m.deleteMovie)} instead of a 'function'`).toBe('function')
      expect(typeof(m.modifyMovies), `moviesModule do not return a 'modifyMovies' function. The type of 'modifyMovies' is ${typeof(m.modifyMovies)} instead of a 'function'`).toBe('function')

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesModule should return an 'addMovie' function which push a movie string to the 'movies' array and a 'getMovies' function which return the 'movies' array`, function () {
    try {
      const { moviesModule} = require('../../src/exercise2');
      const m = moviesModule()
      m.addMovie('Star Trek')
      const movies = m.getMovies()
      expect(movies, `Expected to get ["The Godfather", "Back to the Future", "Star Trek"] after invoking the 'addMovie' function with the movie "Star Trek" and then invoking the 'getMovies' function, but instead got - ${JSON.stringify(movies)}.  Make sure you create an 'movies' array inside the 'moviesModule' with ['The Godfather', 'Back to the Future'], and that 'addMovie' function push a parameter that was received to that array`).toEqual(['The Godfather', 'Back to the Future', 'Star Trek'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesModule should return an 'deleteMovie' function which find a given movie in the 'movies' array and delete it`, function () {
    try {
      const { moviesModule} = require('../../src/exercise2');
      const m = moviesModule()
      m.deleteMovie('The Godfather')
      const movies = m.getMovies()
      expect(movies, `Expected to get ["Back to the Future"] after invoking the 'deleteMovie' function with the movie 'The Godfather' and then invoking the 'getMovies' function, but instead got - ${JSON.stringify(movies)}.  Make sure you create an 'movies' array inside the 'moviesModule' with ['The Godfather', 'Back to the Future'], and that 'deleteMovie' function can receive a movie as a parameter, find it in the 'movies' array and delete it (use 'splice' function)`).toEqual(['Back to the Future'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`makeSequal function should receive an array of strings and add ': Part II' to each one of them`, function () {
    try {
      const { makeSequal} = require('../../src/exercise2');
      const movies = ['The Godfather', 'Back to the Future']
      makeSequal(movies)
      expect(movies, `Expected to get ["The Godfather: Part II", "Back to the Future: Part II"] after invoking the 'makeSequal' function with an array of ["The Godfather", "Back to the Future"], but instead got - ${JSON.stringify(movies)}.  Make sure 'makeSequal' iterate the array and add ': Part II' to each one of its elements`).toEqual(['The Godfather: Part II', 'Back to the Future: Part II'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`addCounter function should receive an array of strings and add a counter in the beginning of each element of the array`, function () {
    try {
      const { addCounter} = require('../../src/exercise2');
      const movies = ['The Godfather', 'Back to the Future']
      addCounter(movies)
      expect(movies, `Expected to get ["1. The Godfather", "2. Back to the Future"] after invoking the 'addCounter' function with an array of ["The Godfather", "Back to the Future"], but instead got - ${JSON.stringify(movies)}.  Make sure 'addCounter' iterate the array and add a counter, a dot and a space in the beginning of each string in the array. Also make sure that the counter start with 1 and not 0`).toEqual(['1. The Godfather', '2. Back to the Future'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesModule should return an 'modifyMovies' function which receive a function and invoke it on the 'movies' array`, function () {
    try {
      const { moviesModule } = require('../../src/exercise2');
      const makeSequal = function (movies) {
        for (let index in movies) {
          movies[index] += `: Part II`;
        }
      };
      const m = moviesModule()
      m.modifyMovies(makeSequal)
      const movies = m.getMovies()
      expect(movies, `Expected to get ["The Godfather: Part II", "Back to the Future: Part II"] after invoking the 'modifyMovies' function with a 'makeSequal' function (which was created by us), but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receive a function as a parameter and invokes it with the 'movies' array`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesModule should return an 'modifyMovies' function which receive a function and invoke it on the 'movies' array. This function should be able to use 'makeSequal' and 'addCounter' functions properly`, function () {
    try {
      const { moviesModule, makeSequal, addCounter } = require('../../src/exercise2');
      const m = moviesModule()
      m.modifyMovies(makeSequal)
      const movies = m.getMovies()
      expect(movies, `Expected to get ["The Godfather: Part II", "Back to the Future: Part II"] after invoking the 'modifyMovies' function with the 'makeSequal' function, but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receive a function as a parameter and invokes it with the 'movies' array`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

      const m2 = moviesModule()
      m2.modifyMovies(addCounter)
      const movies2 = m2.getMovies()
      expect(movies2, `Expected to get ["1. The Godfather", "2. Back to the Future"] after invoking the 'modifyMovies' function with the 'addCounter' function, but instead got - ${JSON.stringify(movies2)}.  Make sure 'modifyMovies' receive a function as a parameter and invokes it with the 'movies' array`).toEqual(["1. The Godfather","2. Back to the Future"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
