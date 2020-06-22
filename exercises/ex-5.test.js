const DatabaseUtils = require('../../database-utils');

describe("Exercise 5", () => {
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

    it('The query should contain UNION', () => {
        expect(results.query.toLowerCase().indexOf('union'), "You query did not contain a UNION statement").toBeGreaterThan(-1);
    });
})