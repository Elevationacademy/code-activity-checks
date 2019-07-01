const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

// Should we check all?
describe( 'exercise1', () => {
    it( `You should create a \`get('/sanity')\` route`, async done => {
        const response = await Client.get( 'sanity', false )
        expect( response, 'You should return a simple string (not object) that server is up and running' ).toBe( 'Server up and running' )
        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
