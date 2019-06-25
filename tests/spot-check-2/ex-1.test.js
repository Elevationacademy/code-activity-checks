const client = require( '../../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node src/server', { async: true } )
    done()
} )

describe( 'spot-check-2', () => {
    it( 'You should make a route called /users that accepts a `userID` and returns the correct string for that user', async done => {
        const response = await client.get( 'users/tilda' )

        expect( response, 'You should return the value of the user `tilda`' ).toBe( "You've done a wonderful job" )

        done()
    } )
} )

afterAll( done => {
    client.shutdown()
    done()
} )
