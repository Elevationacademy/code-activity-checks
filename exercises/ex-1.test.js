const allFuncs = require("../../src/App")

let outputData = ""
const storeLog = inputs => (outputData += inputs + '~')
console["log"] = jest.fn(storeLog)

describe("exercise1", () => {
test("Should console.log stars on separate lines in ascending order with icrements of one (starting with one star until paramater number of stars", function () {
    outputData = ""
    const num = 3
    const expectedResult = "*~**~***~"
    const otherResult = "~*\n**\n***\n~"
console.log(outputData)
    allFuncs.printStars(num)
    expect(expectedResult == outputData || otherResult == outputData).toBeTruthy()
})
})

