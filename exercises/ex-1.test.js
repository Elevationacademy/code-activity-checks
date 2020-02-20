const { findOddOccurrences } = require('../../src/app')
const utils = require('../../utils/utils.class')

describe('Exercise 1', function () {
    it('The function findOddOccurrences should find all the numbers that appear an odd number of times and output them in an array', function () {
        const arr = [1, 2, 4, 2, 5, 9, 9, 2, 3, 4, 4, 4, 5, 3, 4, 7, 8, 8, 3, 5, 7, 2, 2, 9, 9, 6, 3]
        const expectedResult =  [1, 2, 4, 5, 6]
        const result = findOddOccurrences(arr)

        const isCorrect = utils.isArrEqual(result, expectedResult)
        expect(isCorrect, `the function did not return the correct array - when passing ${JSON.stringify(arr)} to the function expected ${JSON.stringify(expectedResult)} instead got ${JSON.stringify(result)}`).toBeTruthy()
    })

    it('The function findOddOccurrences should run in O(n)', function () {
        const isRuntimeCorrect = utils.isON(findOddOccurrences)

        expect(isRuntimeCorrect, `the function did not run in O(n), it ran in a higher time complexity`).toBeTruthy()
    })
} )