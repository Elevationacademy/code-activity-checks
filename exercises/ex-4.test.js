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

    it('The query should contain 9 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(9);
    });

    it('The query should contain ELSE', () => {
        expect(results.query.toLowerCase().indexOf('NOT IN'), "You query did not contain an ELSE statement").toBeGreaterThan(-1);
    });
})