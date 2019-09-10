const allFuncs = require("../../src/App")

let outputData = ""
const storeLog = inputs => (outputData += inputs + '~')
console["log"] = jest.fn(storeLog)

describe("exercise3", () => {

    test("Should console.log stars on separate lines in ascending order until first paramater number of stars is reached and then descending order, and then repeat as many times as second parameter number. The star series should have a space inbetween each series. ", function () {

    outputData = ""
    const num = 4
    const count = 2
    const expectedResult = "*~**~***~****~***~**~*~~*~**~***~****~***~**~*~~"
    const otherResult = "*\n**\n***\n****\n***\n**\n*\n~*\n**\n***\n****\n***\n**\n*\n~"


    allFuncs.printStarSeries(num, count)
    expect(expectedResult == outputData || otherResult == outputData).toBeTruthy()
})

})