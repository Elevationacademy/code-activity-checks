
describe('exercise1', () => {
  it(`You should create a User Schema with the properties 'username' with a string value, 'age' with a number value, and 'messages' with an array value which holds ref id's to Message documents`, () => {
      let User, hasError
      try {
          User = require('../../src/models/User')
      } catch (e) {
          hasError = true
      }

      if (hasError) {
          expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
      } else {
          const username = 'shoobert'
          const age = 25

          let newUser
          hasError = false
          try {
              newUser = new User({ username, age, messages: [] })
          } catch (e) {
              hasError = true
          }

          // const symbolToAccess = Object.getOwnPropertySymbols(newUser.messages).find(name => name === 'Symbol(mongoose#Array#_schema)')

          if (hasError) {
              expect(false, 'Hmm, seems the User you exported from the User.js file is not a mongoose model or is crashing the code.').toBeTruthy()
          } else {
              expect(newUser.username, `When creating a new user with a username of ${username}, the resulting object had a username of ${newUser.username}`).toBe(username)
              expect(newUser.age, `When creating a new user with an age of ${age}, the resulting object had an age of ${newUser.age}`).toBe(age)
              expect(newUser.messages.length, `When creating a new user with an empty messages array, the resulting object had a messages array of length ${newUser.messages.length}`).toBe(0)

              expect(typeof newUser.username, `The username property of a User should be of type string, instead found type ${typeof newUser.username}`).toBe('string')
              expect(typeof newUser.age, `The age property of a User should be of type number, instead found type ${typeof newUser.age}`).toBe('number')
          }
      }
      //Should check if array is of ref id to messages.
  })

  it(`You should create a Message Schema with the properties 'text' with a string value, and 'time' with a date value`, () => {
      let Message, hasError
      try {
          Message = require('../../src/models/Message')
      } catch (e) {
          hasError = true
      }

      if (hasError) {
          expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
      } else {
          const text = 'shoobi doobi'
          const time = new Date()

          let newMessage
          hasError = false
          try {
              newMessage = new Message({ text, time })
          } catch (e) {
              hasError = true
          }

          if (hasError) {
              expect(false, 'Hmm, seems the Message you exported from the Message.js file is not a mongoose model or is crashing the code.').toBeTruthy()
          } else {
              expect(newMessage.text, `When creating a new message with a text of ${text}, the resulting object had a text property with value ${newMessage.text}`).toBe(text)
              expect(newMessage.time, `When creating a new message with a time of ${time}, the resulting object had a time property with value ${newMessage.time}`).toEqual(time)

              expect(typeof newMessage.text, `The text property of a Message should be of type string, instead found type ${typeof newMessage.text}`).toBe('string')
              expect(newMessage.time instanceof Date, `The time property of a Message should be of type Date instead got type ${typeof newMessage.time}`).toBeTruthy()
          }
      }
  })
})