const dbUtils = require('../../utils/db.class')
const client = require('../../utils/client.class')

describe('exercise5', () => {
    let server
    beforeAll(async done => {
        server = require('../../src/server')
        await dbUtils.dropDBs()
        done()
    })

    it('You should write a query to your db from the `/messages/:userId` route to save the given message to your db for the given user id and res.send() the saved message in the response', async done => {
        const dummyUsers = require('../../utils/dummyUsers.json')
        for (let user of dummyUsers) {
            await dbUtils.addToDB('User', user)
        }

        let user = await dbUtils.queryDB('User', { username: dummyUsers[0].username })
        const messageToSave = { text: 'Hello there', time: new Date() }
        const returnedMessage = await client.addDoc(messageToSave, `messages/${user._id}`)
        const messageFound = await dbUtils.queryDB('Message', { text: messageToSave.text })
        expect(messageFound, `After saving this message '${JSON.stringify(messageToSave)}' to the db and searching for it, found something else: ${JSON.stringify(messageFound)}`).toBeTruthy()

        user = await dbUtils.queryDB('User', { username: user.username })
        const hasMessageId = user.messages.includes(messageFound._id)
        expect(hasMessageId, `After adding a message with id ${messageFound._id} to the db for the user with id ${user._id} and querying the db for that user, the user's message array didn't include the new message's _id and looked like this ${JSON.stringify(user.messages)}`).toBeTruthy()
        done()
    })

    afterAll(async done => {
        await dbUtils.dropAndDisconnect()
        server.socket.close(done)
    })
})