const allFuncs = require("../../src/App")

describe("exercise7", () => {
  it('Every letter in string should move one place down in the alphabet', () => {
    let input = "cvh"
    let expectedOutput = "bug"
    expect(allFuncs.decrypt(input)).toBe(expectedOutput)
  });
  it('Every letter in string should move one place down in the alphabet', () => {
    let input = "dppm"
    let expectedOutput = "cool"
    expect(allFuncs.decrypt(input)).toBe(expectedOutput)
  });
  it('The letter A should become Z', () => {
    let input = "app"
    let expectedOutput = "zoo"
    expect(allFuncs.decrypt(input)).toBe(expectedOutput)
  });
})

