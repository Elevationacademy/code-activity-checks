const client = require( '../../utils/client.class' )
let server
beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )
// Should we check all?
describe( 'exercise2', () => {
    it( 'You should add a `/priceCheck` route which has one parameter: name, it should respond with the price of the item with that name', async done => {
        const results = await client.checkItem( 'couch' )
        try {
            const checkPrice = await client.checkPrice( 'couch' );
            expect( checkPrice.price, `It should respond with an object with the price of the given item, expected to get ${ results.price } but got ${ checkPrice.price }` ).toBe( results.price )
        }
        catch (e) {
            expect(e, 'You should have a route called `/priceCheck/:name`' ).toBeUndefined();
        }
        finally {
            done()
        }
    } );
    it( 'You should respond with { price: null }', async done => {
        const checkPrice = await client.checkPrice( 'undefined-item' )
        expect( checkPrice.price, 'You should respond with null as the value of the price when item is not found' ).toBeNull()
        done()
    } )
} )
afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )