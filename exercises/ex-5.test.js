const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
const { saveReservations, getTotal, generateRandomDate } = require('../../utils/utils')
let server, hasError



describe('exercise5', () => {
    beforeAll(done => {
        try {
            server = require('../../server/server')
        } catch (e) {
            hasError = true
        }
        done()
    })

    it(`You should create a 'get' route called '/reservations/total' that receives two parameters, the first 'month' and the second 'year'. It should respond with an object with a key 'total' and the value should be the total amount of reservations for the provided month (of the year) it received.`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const data = require('../../server/data.json')
            reservations.length = 0
            const { month, year } = generateRandomDate()
            saveReservations(reservations, data)

            let response = await Client.get(`reservations/total/${month}/${year}`)
            let expectedResponse = getTotal(reservations, month, year)

            if (response.error) {
                expect(false, 'Hmm, seems like the code you submitted is crashing (syntax), or the route doesn\'t exist, or you didn\'t close the request-reponse cycle.').toBeTruthy()
            } else {
                expect(response, `After adding the data from the 'data.json' file (located in the server folder) to the 'reservations' array, and making a 'get' request to '/reservations/total/${month}/${year}', the route responded with the wrong object. The route should respond with ${JSON.stringify(expectedResponse)} but instead it responded with ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedResponse)
            }
        }
        done()
    })

    afterAll(done => {
        server.socket.close(done)
    })
})
