const allFuncs = require("../../src/App")

describe("exercise7", () => {
  it('Every letter in string should move one place down in the alphabet', () => {
    let input1 = "dppm"
    let expectedOutput1 = "cool"
    let result1 = allFuncs.decrypt(input1)

    expect(result1, `if the string '${input1}' is passed to the function, the output should be '${expectedOutput1}', instead the function returned ${result1}`).toBe(expectedOutput1)
    
  });

  it('The letter A should become Z', () => {
    let input2 = "app"
    let expectedOutput2 = "zoo"
    let result2 = allFuncs.decrypt(input2)

    expect(result2, `if the string '${input2}' is passed to the function, the output should be '${expectedOutput2}', instead the function returned ${result2}`).toBe(expectedOutput2)
    
  });
})

