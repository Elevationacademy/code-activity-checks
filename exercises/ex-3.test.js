const allFuncs = require("../../src/App")

let outputData = ""
const storeLog = inputs => (outputData += inputs + '~')
console["log"] = jest.fn(storeLog)

describe("exercise3", () => {
    test("Should console.log stars on separate lines in ascending order until first paramater number of stars is reached and then descending order, and then repeat as many times as second parameter number ", function () {
    
    outputData = ""
    const num = 5
    const count = 1
    const expectedResult = "*~**~***~****~*****~****~***~**~*~~"
  

    allFuncs.printStarSeries(num, count)
    expect(outputData).toBe(expectedResult)
})

    test("Should console.log stars on separate lines in ascending order until first paramater number of stars is reached and then descending order, and then repeat as many times as second parameter number ", function () {

    outputData = ""
    const num = 4
    const count = 2
    const expectedResult = "*~**~***~****~***~**~*~~*~**~***~****~***~**~*~~"


    allFuncs.printStarSeries(num, count)
    expect(outputData).toBe(expectedResult)
})

    test("Should console.log stars on separate lines in ascending order until first paramater number of stars is reached and then descending order, and then repeat as many times as second parameter number ", function () {

    outputData = ""
    const num = 3
    const count = 3
    const expectedResult = "*~**~***~**~*~~*~**~***~**~*~~*~**~***~**~*~~"


    allFuncs.printStarSeries(num, count)
    expect(outputData).toBe(expectedResult)
})
})