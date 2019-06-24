let MyApp = require('../../App');

describe("exercise2", () => {   
      it('You should define a subtract method on the MyApp class', () => {
        let myApp = new MyApp();
        expect(myApp.subtract, "MyApp should have a subtract method defined").toBeDefined();
      })

      it('Your subtract method should return the subtraction of the two numbers provided as arguments to the function', () => {
          let myApp = new MyApp();
          expect(myApp.subtract, "MyApp should have a subtract method defined").toBeDefined();
          const result = myApp.subtract(10, 1);
          expect(result, `Subtract method should return the subtraction of two numbers. We tried calling it with 10-1 and got ${result}.`).toEqual(9);
      });     
})






