const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

describe( 'exercise4', () => {
    it( 'You should create a post route called /words - this receives one parameter: sentence - still a string, but it should be a string with many words.', async done => {
        await Client.post( 'add-ten-words' )
        await Client.get( 'clear' )

        const response = await Client.post( 'words', { sentence: 'You know nothing john snow nothing' } )

        expect( response, 'The response from the server should be {text: "Added {numNewWords} words, {numOldWords} already existed", currentCount: -1}' ).toEqual( {
            currentCount: -1,
            text: 'Added 5 words, 1 already existed'
        } )

        const words = await Client.get( 'words' )

        const expectedResult = {
            You: 1,
            know: 1,
            nothing: 2,
            john: 1,
            snow: 1
        }

        Object.keys( words ).forEach( word => expect( expectedResult[ word ], '' ).not.toBeUndefined() )
        expect( words[ 'nothing' ], 'counting' ).toBe( 2 )

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
