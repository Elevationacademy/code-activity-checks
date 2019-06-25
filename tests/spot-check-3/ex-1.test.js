const Client = require( '../../utils/client.class' )
const exec = require( 'child_process' ).exec

beforeAll( async done => {
    exec( 'node server/server', { async: true } )
    done()
} )

describe( 'spot-check-3', () => {
    it( 'You should create a DELETE route in your server called /wonder that accepts a name parameter, and removes that wonder from the wonders array', async done => {
        await Client.post( 'wonder', { name: 'Colosseum', location: 'Rome, Italy' }, true )
        await Client.post( 'wonder', { name: 'Gordon Beach', location: 'Tel Aviv, Israel' }, true )

        await Client.delete( 'wonder/Colosseum' )

        const wonders = await Client.get( 'wonders' )
        const found = wonders.find( wonder => wonder.name === 'Colosseum' )

        expect( found, 'You should remove the wonder from the wonders array' ).toBeUndefined()

        done()
    } )
} )

afterAll( done => {
    Client.shutdown()
    done()
} )
