import * as http from 'http'
import { Application } from 'express'
import { Mongoose } from 'mongoose'
import MongoDbTester from '../../utils/MongoDbTester'
import Client from '../../utils/Client'
import * as mongoose from "mongoose"

require( 'dotenv' ).config()
const PORT = process.env.SERVER_PORT

describe( 'ex-2', () => {
	let mongoose: Mongoose
	let tester: MongoDbTester
	let app: Application
	let server: http.Server

	const DATABASE_NAME: string = 'peopleDB'
	const TEST_MODEL_NAME: string = 'person'

	beforeEach( done => {
		app = require( '../../solutions/exercises/server/app/app.js' )
		mongoose = require( '../../solutions/exercises/server/app/mongoose.js' )
		tester = new MongoDbTester( mongoose, DATABASE_NAME )

		server = app.listen( PORT )

		done()
	} )

	afterEach( async done => {
		await tester.dropDatabase()
		tester.close()
		server.close()

		done()
	} )

	it( 'In the /person/:id put route you should receive id update the record with age of 80', async done => {
		tester.setModelName( TEST_MODEL_NAME )
		tester.applyActualModel()

		const model = tester.getModel()
		const person = await new model({ firstName: 'John', lastName: 'Snow', age: 30 })
		await person.save()

		let people: any[] = await tester.fetchCollectionContent()
		const id: string = people[ 0 ]._id

		await Client.PUT( `/person/${ id }` )

		people = await tester.fetchCollectionContent()

		expect( people[ 0 ].age, 'The put request should update the age' ).toBe( 80 )

		done()
	} )
} )

