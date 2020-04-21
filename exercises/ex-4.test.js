const dbUtils = require('../../utils/db.class')
const client = require('../../utils/client.class')

describe('exercise4', () => {
    let server, dbUtils, hasError
    beforeAll(async done => {
        server = require('../../src/server')
        try {
            dbUtils = require('../../utils/db.class')
            await dbUtils.dropDBs()
        } catch (e) {
            hasError = true
        }
        done()
    })

    it('You should delete a user with a given `userId` from your database. You should write this command from within the `/users/:userId` delete route', async done => {
        if (hasError) {
            expect(false, "There seems to be something wrong with the export of your model/s, check them and try again").toBeTruthy()
        } else {
            const dummyUsers = require('../../utils/dummyUsers.json')

            for (let user of dummyUsers) {
                await dbUtils.addToDB('User', user)
            }
            const userToDelete = await dbUtils.queryDB('User', {})

            hasError = false
            try {
                await client.deleteUser(userToDelete._id)
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
            } else {
                const userToCheck = await dbUtils.queryDB('User', { username: userToDelete.username })
                expect(userToCheck, `After adding ${dummyUsers.length} users to db and deleting user with id ${userToDelete._id} and username ${userToDelete.username} we queried the database for this user and found a document with those attributes`).toBeFalsy()
            }
        }
        done()
    })

    afterAll(async done => {
        await dbUtils.dropAndDisconnect()
        server.socket.close(done)
    })
})