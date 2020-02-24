const { migrateData } = require('../../src/app')
const utils = require('../../utils/utils.class')

describe('Exercise 2', function () {
    it('The function migrateData should migrate a given object to a new object based on the given instructions', function () {
        const movies = require('../../utils/dummyMovies.json')
        const expectedResult = require('../../utils/migratedMovies.json')
        const result = migrateData(movies)

        expect(result, `the function did not return the correct object - when passing ${JSON.stringify(movies)} to the function expected ${JSON.stringify(expectedResult)} but instead got ${JSON.stringify(result)}. We suggest you parse these stringified objects in order to comfortably see how they look`).toEqual(expectedResult)
    })
} )