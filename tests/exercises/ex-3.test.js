const Client = require( '../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node server/server', { async: true } )
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
        expect( response, 'You should add a new word to the dictionary and set the count to be 1 and send a proper response (`Added {word}`)' ).toEqual( { text: 'Added some-random-word', currentCount: 1 } )

        response = await Client.post( 'word', { word: words[ 1 ] } )
        expect( response, 'You should increase the count of the word by 1 and send a proper response (`Added {word}`)' ).toEqual( { text: `Added ${words[ 1 ]}`, currentCount: ++count } )

        done()
    } )
} )

afterAll( done => {
    Client.shutdown()
    done()
} )
