const { mongoose } = require('../../src/server')
const client = require('../../utils/client.class')
const dbUtils = require('../../utils/db.class')

describe('exercise3', () => {
    let server
    beforeAll(async done => {
        server = require('../../src/server')
        await dbUtils.dropDBs()
        done()
    })

    it('You should write a query to your db from the `/users` route to find all the users and res.send() them in the response', async done => {
        const dummyUsers = require('../../utils/dummyUsers.json')
        const AMOUNT_TO_ADD = dummyUsers.length

        for (let user of dummyUsers) {
            await dbUtils.addToDB('User', user)
        }

        const users = await client.getUsers()
        expect(users.length, `After adding ${AMOUNT_TO_ADD} users to db and sending a request to your '/users' route we receive ${users.length} users`).toBe(AMOUNT_TO_ADD)
        done()
    })

    afterAll(async done => {
        await dbUtils.dropAndDisconnect()
        server.socket.close(() => {
            mongoose.disconnect(() => {
                done()
                //Tests still don't close
            })
        })
    })
})