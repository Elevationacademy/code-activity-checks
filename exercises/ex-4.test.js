const DatabaseUtils = require('../../database-utils');

describe("Exercise 4", () => {
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

    it('The query should contain 5 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(5);
    });

    it('The query should contain NOT IN', () => {
        expect(results.query.toLowerCase().indexOf('NOT IN'), "You query did not contain a UNION statement").toBeGreaterThan(-1);
    });
})