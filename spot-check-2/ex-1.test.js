const client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'spot-check-2', () => {
    it( 'You should make a route called /users that accepts a `userID` and returns the correct string for that user', async done => {
        const response = await client.get( 'users/tilda' )

        expect( response, 'You should return the value of the user `tilda`' ).toBe( 'You\'ve done a wonderful job' )

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
