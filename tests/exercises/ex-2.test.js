const client = require( '../../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node src/server', { async: true } )
    done()
} )

// Should we check all?
describe( 'exercise2', () => {
    it( 'You should add a `/priceCheck` route which has one parameter: name, it should return the price of the item with that name', async done => {
        const results = await client.checkItem( 'couch' )
        const checkPrice = await client.checkPrice( 'couch' )

        expect( checkPrice, 'You should have a route called `/priceCheck/:name`' ).not.toBeNull()
        expect( checkPrice.price, `You should return an object with the price of the given item, expected to get ${ results.price } but got ${ checkPrice.price }` ).toBe( results.price )

        done()
    } )

    it( 'You should return { price: null }', async done => {
        const checkPrice = await client.checkPrice( 'undefined-item' )

        expect( checkPrice.price, 'You should return null as the value of the price when item is not found' ).toBeNull()

        done()
    } )
} )

afterAll( done => {
    client.shutdown()
    done()
} )
