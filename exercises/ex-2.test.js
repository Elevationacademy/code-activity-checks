let Matrix

try {
    Matrix = require('../../src/Matrix')
} catch (error) {
    console.log("i")
}

describe('exercise2', () => {
    it(`should create a method 'findCoordinate' in your matrix which receives a value and returns the coordinate of that value' `, function () {
        const m = new Matrix(5, 6)

        let result = m.findCoordinate(11)
        expect(result.x, `when creating a 5x6 matrix - running 'findCoordinate(11)' should return an object with 2 properties
            - x & y. The x property should be equal to 4 instead got ${result.x}`).toBe(4)
        expect(result.y, `when creating a 5x6 matrix - running 'findCoordinate(11)' should return an object with 2 properties
            - x & y. The y property should be equal to 1 instead got ${result.y}`).toBe(1)

        result = m.findCoordinate(15)
        expect(result.x, `when creating a 5x6 matrix - running 'findCoordinate(15)' should return an object with 2 properties
            - x & y. The x property should be equal to 2 instead got ${result.x}`).toBe(2)
        expect(result.y, `when creating a 5x6 matrix - running 'findCoordinate(15)' should return an object with 2 properties
            - x & y. The y property should be equal to 2 instead got ${result.y}`).toBe(2)
    })
})
