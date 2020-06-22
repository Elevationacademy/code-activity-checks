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

    it('The query should contain 4 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(4);
    });

    it('The query should contain SUM', () => {
        expect(results.query.toLowerCase().indexOf('sum'), "You query did not contain a SUM statement").toBeGreaterThan(-1);
    });
})