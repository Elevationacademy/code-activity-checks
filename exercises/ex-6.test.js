const { mongoose } = require('../../src/server');
const dbUtils = require('../../utils/db.class');
const client = require('../../utils/client.class');

describe('exercise6', () => {
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
  });

  it('You should write a query to your db from the `/users/:username` route to find a user by a given username and res.send() this user with their messages (using populate)', async done => {
    if (hasError) {
      expect(false, "There seems to be something wrong with the export of your model/s, check them and try again").toBeTruthy()
    } else {
      const dummyUsers = require('../../utils/dummyUsers.json');
      await dbUtils.addToDB('User', dummyUsers[0]);
      let user = await dbUtils.queryDB('User', { username: dummyUsers[0].username });
      const messageToSave = { text: 'Hello there', time: new Date() };

      let returnedMessage, messageFound, populatedUser
      hasError = false
      try {
        returnedMessage = await client.addDoc(messageToSave, `messages/${user._id}`);
        messageFound = await dbUtils.queryDB('Message', { text: messageToSave.text });
        populatedUser = await client.getPopulatedUser(dummyUsers[0].username);
        user = await dbUtils.queryDB('User', { username: user.username })
      } catch (e) {
        hasError = false
      }

      if (hasError) {
        expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
      } else {
        expect(populatedUser.messages[0].text, `After adding a message with id ${messageFound._id} and text of '${messageToSave.text}' to the db for a user with id ${user._id} and querying the db for that user with his populated messages, the user's message array didn't include the populated message. The user's message array looked like this: ${JSON.stringify(user.messages)}, while it should look like this: [{"_id": "${messageFound._id}", "text": "${messageToSave.text}", "time": "${messageToSave.time}"}]`).toBe(messageToSave.text);
      }
    }
    done();
  });

  afterAll(async done => {
    await dbUtils.dropAndDisconnect()
    server.socket.close(done)
  });
});