let EmployeeMatrix
let salaryData = require('../../data.json')

try {
    EmployeeMatrix = require('../../src/EmployeeMatrix')
} catch (error) {
    console.log("i")
}

describe('exercise6', () => {
    it(`should create a 'findRichest' method in your matrix which returns the name of the employee with the largest salary`, function () {
        const em = new EmployeeMatrix()
        em.loadData(salaryData)

        let result = em.findRichest()
        expect(result, `when loading some data to the matrix - running 'findRichest()' should return 'Anisha' instead got ${result}`).toBe('Anisha')
    })
})