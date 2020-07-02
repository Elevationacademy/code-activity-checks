describe('Exercise 2', function () {

  it(`The 'moviesModule' should return the 'addMovie', 'getMovies', 'deleteMovie', and 'modifyMovies' functions as properties of an onject`, function () {
    try {
      const { moviesModule} = require('../../src/exercise2');
      const m = moviesModule()
      expect(m.addMovie, "The 'moviesModule' does not return an 'addMovie' function. Make sure you return an object with 'addMovie' as a key-value pair").toBeTruthy()
      expect(m.getMovies, "The 'moviesModule' does not return a 'getMovies' function. Make sure you return an object with 'getMovies' as a key-value pair").toBeTruthy()
      expect(m.deleteMovie, "The 'moviesModule' does not return a 'deleteMovie' function. Make sure you return an object with 'deleteMovie' as a key-value pair").toBeTruthy()
      expect(m.modifyMovies, "The 'moviesModule' does not return a 'modifyMovies' function. Make sure you return an object with 'modifyMovies' as a key-value pair").toBeTruthy()
      expect(typeof(m.addMovie), `The 'moviesModule' does not return an 'addMovie' function. The type of 'addMovie' is ${typeof(m.addMovie)} instead of 'function'`).toBe('function')
      expect(typeof(m.getMovies), `The 'moviesModule' does not return a 'getMovies' function. The type of 'getMovies' is ${typeof(m.getMovies)} instead of 'function'`).toBe('function')
      expect(typeof(m.deleteMovie), `The 'moviesModule' does not return a 'deleteMovie' function. The type of 'deleteMovie' is ${typeof(m.deleteMovie)} instead of 'function'`).toBe('function')
      expect(typeof(m.modifyMovies), `The 'moviesModule' does not return a 'modifyMovies' function. The type of 'modifyMovies' is ${typeof(m.modifyMovies)} instead of 'function'`).toBe('function')

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesModule' should return an 'addMovie' function which pushes a movie string to the 'movies' array and a 'getMovies' function which returns the 'movies' array`, function () {
    try {
      const { moviesModule} = require('../../src/exercise2');
      const m = moviesModule()
      m.addMovie('Star Trek')
      const movies = m.getMovies()
      expect(movies, `After invoking the 'addMovie' function with the movie "Star Trek" and then invoking the 'getMovies' function, expected to receive ["The Godfather", "Back to the Future", "Star Trek"], but instead got - ${JSON.stringify(movies)}.  Make sure you create an 'movies' array inside the 'moviesModule' with ['The Godfather', 'Back to the Future'], and that the 'addMovie' function pushes the argument that was received to that array`).toEqual(['The Godfather', 'Back to the Future', 'Star Trek'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesModule' should return a 'deleteMovie' function that finds a given movie in the 'movies' array and deletes it`, function () {
    try {
      const { moviesModule} = require('../../src/exercise2');
      const m = moviesModule()
      m.deleteMovie('The Godfather')
      const movies = m.getMovies()
      expect(movies, `After invoking the 'deleteMovie' function with the movie 'The Godfather' and then invoking the 'getMovies' function, expected to get ["Back to the Future"], but instead got - ${JSON.stringify(movies)}.  Make sure you create a 'movies' array inside the 'moviesModule' with ['The Godfather', 'Back to the Future'], and that the 'deleteMovie' function can receive a movie as a parameter, find it in the 'movies' array, and delete it (use the 'splice' method)`).toEqual(['Back to the Future'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'makeSequel' function should receive an array of strings and add ': Part II' to each one of them`, function () {
    try {
      const { makeSequel} = require('../../src/exercise2');
      const movies = ['The Godfather', 'Back to the Future']
      makeSequel(movies)
      expect(movies, `After invoking the 'makeSequel' function with an array of ["The Godfather", "Back to the Future"], expected to get ["The Godfather: Part II", "Back to the Future: Part II"], but instead got - ${JSON.stringify(movies)}.  Make sure 'makeSequel' iterates over the array and adds ': Part II' to each one of its elements`).toEqual(['The Godfather: Part II', 'Back to the Future: Part II'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'addCounter' function should receive an array of strings and add a counter to the beginning of each element in the array`, function () {
    try {
      const { addCounter} = require('../../src/exercise2');
      const movies = ['The Godfather', 'Back to the Future']
      addCounter(movies)
      expect(movies, `After invoking the 'addCounter' function with an array of ["The Godfather", "Back to the Future"], expected to get ["1. The Godfather", "2. Back to the Future"], but instead got - ${JSON.stringify(movies)}.  Make sure 'addCounter' iterates over the array and adds a counter, a dot, and a space, to the beginning of each string in the array. Also make sure that the counter starts with 1 and not 0`).toEqual(['1. The Godfather', '2. Back to the Future'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesModule' should return a 'modifyMovies' function which receives a function and invokes it with the 'movies' array`, function () {
    try {
      const { moviesModule } = require('../../src/exercise2');
      const makeSequel = function (movies) {
        for (let index in movies) {
          movies[index] += `: Part II`;
        }
        return movies
      };
      const m = moviesModule()
      m.modifyMovies(makeSequel)
      const movies = m.getMovies()
      expect(movies, `After invoking the 'modifyMovies' function with a 'makeSequel' function (which was created by us), expected to get ["The Godfather: Part II", "Back to the Future: Part II"], but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receives a function as a parameter and invokes it with the 'movies' array`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesModule' should return a 'modifyMovies' function which receives a function and invokes it with the 'movies' array. This function should be able to use the 'makeSequel' and 'addCounter' functions properly`, function () {
    try {
      const { moviesModule, makeSequel, addCounter } = require('../../src/exercise2');
      const m = moviesModule()
      m.modifyMovies(makeSequel)
      const movies = m.getMovies()
      expect(movies, `After invoking the 'modifyMovies' function with the 'makeSequel' function, expected to get ["The Godfather: Part II", "Back to the Future: Part II"], but instead got - ${JSON.stringify(movies)}. Make sure 'modifyMovies' receives a function as a parameter and invokes it with the 'movies' array`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

      const m2 = moviesModule()
      m2.modifyMovies(addCounter)
      const movies2 = m2.getMovies()
      expect(movies2, `After invoking the 'modifyMovies' function with the 'addCounter' function, expected to get ["1. The Godfather", "2. Back to the Future"], but instead got - ${JSON.stringify(movies2)}. Make sure 'modifyMovies' receives a function as a parameter and invokes it with the 'movies' array`).toEqual(["1. The Godfather","2. Back to the Future"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
