const client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'spot-check-3', () => {
    it( 'You should make a route called `/details` that extracts the optional parameters zipcode, city, and middleNam', async done => {
        const query = []

        const params = {
            zipcode: '90210',
            city: 'Tel Aviv',
            middleName: 'Snow'
        }

        for ( const key in params ) {
            query.push( `${ key }=${ params[ key ] }` )
        }

        const response = await client.get( 'details/?' + query.join('&'), true )

        expect( response, 'Your response should extracts the optional parameters zipcode, city, and middleName from the query params and return them as on object' ).toEqual( params )

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
