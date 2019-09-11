const recursionExercises = require('../../src/app')

describe('Exercise 2', function () {
    it('The function should receive a string and return the reverse of that string', function () {
        const param = 'race car'
        const expectedResult = 'rac ecar'
        const reverseString = jest.spyOn(recursionExercises, 'reverseString')
        const result = reverseString(param)

        expect(result, `the function did not return the correct value, when passing ${param} to the function expected ${expectedResult} got ${result}`).toBe(expectedResult)
        expect(reverseString, `function must be called ${param.length} times`).toHaveBeenCalledTimes(param.length + 1)
    })
} )