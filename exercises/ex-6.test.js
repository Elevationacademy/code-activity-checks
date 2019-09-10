const allFuncs = require("../../src/App")

describe("exercise6", () => {
    it('Every letter in string should move one place up in the alphabet', () => {
        let input1 = "school"
        let expectedOutput1 = "tdippm"
        let result1 = allFuncs.encrypt(input1)

        expect(allFuncs.encrypt(input1), `if the string '${input1}' is passed to the function, the output should be '${expectedOutput1}', instead the function returned ${result1}`).toBe(expectedOutput1)
        
      });
      it('The letter Z should be encrypted as the letter A', () => {
        let input2 = "zoo"
        let expectedOutput2 = "app"
        let result2 = allFuncs.encrypt(input2)

        expect(allFuncs.encrypt(input2), `if the string '${input2}' is passed to the function, the output should be '${expectedOutput2}', instead the function returned ${result2}`).toBe(expectedOutput2)
        
      });  
  
    })
      
