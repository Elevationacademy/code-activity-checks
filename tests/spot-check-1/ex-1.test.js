const client = require( '../../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node src/server', { async: true } )
    done()
} )

describe( 'spot-check-1', () => {
    it( 'You should make a route called /life that simply returns the number 42 (as a string)', async done => {
        const response = await client.get( 'life' )

        expect( response, 'You should make a route call /life that returns "42" as the response' ).toBe('42')

        done()
    } )
} )

afterAll( done => {
    client.shutdown()
    done()
} )
