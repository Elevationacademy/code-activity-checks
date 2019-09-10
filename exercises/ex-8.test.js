const allFuncs = require("../../src/App")

describe("exercise8", () => {
  it("The length of the jumbled array should be equal to the sum of the lengths of the two paramaters", () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    let length = arr1.length + arr2.length
    expect(allFuncs.jumble(arr1, arr2), `the length of the jumbled array was not equal to the sums of the two array lengths`).toHaveLength(length)
  });
  it('The jumbled array should be in a random order and not the exact same order as the two arrays', () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    let combinedArr = arr1.concat(arr2)
    expect(allFuncs.jumble(arr1, arr2), 'the jumbled array should not be just the two arrays concatenated').not.toBe(combinedArr)
    expect(allFuncs.jumble(arr2, arr1), 'the jumbled array should not be just the two arrays concatenated').not.toBe(combinedArr)

  });
  it('The jumbled array should contain all elements from array 1', () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    expect(allFuncs.jumble(arr1, arr2), 'could not find all the items from the first parameter in the jumbled array').toEqual(expect.arrayContaining(arr1))
  });
  it('The jumbled array should contain all elements from array2', () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    expect(allFuncs.jumble(arr1, arr2), 'could not find all the items from the second parameter in the jumbled array').toEqual(expect.arrayContaining(arr2))
  });

})

