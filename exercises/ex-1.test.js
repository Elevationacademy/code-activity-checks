const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
let server, hasError



describe('exercise1', () => {
    beforeAll(async done => {
        try {
            server = require('../../server/server')
        } catch (e) {
            hasError = true
        }
        done()
    })

    it(`You should create a 'post' route called '/reservations' which should add a new reservation to the 'reservations' array`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const reservation = {
                name: 'Corinne', numPeople: 4, date: new Date('2019-05-16T09:21:18.407Z')
            }

            reservations.length = 0
            const response = await Client.post('reservations', reservation)

            if (response.error) {
                expect(false, 'Hmm, seems the code you submitted is crashing or the route doesn\'t exist. Please check things like syntax and try again.').toBeTruthy()
            } else {
                expect(response.name, `When making a post request to the '/reservations' route with ${JSON.stringify(reservation)}, you should respond with the object that was added to the array, and it should have a key 'name' with value ${reservation.name}. Instead the name property found was ${response.name} and the full object received was ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toBe(reservation.name)
                expect(new Date(response.date), `When making a post request to the '/reservations' route with ${JSON.stringify(reservation)}, you should respond with the object that was added to the array and it should have a key 'date' with value ${reservation.date}. Instead the date property found was ${new Date(response.date)} and the full object received was ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(reservation.date)
                expect(response.numPeople, `When making a post request to the '/reservations' route with ${JSON.stringify(reservation)}, you should respond with the object that was added to the array and it should have a key 'numPeople' with value ${reservation.numPeople}. Instead the numPeople property found was ${response.numPeople} and the full object received was ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toBe(reservation.numPeople)
                expect(response.isComplete, `When making a post request to the '/reservations' route with ${JSON.stringify(reservation)}, you should respond with the object that was added to the array and it should have a key 'isComplete' with value 'false'. Instead the isComplete property found was ${response.isComplete} and the full object received was ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toBe(false)
                expect(typeof response.id, `When making a post request to the '/reservations' route with ${JSON.stringify(reservation)}, you should respond with the object that was added to the array and it should have a key 'id' with a unique string value. Instead the id property found has type of ${typeof response.id} and the full object received was ${JSON.stringify(response)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toBe('string')
                expect(reservations.length, `When making a post request to the '/reservations' route, the object was not added to the 'reservations' array correctly. Expected the array to have length '1', instead got ${reservations.length}`).toBe(1)
            }
        }
        done()
    })

    afterAll(done => {
        server.socket.close(done)
    })
})

