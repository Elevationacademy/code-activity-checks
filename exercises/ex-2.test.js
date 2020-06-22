const DatabaseUtils = require('../../database-utils');

describe("Exercise 2", () => {
    let { utils, results } = {};
    
    beforeAll(async (done) => {
        utils = new DatabaseUtils();
        user_results = await utils.getUserInput(); //running students' INSERT query
        query = "SELECT * FROM CakeOrders"
        results = utils.runQuery(query) // validating CakeOrders table values has been inserted
        done();
    });
    afterAll(async (done) => {
        await utils.close();
        done();
    });

    it('The query should contain 21 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(21);
    });

    it('The query should contain INSERT JOIN', () => {
        expect(user_results.query.toLowerCase().indexOf('INSERT'), "You query did not contain an INSERT statement").toBeGreaterThan(-1);
    });
})