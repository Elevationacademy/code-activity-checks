describe('Exercise 3', function () {

  it(`The 'moviesObject' should have 'addMovie', 'deleteMovie', and 'modifyMovies' properties which values are functions types (methods), and a 'movies' property which value is an array type`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      expect(moviesObject.addMovie, "The 'moviesObject' does not have an 'addMovie' key").toBeTruthy()
      expect(moviesObject.deleteMovie, "The 'moviesObject' does not have a 'deleteMovie' key").toBeTruthy()
      expect(moviesObject.modifyMovies, "The 'moviesObject' does not have a 'modifyMovies' key").toBeTruthy()
      expect(moviesObject.movies, "The 'moviesObject' does not have a 'movies' key").toBeTruthy()
      expect(typeof(moviesObject.addMovie), `The moviesObject's 'addMovie' key is not a method. The type of 'addMovie' is ${typeof(moviesObject.addMovie)} instead of a 'function'`).toBe('function')
      expect(typeof(moviesObject.deleteMovie), `The moviesObject's 'deleteMovie' key is not a method. The type of 'deleteMovie' is ${typeof(moviesObject.deleteMovie)} instead of a 'function'`).toBe('function')
      expect(typeof(moviesObject.modifyMovies), `The moviesObject's 'modifyMovies' key is not method. The type of 'modifyMovies' is ${typeof(moviesObject.modifyMovies)} instead of a 'function'`).toBe('function')
      expect(typeof(moviesObject.movies), `The moviesObject's 'movies' key does not contain an array (object) as a value. The type of 'movies' is ${typeof(moviesObject.movies)} instead of an 'object'`).toBe('object')

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesObject' should have an 'addMovie' key whose value is a method that pushes a movie string to the 'movies' array`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      moviesObject.addMovie('Star Trek')
      const movies = moviesObject.movies
      expect(movies, `After invoking the 'addMovie' method with the movie "Star Trek", expected to get ["The Godfather", "Back to the Future", "Star Trek"] as the value of the 'movies' property of 'moviesObject'. Instead got - ${JSON.stringify(movies)}.  Make sure you create a 'movies' key in the 'moviesObject' that contains an array of ['The Godfather', 'Back to the Future'], and that the 'addMovie' method pushes the argument that was received to that array. Use 'this'.`).toEqual(['The Godfather', 'Back to the Future', 'Star Trek'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesObject' should have a 'deleteMovie' key whose value is a method that finds a given movie in the 'movies' array and deletes it`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.deleteMovie('The Godfather')
      const movies = moviesObject.movies
      expect(movies, `After invoking the 'deleteMovie' method with the movie 'The Godfather',expected to recieve ["Back to the Future"] as the value of the 'movies' property (of 'moviesObject'). Instead got - ${JSON.stringify(movies)}.  Make sure you create a 'movies' array inside the 'moviesObject' initialized to ['The Godfather', 'Back to the Future'], and that the 'deleteMovie' method can receive a movie as a parameter, finds it in the 'movies' array, and delete it (use the 'splice' method). Use 'this'.`).toEqual(['Back to the Future'])
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesObject' should have a 'modifyMovies' key whose value is a method that receives a function and invokes it with the 'movies' array`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      const makeSequel = function (movies) {
        for (let index in movies) {
          movies[index] += `: Part II`;
        }
        return movies
      };
      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.modifyMovies(makeSequel)
      const movies = moviesObject.movies
      expect(movies, `After invoking the 'modifyMovies' method with a 'makeSequel' function (which was created by us), expected to recieve ["The Godfather: Part II", "Back to the Future: Part II"] as the value of the 'movies' property (of 'moviesObject'), but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receives a function as a parameter and invokes it with the 'movies' array. Use 'this'`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The 'moviesObject' should have a 'modifyMovies' key whose value is a method that receives a function and invokes it with the 'movies' array. This method should be able to use the 'makeSequel' and 'addCounter' functions properly`, function () {
    try {
      const moviesObject = require('../../src/exercise3');
      const { makeSequel, addCounter } = require('../../src/exercise2');
      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.modifyMovies(makeSequel)
      const movies = moviesObject.movies
      expect(movies, `After invoking the 'modifyMovies' method with the 'makeSequel' function, expected to get ["The Godfather: Part II", "Back to the Future: Part II"] as the value of the 'movies' property (of 'moviesObject') , but instead got - ${JSON.stringify(movies)}.  Make sure 'modifyMovies' receives a function as a parameter and invokes it with the 'movies' array. Use 'this'`).toEqual(["The Godfather: Part II","Back to the Future: Part II"])

      moviesObject.movies = ['The Godfather', 'Back to the Future']
      moviesObject.modifyMovies(addCounter)
      const movies2 = moviesObject.movies
      expect(movies2, `After invoking the 'modifyMovies' method with the 'addCounter' function, expected to get ["1. The Godfather", "2. Back to the Future"] as the value of the 'movies' property (of 'moviesObject'), but instead got - ${JSON.stringify(movies2)}. Make sure 'modifyMovies' receives a function as a parameter and invokes it with the 'movies' array. Use 'this`).toEqual(["1. The Godfather","2. Back to the Future"])

    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
