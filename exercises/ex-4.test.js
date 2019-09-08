import { reverse } from "../../src/App"

describe("exercise4", () => {
  it('String should be reversed', () => {
    let input = "dog"
    let expectedOutput = "god"
    expect(reverse(input)).toBe(expectedOutput)

  });
  it('String should be reversed', () => {
    let input = "shoe"
    let expectedOutput = "eohs"
    expect(reverse(input)).toBe(expectedOutput)

  });
  it('String should be reversed including space', () => {
    let input = "race car"
    let expectedOutput = "rac ecar"
    expect(reverse(input)).toBe(expectedOutput)

  });
  it('Emtpy string paramater should return empty string', () => {
    let input = ""
    let expectedOutput = ""
    expect(reverse(input)).toBe(expectedOutput)

  });
})


