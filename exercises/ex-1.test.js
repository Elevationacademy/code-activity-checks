const DatabaseUtils = require('../../database-utils');

describe("Exercise 1", () => {
    let { utils, results } = {};
    
    beforeAll(async (done) => {
        utils = new DatabaseUtils();
        user_results = await utils.getUserInput(); //running students' CREATETABLE query
        query = "SELECT * FROM CakeOrders"
        results = utils.runQuery(query) // validating CakeOrders table was created (should be empty as the student have just created it)
        done();
    });
    afterAll(async (done) => {
        await utils.close();
        done();
    });

    it('The query should contain 0 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(0);
    });
})