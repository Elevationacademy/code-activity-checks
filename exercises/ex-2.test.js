const DatabaseUtils = require('../../database-utils');

describe("Exercise 2", () => {
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

    it('The query should contain 13 rows', () => {
        expect(results.queryResults.rows.length, `Your query only returned ${results.queryResults.rows.length} results`).toBeGreaterThan(13);
    });

    it('The query should contain INNER JOIN', () => {
        expect(results.query.toLowerCase().indexOf('inner join'), "You query did not contain an INNER JOIN statement").toBeGreaterThan(-1);
    });
})