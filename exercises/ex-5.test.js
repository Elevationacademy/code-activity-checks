const allFuncs = require("../../src/App")

describe("exercise5", () => {
    it('Output should read the same backwards as it does forwards (ignoring spaces)', () => {
        let input = "Taco cat"
        let expectedOutput = true
        expect(allFuncs.isPallindrome(input), `When '${input}' enters the function, ${expectedOutput} should be returned`).toBe(expectedOutput)
        let input2 = "shoe"
        let expectedOutput2 = false
        expect(allFuncs.isPallindrome(input2), `When '${input2}' enters the function, ${expectedOutput2} should be returned`).toBe(expectedOutput2)
        let input3 = ""
        let expectedOutput3 = true
        expect(allFuncs.isPallindrome(input3), 'Emtpy string paramater should return empty string').toBe(expectedOutput3)
     
       
      });
  
    })
      
