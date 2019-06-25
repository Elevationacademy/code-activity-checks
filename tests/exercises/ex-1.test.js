const Client = require( '../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node server/server.js', { async: true } )
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
    Client.shutdown()
    done()
} )
