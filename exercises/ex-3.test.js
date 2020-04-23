const Client = require('../../utils/client.class')
const reservations = require('../../server/reservations')
let server, hasError



describe('exercise3', () => {
    beforeAll(async done => {
        try {
            server = require('../../server/server')
        } catch (e) {
            hasError = true
        }
        done()
    })

    it(`You should create a 'put' route called '/reservations' that receives one parameter 'resId' and an object with the keys 'prop' and 'value'. You should then update the reservation with id 'resId' and change the property in key prop to the value in key value and respond with the updated reservation object`, async done => {
        if (hasError) {
            expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
        } else {
            const res = {
                id: 'ygdsnsk',
                date: new Date('2019-05-16T09:21:18.407Z'),
                name: 'Safaa',
                numPeople: 5,
                isComplete: false
            }
            reservations.length = 0
            reservations.push(res)

            const toUpdate = [
                { prop: 'isComplete', value: true },
                { prop: 'name', value: 'Barbur' },
                { prop: 'date', value: new Date('2019-07-23T09:21:18.407Z') },
                { prop: 'numPeople', value: 2 },
            ]

            for (let body of toUpdate) {
                const  response = await Client.put(`reservations/${res.id}`, body)
                if (response.error) {
                    expect(false, 'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.').toBeTruthy()
                } else {
                    let { prop, value } = body
                    value = prop === 'date' ? new Date(value) : value
                    const responseValue = prop === 'date' ? new Date(response[prop]) : response[prop]
                    const arrValue = prop === 'date' ? new Date(reservations[0][prop]) : reservations[0][prop]

                    expect(responseValue, `We added this object to the reservations: ${JSON.stringify(res)}. When making a 'put' request to '/reservation/${res.id}' with the 'body' ${JSON.stringify(body)}, the object in response we received should have had property '${prop}' with value ${value}, but instead the value was ${responseValue}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(value)
                    expect(arrValue, `We added this object to the reservations: ${JSON.stringify(res)}. When making a 'put' request to '/reservation/${res.id}' with the 'body' ${JSON.stringify(body)}, the reservation object with id '${res.id}' in the 'reservations' array should have had property '${prop}' with value ${value}, but instead the value was ${arrValue}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(value)
                }
            }
        }
        done()
    })

    afterAll(done => {
        server.socket.close(done)
    })
})