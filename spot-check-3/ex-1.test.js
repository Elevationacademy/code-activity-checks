const Client = require( '../../utils/client.class' )
let server

beforeAll( async done => {
    server = require( '../../server/server' )
    done()
} )

describe( 'spot-check-3', () => {
    it( 'You should create a DELETE route in your server called /wonder that accepts a name parameter, and removes that wonder from the wonders array', async done => {
        await Client.post( 'wonder', { name: 'Colosseum', location: 'Rome, Italy' }, true )
        await Client.post( 'wonder', { name: 'Gordon Beach', location: 'Tel Aviv, Israel' }, true )

        await Client.delete( 'wonder/Colosseum' )

        const wonders = await Client.get( 'wonders' )

        if ( wonders === false ) {
            fail( 'You should create a DELETE route called /wonder that removes wonder from the wonders array' )
            done()
        } else {
            const found = wonders.find( wonder => wonder.name === 'Colosseum' )
            expect( found, 'You should remove the wonder from the wonders array' ).toBeUndefined()

            done()
        }
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
