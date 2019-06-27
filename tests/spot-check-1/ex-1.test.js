const client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'spot-check-1', () => {
    it( 'You should make a route called /life that simply returns the number 42 (as a string)', async done => {
        const response = await client.get( 'life' )

        expect( response, 'You should make a route call /life that returns "42" as the response' ).toBe( '42' )

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
