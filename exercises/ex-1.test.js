let Matrix

try {
    Matrix = require('../../src/Matrix')
} catch (error) {
    console.log("i")
}

describe('exercise1', () => {
    it(`should create a class Matrix with the methods 'get' and 'generateMatrix' `, function () {
        const m1 = new Matrix(4, 5)
        let expectedResults = [1, 7, 13, 19]

        for (let i = 0; i < expectedResults.length; i++) {
            const result = m1.get(i, i)
            expect(result, `when creating a 4x5 matrix running get(${i}, ${i}) should return ${expectedResults[i]}, instead got ${result}`).toBe(expectedResults[i])
        }

        const m2 = new Matrix(6, 6)
        expectedResults = [1, 8, 15, 22, 29, 36]

        for (let i = 0; i < expectedResults.length; i++) {
            const result = m2.get(i, i)
            expect(result, `when creating a 6x6 matrix running get(${i}, ${i}) should return ${expectedResults[i]}, instead got ${result}`).toBe(expectedResults[i])
        }
    })

    it(`should create a class Matrix with the method 'alter' which receives a coordinate and value and alters that coordinate to the given value`, function () {
        const m = new Matrix(5, 6)

        m.alter(1, 2, 10)
        let result = m.get(1, 2)
        expect(result, `when creating a 5x6 matrix running 'alter(1, 2, 10)', the 'get(1, 2)' method should return 10, instead got ${result}`).toBe(10)

        m.alter(4, 1, 99)
        result = m.get(4, 1)
        expect(result, `when creating a 5x6 matrix running 'alter(4, 1, 99)', the 'get(4, 1)' method should return 99, instead got ${result}`).toBe(99)
    })
})
