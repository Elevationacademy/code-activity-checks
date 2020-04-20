const client = require('../../utils/client.class')

describe('exercise2', () => {
  let server, dbUtils, hasError
  beforeAll(async done => {
    server = require('../../src/server')
    try {
      await dbUtils.dropDBs()
    } catch (e) {
      hasError = true
    }
    done()
  })

  it('You should write a query to your db from the `/users` route to save the given user and res.send() the saved user in the response', async done => {
    if (hasError) {
      expect(false, "There seems to be something wrong with the export of your model/s, check them and try again").toBeTruthy()
    } else {
      const user = { username: 'shoobidoobi', age: 88 }

      hasError = false
      try {
        await client.addDoc(user, 'users')
      } catch (e) {
        hasError = true
      }

      if (hasError) {
        expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
      } else {
        const newUser = await dbUtils.queryDB('User', { username: user.username })
        expect(newUser.username, `After posting ${JSON.stringify(user)} to your /users route and querying the db, username should be ${user.username} instead received ${newUser.username}`).toBe(user.username)
        expect(newUser.age, `After posting ${JSON.stringify(user)} to your /users route and querying the db, age should be ${user.age} instead received ${newUser.age}`).toBe(user.age)
        expect(newUser.messages.length, `After posting ${JSON.stringify(user)} to your /users route and querying the db, messages should be an empty array instead the array had length of ${newUser.messages.length}`).toBe(0)
      }
    }
    done()
  })

afterAll(async done => {
  await dbUtils.dropAndDisconnect()
  server.socket.close(done)
})
})