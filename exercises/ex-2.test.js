const { mongoose } = require('../../src/server')
const client = require('../../utils/client.class')
const dbUtils = require('../../utils/db.class')

describe('exercise2', () => {
  let server
  beforeAll(async done => {
    server = require('../../src/server')
    await dbUtils.dropDBs()
    done()
  })

  it('You should write a query to your db from the `/users` route to save the given user and res.send() the saved user in the response', async done => {
    const user = { username: 'shoobidoobi', age: 88 }
    await client.addDoc(user, 'users')

    const newUser = await dbUtils.queryDB('User', { username: user.username })

    expect(newUser.username, `After posting ${JSON.stringify(user)} to your /users route and querying the db, username should be ${user.username} instead received ${newUser.username}`).toBe(user.username)
    expect(newUser.age, `After posting ${JSON.stringify(user)} to your /users route and querying the db, age should be ${user.age} instead received ${newUser.age}`).toBe(user.age)
    expect(newUser.messages.length, `After posting ${JSON.stringify(user)} to your /users route and querying the db, messages should be an empty array instead the array had length of ${newUser.messages.length}`).toBe(0)
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