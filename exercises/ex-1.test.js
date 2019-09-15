const findFactorial = require('../../src/app').findFactorial

describe('Exercise 1', function () {
    it('The function should return the factorial of the argument that has been passed to it', function () {
        const param = 10
        const expectedResult = 3628800
        const result = findFactorial(param)

        expect(result, `the function did not return the correct value, when passing ${param} to the function expected ${expectedResult} got ${result}`).toBe(expectedResult)
    })
} )