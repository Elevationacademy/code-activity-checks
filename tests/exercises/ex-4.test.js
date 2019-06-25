const client = require( '../../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node src/server', { async: true } )
    done()
} )

describe( 'exercise4', () => {
    it( 'Should return 15', async done => {
        const itemName = 'chair'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( quantity - 1 )

        done()
    } )

    it( 'Should return 0', async done => {
        const itemName = 'couch'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( quantity - 1 )

        done()
    } )
} )

afterAll( done => {
    client.shutdown()
    done()
} )
