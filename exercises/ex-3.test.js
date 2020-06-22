const DatabaseUtils = require('../../database-utils');

describe("Exercise 3", () => {
    let { utils, results } = {};
    
    beforeAll(async (done) => {
        utils = new DatabaseUtils();
        results = await utils.getUserInput();
        done();
    });
    afterAll(async (done) => {
        await utils.close();
        done();
    });

    it('The query should contain 1 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(1);
    });

    it('The query should contain ROUND', () => {
        expect(results.query.toLowerCase().indexOf('Cake_Flavor'), "You query did not contain a ROUND statement").toBeGreaterThan(-1);
    });
})