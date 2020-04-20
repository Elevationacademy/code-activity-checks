const client = require('../../utils/client.class')

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

        let hasError
        try {
            const dbUtils = require('../../utils/db.class')
            for (let user of dummyUsers) {
                await dbUtils.addToDB('User', user)
            }
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, "There seems to be something wrong with the export of your model/s, check them and try again").toBeTruthy()
        } else {
            let users
            hasError = false
            try {
                users = await client.getUsers()
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(users.length, `After adding ${AMOUNT_TO_ADD} users to db and sending a request to your '/users' route we receive ${users.length} users`).toBe(AMOUNT_TO_ADD)
            }
        }
        done()
    })

    afterAll(async done => {
        await dbUtils.dropAndDisconnect()
        server.socket.close(done);
    })
})