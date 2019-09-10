const allFuncs = require("../../src/App")

describe("exercise4", () => {
  it('The function should return the string reversed', () => {
    let input1 = "shoe"
    let expectedOutput1 = "eohs"
let result = allFuncs.reverse(input1)

    expect(allFuncs.reverse(input1), `Output string should be the input string reversed. If the string '${input1}' enters the function, the function should return the string '${expectedOutput1}', instead returned '${result}'.`).toBe(expectedOutput1)
    
    let input2 = "race car"
    let expectedOutput2 = "rac ecar"
    expect(allFuncs.reverse(input2), `String should be reversed including the space. If the string '${input2}' enters the function, the function should return the string '${expectedOutput2}'.`).toBe(expectedOutput2)
    
    let input3 = ""
    let expectedOutput3 = ""
    expect(allFuncs.reverse(input3), `An emtpy string paramater should return empty string. If the string '${input3}' enters the function, the function should return '${expectedOutput3}'.`).toBe(expectedOutput3)
  });
})


