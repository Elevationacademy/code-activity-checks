const allFuncs = require("../../src/App")

let outputData = ""
const storeLog = inputs => (outputData += inputs + '~')
console["log"] = jest.fn(storeLog)

describe("exercise2", () => {
    test("Should console.log stars on separate lines in descending order with icrements of one (starting with parameter number of stars until one star", function () {
    
    outputData = ""
    const num = 3
    const expectedResult = "***~**~*~"
    const otherResult = "***\n**\n*"

    allFuncs.printBackwardsStars(num)
    expect(expectedResult == outputData || otherResult == outputData).toBeTruthy()
})
})
