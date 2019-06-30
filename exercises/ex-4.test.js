const client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'exercise4', () => {
    it( 'Should respond with the updated item in which the quantity has decreased by one', async done => {
        const itemName = 'chair'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( quantity - 1 )

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
