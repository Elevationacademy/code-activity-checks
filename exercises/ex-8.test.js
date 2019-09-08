const allFuncs = require("../../src/App")

describe("exercise8", () => {
  it("The length of the jumbled array should be equal to the sum of the lengths of the two paramaters", () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    let length = arr1.length + arr2.length
    expect(allFuncs.jumble(arr1, arr2)).toHaveLength(length)
  });
  it('The jumbled array should not be in the exact same order as the two arrays', () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    let combinedArr = arr1.concat(arr2)
    expect(allFuncs.jumble(arr1, arr2)).not.toBe(combinedArr)
  });
  it('The jumbled array should contain all elements from array 1', () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    expect(allFuncs.jumble(arr1, arr2)).toEqual(expect.arrayContaining(arr1))
  });
  it('The jumbled array should contain all elements from array2', () => {
    let arr1 = ["red", "indigo", "white", "teal", "yellow"]
    let arr2 = ["bread", "cheese", "cucumber"];
    expect(allFuncs.jumble(arr1, arr2)).toEqual(expect.arrayContaining(arr2))
  });

})

