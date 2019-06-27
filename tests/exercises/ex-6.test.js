const client = require( '../../utils/client.class' )
const _ = require( 'lodash' )
let server

function isArraysEqual( x, y ) {
    return _( x ).xorWith( y, _.isEqual ).isEmpty()
}

beforeAll( async done => {
    server = require( '../../src/server' )
    done()
} )

describe( 'exercise6', () => {
    it( 'Should be the same store of calling with false admin param', async ( done ) => {
        const originalStore = await client.fetchStore()
        const store = await client.sale( false )

        expect( isArraysEqual( store, originalStore ), 'You should not change the store when calling with false admin param' ).toBeTruthy()
        done()
    } )

    it( 'Should change the prices in the store when sending admin param to be true', async ( done ) => {
        const originalStore = await client.fetchStore()
        let store = await client.sale( true )

        // Make the logic of reducing the prices
        for ( let i = 0; i < originalStore.length; i++ ) {
            if ( originalStore[ i ].inventory > 10 ) {
                originalStore[ i ].price = originalStore[ i ].price / 2
            }
        }

        expect( isArraysEqual( store, originalStore ), 'You should reduce the price of any item with an inventory greater than 10 by 50%' ).toBeTruthy()

        done()
    } )
} )

afterAll( done => {
    server.socket.close( () => {
        done()
    } )
} )
