const DatabaseUtils = require('../../database-utils');

describe("Exercise 1", () => {
    let { utils, results } = {};
    
    beforeAll(async (done) => {
        utils = new DatabaseUtils();
        results = utils.runQuery(query)
        done();
    });
    afterAll(async (done) => {
        await utils.close();
        done();
    });

    it('The query should contain 5 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(5);
    });

    it('The query should contain Cake_Flavor', () => {
        expect(results.query.toLowerCase().indexOf('LIKE'), "You query did not contain a Cake_Flavor statement").toBeGreaterThan(-1);
    });
})