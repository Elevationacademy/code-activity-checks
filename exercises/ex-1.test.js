const DatabaseUtils = require('../database-utils');

describe("Exercise 1", () => {
    let { utils, results };
    
    beforeAll(async (done) => {
        utils = new DatabaseUtils();
        results = await utils.getUserInput();
        done();
    });
    afterAll(async (done) => {
        await utils.close();
        done();
    });

    it('The query should contain at least 2 rows', () => {
        expect(results.queryResults.length, `Your query only returned ${results.queryResults.length} results`).toBeGreaterThan(2);
    });

    it('The query should contain SELECT and not INSERT', () => {
        expect(results.query.toLowerCase().indexOf('select'), "You query did not contain a select statement").toBeGreaterThan(-1);
    });
})