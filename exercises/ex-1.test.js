let MyApp = require('../../App');

describe("exercise1", () => {     
      it('Your add method should return the sum of the two numbers provided as arguments to the function', () => {
          let myApp = new MyApp();
          expect(myApp.add, "MyApp should have an add method defined").toBeDefined();
          const result = myApp.add(1, 3);
          expect(result, `Add method should return the sum of two numbers. We tried calling it with 1+3 and got ${result}.`).toEqual(4);
      });     
})






