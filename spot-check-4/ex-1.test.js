const client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'spot-check-4', () => {
    it( 'You should  add a route called `/books` that takes a booksID parameter, and returns the correct book data given the above object', async done => {
        const books = await client.get( 'books', true )
        const ids = Object.keys( books )

        for ( const id of ids ) {
            let response = await client.get( `books/${id}`, true )
            expect( response, `You should return the value of book id ${id}` ).toEqual( books[ id ] )
        }

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
