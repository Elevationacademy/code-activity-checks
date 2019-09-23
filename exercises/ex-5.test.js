let EmployeeMatrix
let salaryData = require('../../data.json')

try {
    EmployeeMatrix = require('../../src/EmployeeMatrix')
} catch (error) {
    console.log("i")
}

describe('exercise5', () => {
    it(`should create a method 'getTotalSalary' in your matrix which receives a department and returns the sum of all the salaries for the employees in that department`, function () {
        const em = new EmployeeMatrix()
        em.loadData(salaryData)

        let result = em.getTotalSalary('Marketing')
        expect(result, `when loading some data to the matrix - running 'getTotalSalary('Marketing')' should return 2900 instead got ${result}`).toBe(2900)
    })
})