const allFuncs = require("../../src/App")

describe("exercise6", () => {
    it('Every letter in string should move one place up in the alphabet', () => {
        let input = "cat"
        let expectedOutput = "dbu"
        expect(allFuncs.encrypt(input)).toBe(expectedOutput)
        
      });
      it('Every letter in string should move one place up in the alphabet', () => {
        let input = "school"
        let expectedOutput = "tdippm"
        expect(allFuncs.encrypt(input)).toBe(expectedOutput)
        
      });  
      it('The letter Z should be encrypted as the letter A', () => {
        let input = "zoo"
        let expectedOutput = "app"
        expect(allFuncs.encrypt(input)).toBe(expectedOutput)
        
      });  
    })
      
