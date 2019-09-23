let EmployeeMatrix
let salaryData = require('../../data.json')

try {
    EmployeeMatrix = require('../../src/EmployeeMatrix')
} catch (error) {
    console.log("i")
}

describe('exercise4', () => {
    it(`should create a method 'getEmployees' in your matrix which receives a department and returns an array with the names of all employees in that department`, function () {
        const em = new EmployeeMatrix()
        em.loadData(salaryData)

        let result = em.getEmployees('Marketing')
        expect(result[0], `when loading some data to the matrix - running 'getEmployees('Marketing')' should return an array where the value of the first index is 'Jakub' instead got ${result[0]}`).toBe('Jakub')
        expect(result[1], `when loading some data to the matrix - running 'getEmployees('Marketing')' should return an array where the value of the first index is 'Mar' instead got ${result[1]}`).toBe('Mar')
    })
})