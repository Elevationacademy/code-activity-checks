describe('Exercise 3', function () {

  it(`moviesObject should have 'addMovie', 'deleteMovie', and 'modifyMovies' keys which values are functions types (methods), and a 'movies' key which value is an array type`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      expect(moviesObject.addMovie, "moviesObject do not have a 'addMovie' key").toBeTruthy()
      expect(moviesObject.deleteMovie, "moviesObject do not have a 'deleteMovie' key").toBeTruthy()
      expect(moviesObject.modifyMovies, "moviesObject do not have a 'modifyMovies' key").toBeTruthy()
      expect(moviesObject.movies, "moviesObject do not have a 'movies' key").toBeTruthy()
      expect(typeof(moviesObject.addMovie), `moviesObject's addMovie key do not contain a function (method) as a value. The type of 'addMovie' is ${typeof(moviesObject.addMovie)} instead of a 'function'`).toBe('function')
      expect(typeof(moviesObject.deleteMovie), `moviesObject's deleteMovie key do not contain a function (method) as a value. The type of 'deleteMovie' is ${typeof(moviesObject.deleteMovie)} instead of a 'function'`).toBe('function')
      expect(typeof(moviesObject.modifyMovies), `moviesObject's modifyMovies key do not contain a function (method) as a value. The type of 'modifyMovies' is ${typeof(moviesObject.modifyMovies)} instead of a 'function'`).toBe('function')
      expect(typeof(moviesObject.movies), `moviesObject's movies key do not contain an array (object) as a value. The type of 'movies' is ${typeof(moviesObject.movies)} instead of an 'object'`).toBe('object')

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesObject should have an 'addMovie' key which value is a method that push a movie string to the 'movies' array`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      moviesObject.addMovie('Star Trek')
      const movies = moviesObject.movies
      expect(movies, `Expected to get ["The Godfather", "Back to the Future", "Star Trek"] as the value of the 'movies' key of moviesObject after invoking the 'addMovie' method with the movie "Star Trek", but instead got - ${JSON.stringify(movies)}.  Make sure you create an 'movies' key in the 'moviesObject' that contain an array of ['The Godfather', 'Back to the Future'], and that 'addMovie' function push a parameter that was received to that array. Use 'this'`).toEqual(['The Godfather', 'Back to the Future', 'Star Trek'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesObject should have an 'deleteMovie' key which value is a function that find a given movie in the 'movies' array and delete it`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.deleteMovie('The Godfather')
      const movies = moviesObject.movies
      expect(movies, `Expected to get ["Back to the Future"] as the value of the 'movies' key of moviesObject after invoking the 'deleteMovie' method with the movie 'The Godfather', but instead got - ${JSON.stringify(movies)}.  Make sure you create an 'movies' array inside the 'moviesObject' with ['The Godfather', 'Back to the Future'], and that 'deleteMovie' method can receive a movie as a parameter, find it in the 'movies' array and delete it (use 'splice' method). Use 'this'`).toEqual(['Back to the Future'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesObject should have an 'modifyMovies' key which value is a method that receive a function and invoke it on the 'movies' array`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      const makeSequal = function (movies) {
        for (let index in movies) {
          movies[index] += `: Part II`;
        }
      };
      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.modifyMovies(makeSequal)
      const movies = moviesObject.movies
      expect(movies, `Expected to get ["The Godfather: Part II", "Back to the Future: Part II"] as the value of the 'movies' key of moviesObject after invoking the 'modifyMovies' method with a 'makeSequal' function (which was created by us), but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receive a function as a parameter and invokes it with the 'movies' array. Use 'this'`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`moviesObject should have an 'modifyMovies' key which value is a method that receive a function and invoke it on the 'movies' array. This method should be able to use 'makeSequal' and 'addCounter' functions properly`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      const { makeSequal, addCounter } = require('../../src/exercise2');
      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.modifyMovies(makeSequal)
      const movies = moviesObject.movies
      expect(movies, `Expected to get ["The Godfather: Part II", "Back to the Future: Part II"] as the value of the 'movies' key of moviesObject after invoking the 'modifyMovies' method with the 'makeSequal' function, but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receive a function as a parameter and invokes it with the 'movies' array. Use 'this'`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.modifyMovies(addCounter)
      const movies2 = moviesObject.movies
      expect(movies2, `Expected to get ["1. The Godfather", "2. Back to the Future"] as the value of the 'movies' key of moviesObject after invoking the 'modifyMovies' method with the 'addCounter' function, but instead got - ${JSON.stringify(movies2)}.  Make sure 'modifyMovies' receive a function as a parameter and invokes it with the 'movies' array. Use 'this`).toEqual(["1. The Godfather","2. Back to the Future"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
