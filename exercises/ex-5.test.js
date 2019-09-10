const allFuncs = require("../../src/App")

describe("exercise5", () => {
    it('Output should read the same backwards as it does forwards (ignoring spaces)', () => {
        let input1 = "Taco cat"
        let expectedOutput1 = true
        let result1 = allFuncs.isPallindrome(input1)
        expect(allFuncs.isPallindrome(input1), `If the string '${input1}' enters the function, the function should return ${expectedOutput1}, instead the function returned: ${result1}`).toBe(expectedOutput1)
       
        let input2 = "shoe"
        let expectedOutput2 = false
        let result2 = allFuncs.isPallindrome(input2)

        expect(allFuncs.isPallindrome(input2), `If the string '${input2}' enters the function, the function should return ${expectedOutput2}, instead the function returned: ${result2}`).toBe(expectedOutput2)
       
        let input3 = ""
        let expectedOutput3 = true
        let result3 = allFuncs.isPallindrome(input3)

        expect(allFuncs.isPallindrome(input3), `Empty string paramater should return ${expectedOutput3}, instead the function returned: ${result3} `).toBe(expectedOutput3)
     
       
      });
  
    })
      
