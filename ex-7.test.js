const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
const { saveReservations, getTotal, generateRandomDate } = require('../../utils/utils')
let server, hasError



describe('exercise7', () => {
  beforeAll(done => {
    try {
      server = require('../../server/server')
    } catch (e) {
      hasError = true
    }
    done()
  })

  it(`Your '/reservations/total' 'get' route that receives two parameters, 'month' and 'year' should also be able to receive an optional parameter 'population'. When population is set to 'true' the route should respond with an object with a key 'total' and the value should be the total amount of 'people' who reserved for the given time frame.`, async done => {
    if (hasError) {
      expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
    } else {
      const data = require('../../server/data.json')
      reservations.length = 0
      const { day, month, year } = generateRandomDate()
      saveReservations(reservations, data)

      let response = await Client.get(`reservations/total/${month}/${year}?population=true`)
      let expectedResponse = getTotal(reservations, month, year, null, true)

      if (response.error) {
        expect(false, 'Hmm, seems like the code you submitted is crashing (syntax), or the route doesn\'t exist, or you didn\'t close the request-reponse cycle.').toBeTruthy()
      } else {
        expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the 'reservations' array, and making a 'get' request to '/reservations/total/${month}/${year}?population=true', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. Remember, when the 'population' query is provided you must return the total number of people found in the relevant reservations. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
      }

      response = await Client.get(`reservations/total/${month}/${year}?day=${day}&population=true`)
      expectedResponse = getTotal(reservations, month, year, day, true)

      if (response.error) {
        expect(false, 'Hmm, seems like the code you submitted is crashing (syntax), or the route doesn\'t exist, or you didn\'t close the request-reponse cycle.').toBeTruthy()
      } else {
        expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the reservations array, and making a 'get' request to '/reservations/total/${month}/${year}?day=${day}&population=true', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. Remember, if the 'day' query is provided you must limit your total to only reservations made for that date. Additionally, when the 'population' query is provided you must return the total number of people found in the reservations. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
      }
    }
    done()
  })

  afterAll(done => {
    server.socket.close(done)
  })
})
