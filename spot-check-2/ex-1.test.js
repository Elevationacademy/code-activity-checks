const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

describe( 'spot-check-2', () => {
    it( 'Create a PUT route called /wonder that accepts a name parameter and marks this wonder as visited (visited: true)', async done => {
        await Client.post( 'wonder', { name: 'Elevation', location: 'Tel Aviv, Israel' }, true )
        await Client.put( 'wonder/Elevation', true )

        const wonders = await Client.get( 'wonders' )

        expect( wonders[ wonders.length-1 ].visited, 'You should find the wonder by his name and change to be visited: true' ).toBeTruthy()

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
