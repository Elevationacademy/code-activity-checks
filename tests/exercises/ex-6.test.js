const client = require( '../../utils/client.class' )
const exec = require( 'child_process' ).exec
const _ = require( 'lodash' )

function isArraysEqual( x, y ) {
    return _( x ).xorWith( y, _.isEqual ).isEmpty()
}

beforeAll( async done => {
    exec( 'node src/server', { async: true } )
    // expect( 1 ).toEqual( 2 )

    done()
} )

describe( 'exercise6', () => {
    it( 'Should be the same store of calling with false admin param', async ( done ) => {
        const originalStore = await client.fetchStore()
        let store = await client.sale( false )

        expect( isArraysEqual( store, originalStore ) ).toBeTruthy()
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

        expect( isArraysEqual( store, originalStore ) ).toBeTruthy()

        done()
    } )
} )

afterAll( done => {
    client.shutdown()
    done()
} )
