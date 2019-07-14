const MongoDbTester = require( '../../utils/MongoDbTester' )
const Client = require( '../../utils/Client' )

require( 'dotenv' ).config()
const PORT = process.env.SERVER_PORT

describe( 'ex-1', () => {
	let mongoose
	let tester
	let app
	let server

	const DATABASE_NAME = 'peopleDB'
	const TEST_MODEL_NAME = 'person'

	beforeAll( done => {
		app = require( '../solutions/exercises/server/app/app.js' )
		mongoose = require( '../solutions/exercises/server/app/mongoose.js' )
		tester = new MongoDbTester( mongoose, DATABASE_NAME )

		server = app.listen( PORT )

		done()
	} )

	afterAll( async done => {
		await tester.dropDatabase()
		tester.close()
		server.close( () => done() )
	} )

	it( 'In the /person POST route you should receive an object with a `firstName`, `lastName`, and `age` and save it.', async done => {
		const paths = []

		await Client.POST( '/person', { firstName: 'John', lastName: 'Snow', age: 30 } )

		// Check the model
		tester.setModelName( TEST_MODEL_NAME )
		expect( tester.isModelExists(), `You should create a model called ${ TEST_MODEL_NAME }` ).toBeTruthy()
		tester.applyActualModel()

        // Check the schema
		tester.getModelSchema().eachPath( ( path ) => paths.push( path ) )
		expect( paths, `You should define 'firstName' property in your Schema` ).toContain( 'firstName' )
		expect( paths, `You should define 'lastName' property in your Schema` ).toContain( 'lastName' )
		expect( paths, `You should define 'age' property in your Schema` ).toContain( 'age' )

        // Check the results
        const results = await tester.fetchCollectionContent()
        expect( results.length, 'You should insert only one record (using .save())' ).toBe( 1 )

		done()
	} )
} )
