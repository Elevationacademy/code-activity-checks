const MongoDbTester = require( '../utils/MongoDbTester' )
const Client = require( '../utils/Client' )

require( 'dotenv' ).config()
const PORT = process.env.SERVER_PORT

describe( 'ex-3', () => {
	let mongoose
	let tester
	let app
	let server

	const DATABASE_NAME = 'peopleDB'
	const TEST_MODEL_NAME = 'person'

	beforeAll( async done => {
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

	// TODO: Change the spelling
	it( 'You should create a DELETE route called /apocalypse which REMOVES ALL the data from your people collection', async done => {
		tester.setModelName( TEST_MODEL_NAME )
		tester.applyActualModel()

		let person = await new (tester.getModel())({ firstName: 'John', lastName: 'Snow', age: 16 })

		await person.save()
		await person.save()
		await person.save()

		// Check the server delete method
		await Client.DELETE( '/apocalypse' )

		// Check the collection content again, expect it to be 0
		const people = await tester.fetchCollectionContent()
		expect( people.length, 'The collection length should be 0, did you delete all the documents from the collection?' ).toBe( 0 )

		done()
	} )
} )
