const dbUtils = require('../../utils/db.class')
const client = require('../../utils/client.class')

describe('exercise5', () => {
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

    it('You should write a query to your db from the `/messages/:userId` route to save the given message to your db for the given user id and res.send() the saved message in the response', async done => {
        if (hasError) {
            expect(false, "There seems to be something wrong with the export of your model/s, check them and try again").toBeTruthy()
        } else {
            const dummyUsers = require('../../utils/dummyUsers.json')
            for (let user of dummyUsers) {
                await dbUtils.addToDB('User', user)
            }
            let user = await dbUtils.queryDB('User', { username: dummyUsers[0].username })
            const messageToSave = { text: 'Hello there', time: new Date() }

            let returnedMessage, messageFound
            hasError = false
            try {
                returnedMessage = await client.addDoc(messageToSave, `messages/${user._id}`)
                messageFound = await dbUtils.queryDB('Message', { text: messageToSave.text })
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(messageFound, `After saving this message '${JSON.stringify(messageToSave)}' to the db and searching for it, found something else: ${JSON.stringify(messageFound)}`).toBeTruthy()

                user = await dbUtils.queryDB('User', { username: user.username })
                const hasMessageId = user.messages.includes(messageFound._id)
                expect(hasMessageId, `After adding a message with id ${messageFound._id} to the db for the user with id ${user._id} and querying the db for that user, the user's message array didn't include the new message's _id and looked like this ${JSON.stringify(user.messages)}`).toBeTruthy()
            }
        }
        done()
    })

    afterAll(async done => {
        await dbUtils.dropAndDisconnect()
        server.socket.close(done)
    })
})