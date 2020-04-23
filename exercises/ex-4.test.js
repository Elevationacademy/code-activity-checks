const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
let server, hasError



describe('exercise4', () => {
    beforeAll(async done => {
        try {
            server = require('../../server/server')
        } catch (e) {
            hasError = true
        }
        done()
    })

    it(`You should create a 'delete' route called '/reservations' that receives one parameter 'resId' and deletes the reservation with that id from the 'reservations array. The route should send the object it deleted in the response.`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const data = require('../../utils/fullRes.json')
            reservations.length = 0
            for (let res of data) {
                reservations.push(res)
            }

            const randomIndex = Math.floor(Math.random() * data.length)
            const resToDelete = data[randomIndex]
            const response = await Client.delete(`reservations/${resToDelete.id}`)

            if (response.error) {
                expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
            } else {
                const exists = reservations.some(r => r.id === resToDelete.id)

                expect(exists, `After adding 3 reservations to the reservations array and making a 'delete' request to the '/reservations/${resToDelete.id}' route, the reservation with ${resToDelete.id} wasn't removed and still exists in the array. Make sure to remove the reservation from the 'reservations' array (you can try splice).`).toBeFalsy()
                expect(response, `After adding 3 reservations to the reservations array and making a 'delete' request to the '/reservations/${resToDelete.id}' route, we did not receive the correct object in response. We received ${JSON.stringify(response)} instead of ${JSON.stringify(resToDelete)}. Make sure the route is responding with the reservation that you are deleting. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(resToDelete)
                expect(reservations.length, `After adding 3 reservations to the reservations array and making a 'delete' request to the '/reservations/${resToDelete.id}' route, it seems like the reservation wasn't removed correctly from the 'reservations' array. The 'reservations' array has length ${reservations.length} instead of ${data.length - 1}. Make sure to only remove the reservation with the id that was sent as a param in the request (in this case ${resToDelete.id}).`).toBe(data.length - 1)
            }
        }
        done()
    })
    
    afterAll(done => {
        server.socket.close(done)
    })
})
