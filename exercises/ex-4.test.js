const client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'exercise4', () => {
    it( 'Should respond with 15', async done => {
        const itemName = 'chair'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( `${quantity - 1}` )

        done()
    } )

    it( 'Should respond with 0', async done => {
        const itemName = 'couch'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( `${quantity - 1}` )

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
