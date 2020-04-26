const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
const { saveReservations, getTotal, generateRandomDate } = require('../../utils/utils')
let server, hasError, date



describe('exercise5', () => {
    beforeAll(done => {
        try {
            server = require('../../server/server')
        } catch (e) {
            hasError = true
        }

        const data = require('../../server/data.json')
        reservations.length = 0
        date = generateRandomDate()
        saveReservations(reservations, data)

        done()
    })

    it(`You should create a 'get' route called '/reservations/total' that receives two parameters, the first 'month' and the second 'year'. It should respond with an object with a key 'total' and the value should be the total amount of reservations for the provided month (of the year) it received.`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const { month, year } = date
            let response = await Client.get(`reservations/total/${month}/${year}`)
            let expectedResponse = getTotal(reservations, month, year)

            if (response.error) {
                expect(false, 'Hmm, seems the code you submitted is crashing or the route doesn\'t exist. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the 'reservations' array, and making a 'get' request to '/reservations/total/${month}/${year}', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
            }
        }
        done()
    })
    it(`Your '/reservations/total' 'get' route that receives two parameters, 'month' and 'year' should also be able to receive an optional parameter 'population'. When population is set to 'true' the route should respond with an object with a key 'total' and the value should be the total amount of 'people' who reserved for the month (of the year) it received.`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const { month, year } = date
            let response = await Client.get(`reservations/total/${month}/${year}?population=true`)
            let expectedResponse = getTotal(reservations, month, year, null, true)

            if (response.error) {
                expect(false, 'Hmm, seems the code you submitted is crashing or the route doesn\'t exist. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the 'reservations' array, and making a 'get' request to '/reservations/total/${month}/${year}?population=true', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. Remember, when the 'population' query is provided you must return the total number of people found in the relevant reservations. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
            }
        }
        done()
    })
    it(`Your '/reservations/total' 'get' route that receives two parameters, 'month' and 'year' should also be able to receive an optional parameter 'date'. When date has a value the route should respond with an object with a key 'total' and the value should be the total amount of reservations for the day of the month (and year) it received. This should also work when 'population' is set to true (but in this case it will return the total number of people found in the reservation).`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const { day, month, year } = date
            let response = await Client.get(`reservations/total/${month}/${year}?date=${day}`)
            let expectedResponse = getTotal(reservations, month, year, day)

            if (response.error) {
                expect(false, 'Hmm, seems the code you submitted is crashing or the route doesn\'t exist. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the 'reservations' array, and making a 'get' request to '/reservations/total/${month}/${year}?date=${day}', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. Remember, if the 'date' query is provided you must limit your total to only reservations made for that date. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
            }

            response = await Client.get(`reservations/total/${month}/${year}?date=${day}&population=true`)
            expectedResponse = getTotal(reservations, month, year, day, true)

            if (response.error) {
                expect(false, 'Hmm, seems the code you submitted is crashing or the route doesn\'t exist. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the reservations array, and making a 'get' request to '/reservations/total/${month}/${year}?date=${day}&population=true', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. Remember, if the 'date' query is provided you must limit your total to only reservations made for that date. Additionally, when the 'population' query is provided you must return the total number of people found in the reservations. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
            }
        }
        done()
    })

    afterAll(done => {
        server.socket.close(done)
    })
})
