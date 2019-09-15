const reverseString = require('../../src/app').reverseString

describe('Exercise 2', function () {
    it('The function should receive a string and return the reverse of that string', function () {
        const param = 'race car'
        const expectedResult = 'rac ecar'
        const result = reverseString(param)

        expect(result, `the function did not return the correct value, when passing ${param} to the function expected ${expectedResult} got ${result}`).toBe(expectedResult)
    })
} )