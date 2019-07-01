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
expect(typeof response).toBe("object")
        expect( response.currentCount, 'The response object from the server should have a currentCount key equal to -1}' ).toBe(-1)
        expect( response.text, 'The response from the server should be {text: "Added {numNewWords} words, {numOldWords} already existed", currentCount: -1}' ).toContain('5')
        expect( response.text, 'The response from the server should be {text: "Added {numNewWords} words, {numOldWords} already existed", currentCount: -1}' ).toContain('1')

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
