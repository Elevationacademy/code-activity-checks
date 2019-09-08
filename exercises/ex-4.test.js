const allFuncs = require("../../src/App")

describe("exercise4", () => {
  it('String should be reversed', () => {
    let input = "dog"
    let expectedOutput = "god"
    expect(allFuncs.reverse(input)).toBe(expectedOutput)

  });
  it('String should be reversed', () => {
    let input = "shoe"
    let expectedOutput = "eohs"
    expect(allFuncs.reverse(input)).toBe(expectedOutput)

  });
  it('String should be reversed including space', () => {
    let input = "race car"
    let expectedOutput = "rac ecar"
    expect(allFuncs.reverse(input)).toBe(expectedOutput)

  });
  it('Emtpy string paramater should return empty string', () => {
    let input = ""
    let expectedOutput = ""
    expect(allFuncs.reverse(input)).toBe(expectedOutput)

  });
})


