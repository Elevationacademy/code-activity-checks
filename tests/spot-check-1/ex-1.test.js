const Client = require( '../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node server/server.js', { async: true } )
    jest.setTimeout( 3000 )
    done()
} )

describe( 'spot-check-1', () => {
    it( 'You should add a POST route called /wonder that receives and object and adds it to the wonders array', async done => {
        try {
            await Client.post( 'wonder', { name: 'Gordon Beach', location: 'Tel Aviv' }, true )

            const wonders = await Client.get( 'wonders' )

            expect( wonders[ wonders.length - 1 ], 'Make sure you have added the object to the wonders array and also added visited: false to the object' ).toEqual( {
                name: 'Gordon Beach',
                location: 'Tel Aviv',
                visited: false
            } )
        } catch ( e ) {
            fail('Make sure you added response.end()')
        } finally {
            done()
        }
    } )
} )

afterAll( done => {
    Client.shutdown()
    done()
} )
