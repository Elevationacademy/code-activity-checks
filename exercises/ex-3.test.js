const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

// Should we check all?
describe( 'exercise3', () => {
    it( `You should create a post route called /word, that also receives a body payload: { word: 'some-word' } - an object with a single word in it`, async done => {
        await Client.post( 'add-ten-words' )

        const wordsDictionary = await Client.get( 'words' )
        const words = Object.keys( wordsDictionary )
        let count = wordsDictionary[ words[ 1 ] ]

        let response = await Client.post( 'word', { word: 'some-random-word' } )
        expect( response.text, 'You should add a new word to the dictionary and set the count to be 1 and send a proper response (`Added {word}`)' ).toContain('some-random-word')
        expect( response.currentCount, 'You should add a new word to the dictionary and set the count to be 1 and send a proper response (`Added {word}`)' ).toEqual(1)

        response = await Client.post( 'word', { word: words[ 1 ] } )
        expect( response.text, 'You should increase the count of the word by 1 and send a proper response (`Added {word}`)' ).toContain(words[ 1 ])
        expect( response.currentCount, 'You should increase the count of the word by 1 and send a proper response (`Added {word}`)' ).toEqual(++count)

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
