import { Mongoose, Schema } from "mongoose"
import MongooseConnection from '../../utils/MongooseConnection'
import MongoDbTester from '../../utils/MongoDbTester'
import * as mongoose from 'mongoose'

describe( 'spot-check-1', () => {
	let mongoose: Mongoose
	let tester: MongoDbTester

	const DATABASE_NAME: string = 'computerDB'
	const TEST_MODEL_NAME: string = 'computer'
	const TEST_COLLECTION_NAME: string = 'computers'

	beforeEach( async done => {
		mongoose = await MongooseConnection.getInstance( DATABASE_NAME )
		tester = new MongoDbTester( mongoose, DATABASE_NAME )

		tester.setCollectionName( TEST_COLLECTION_NAME )

		await tester.dropDatabase()

		done()
	} )

	afterEach( async done => {
		await tester.dropDatabase()

		tester.close()

		done()
	} )

	it( 'You should create computerSchema with the following properties: `maker` and `price` and a model called `computer` to use this schema', async done => {
		MongoDbTester.fetchAndExecuteQuery( 'spot-check-1.js', async () => {
			tester.setModelName( TEST_MODEL_NAME )

			tester.applyActualModel( new Schema( {
				maker: String,
				price: Number
			} ) )

			const results: mongoose.Document[] = await tester.fetchCollectionContent()
			expect( results.length, 'You should insert 2 objects to the collection' ).toBe( 2 )

			done()
		} )
	} )
} )



