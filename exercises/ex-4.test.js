const { mongoose } = require('../../src/server')
const dbUtils = require('../../utils/db.class')
const client = require('../../utils/client.class')

describe('exercise4', () => {
    let server
    beforeAll(async done => {
        server = require('../../src/server')
        await dbUtils.dropDBs()
        done()
    })

    it('You should delete a user with a given `userId` from your database. You should write this command from within the `/users/:userId` delete route', async done => {
        const dummyUsers = require('../../utils/dummyUsers.json')

        for (let user of dummyUsers) {
            await dbUtils.addToDB('User', user)
        }

        const userToDelete = await dbUtils.queryDB()
        await client.deleteUser(userToDelete._id)

        const userToCheck = await dbUtils.queryDB(userToDelete.username)
        expect(userToCheck, `After adding ${dummyUsers.length} users to db and deleting user with id ${userToDelete._id} and username ${userToDelete.username} we queried the database for this user and found a document with those attributes`).toBeFalsy()
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