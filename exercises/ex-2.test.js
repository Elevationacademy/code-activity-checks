const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
let server, hasError



describe('exercise2', () => {
    beforeAll(async done => {
        try {
            server = require('../../server/server')
        } catch (e) {
            hasError = true
        }
        done()
    })

    it(`You should create a 'get' route called '/reservations' that responds with the full array of 'reservations'`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const data = require('../../utils/fullRes.json')
            reservations.length = 0
            for (let res of data) {
                reservations.push(res)
            }

            const response = await Client.get('reservations')
            if (response.error) {
                expect(false, 'Hmm, seems like the code you submitted is crashing (syntax), or the route doesn\'t exist, or you didn\'t close the request-reponse cycle.').toBeTruthy()
            } else {
                expect(response instanceof Array, `The '/reservations' 'get' route did not respond with an array. Make sure the route is sending only the 'reservations' array in the response.`).toBeTruthy()
                expect(response.length, `When adding ${data.length} reservations to the 'reservations' array and then making a 'get' request to to the '/reservations' route, the array that was sent in the response was not the correct one (had length of ${response.length})`).toBe(data.length)
            }
        }
        done()
    })

    afterAll(done => {
        server.socket.close(done)
    })
})
