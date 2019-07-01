const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

describe( 'spot-check-2', () => {
    it( 'Create a PUT route called /wonder that accepts a name parameter (in body payload) and marks this wonder as visited (visited: true)', async done => {
        await Client.post( 'wonder', { name: 'Colosseum', location: 'Rome, Italy' }, true )
        await Client.put( 'wonder', { name: 'Colosseum' }, true )

        const wonders = await Client.get( 'wonders' )

        expect( wonders[ 0 ].visited, 'You should find the wonder by his name and change to be visited: true' ).toBeTruthy()

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
