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

    it('The query should contain 8 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(8);
    });

    it('The query should contain LIKE', () => {
        expect(results.query.toLowerCase().indexOf('LIKE'), "You query did not contain a LIKE statement").toBeGreaterThan(-1);
    });
})