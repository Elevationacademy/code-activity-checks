let EmployeeMatrix
let salaryData = require('../../data.json')

try {
    EmployeeMatrix = require('../../src/EmployeeMatrix')
} catch (error) {
    console.log("i")
}

describe('exercise3', () => {
    it(`should create a method 'findCoordinate' in your matrix which receives a value and returns the coordinate of that value' `, function () {
        const em = new EmployeeMatrix()
        em.loadData(salaryData)

        let result = em.get(2, 2)
        expect(result, `when loading the salaryData to the matrix - running 'get(2, 2)' should return the string 'Finance' instead got ${result}`).toBe('Finance')

        result = em.get(1, 3)
        expect(result, `when loading the salaryData to the matrix - running 'get(1, 3)' should return the string 1200 instead got ${result}`).toBe(1200)
    })
})