const Client = require( '../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node server/server', { async: true } )
    done()
} )

describe( 'exercise2', () => {
    it( 'You should set up a get route called `/word` that receives one parameter: word (a string with a single word in it)', async done => {
        await Client.post( 'add-ten-words' )

        const wordsDictionary = await Client.get( 'words' )
        const words = Object.keys( wordsDictionary )

        let count = wordsDictionary[ words[ 0 ] ]
        let wordCount = await Client.get( `word/${ words[ 0 ] }` )
        expect( wordCount.count, '' ).toBe( count )

        count = wordsDictionary[ words[ 1 ] ]
        wordCount = await Client.get( `word/${ words[ 1 ] }` )
        expect( wordCount.count, '' ).toBe( count )

        done()
    } )
} )

afterAll( done => {
    Client.shutdown()
    done()
} )
