const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

// Should we check all?
describe( 'exercise5', () => {
    it( 'Add a get route called /total - it should respond with the current total count of words', async done => {
        await Client.post( 'add-ten-words' )
        const words = await Client.get( 'words' )
        const response = await Client.get( 'total' )

        let sum = 0
        for ( const word in words ) {
            sum += words[ word ]
        }

        expect( response.count, 'The response from the server should be {text: "Total count", count: {sum} }' ).toEqual(sum)

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
