const allFuncs = require("../../src/App")

describe("exercise4", () => {
  it('The function should return the string reversed', () => {
    let input1 = "shoe"
    let expectedOutput1 = "eohs"
    expect(allFuncs.reverse(input1), `Output string should be the input string reversed. If ${input1} is entered, ${expectedOutput1} should be returned`).toBe(expectedOutput1)
    let input2 = "race car"
    let expectedOutput2 = "rac ecar"
    expect(allFuncs.reverse(input2), `String should be reversed including the space. If ${input2} is entered, ${expectedOutput2} should be returned`).toBe(expectedOutput2)
    let input3 = ""
    let expectedOutput3 = ""
    expect(allFuncs.reverse(input3), `An emtpy string paramater should return empty string. If ${input3} is entered, ${expectedOutput3} should be returned`).toBe(expectedOutput3)
  });
})


