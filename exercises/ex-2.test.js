const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
let server, hasError


beforeAll(async done => {
    try {
        server = require('../../server/server')
    } catch (e) {
        hasError = true
    }
    done()
})

describe('exercise2', () => {
    it( `You should create a 'get' route called '/reservations' that responds with the full array of reservations`, async done => {
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
                expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(response instanceof Array, `The '/reservations' 'get' route did not return an array. Make sure the route is responding only with the reservations array.`).toBeTruthy()
                expect(response.length, `When adding ${data.length} items to the reservations array and then making a 'get' request to to the '/reservations' route, the array that was sent in the response was not the correct one (had length of ${response.length})`).toBe(data.length)
            }
        }
        done()
    } )
} )

afterAll(done => {
    server.socket.close(done)
})