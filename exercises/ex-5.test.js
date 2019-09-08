import {isPallindrome} from "../../src/App"

describe("exercise5", () => {
    it('Output should read the same backwards as it does forwards', () => {
        let input = "Taco cat"
        let expectedOutput = true
        expect(isPallindrome(input)).toBe(expectedOutput)
        
      });
      it('Output should read the same backwards as it does forwards', () => {
        let input = "shoe"
        let expectedOutput = false
        expect(isPallindrome(input)).toBe(expectedOutput)
        
      });       
      it('Emtpy string paramater should return empty string', () => {
        let input = ""
        let expectedOutput = true
        expect(isPallindrome(input)).toBe(expectedOutput)
     
      });
    })
      
