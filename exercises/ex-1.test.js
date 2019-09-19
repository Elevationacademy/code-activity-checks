const Queue = require('../../src/Queue')

describe('Exercise 1', () => {
    it('Should create an `enqueue` method which adds a new element to the end of the queue', function () {
        const queue = new Queue()
        queue.enqueue(1)

        const expectedQueue = [1]

        expect(queue.length, `when enqueueing 1 to the queue, the length of the queue should be 1`).toBe(1)
        expect(queue.queue, `when pushing 1 to the queue, the queue should look like this - [1]`).toEqual(expectedQueue)
    })

    it('Should create a `peek` method which returns the front element of the queue', function () {
        const queue = new Queue()

        for (let i = 1; i <= 3; i++) {
            queue.enqueue(i)
        }

        expect(queue.peek(), `when enqueueing 1,2,3 to the queue, the front element of the queue should be 1`).toBe(1)
    })

    it('Should create a `dequeue` method which removes the front element of the queue', function () {
        const queue = new Queue()
        expect(queue.peek(), `when running the 'peek' method on an empty queue the method should return 'null'`).toBe(null)

        queue.enqueue(1)
        queue.enqueue(2)
        queue.enqueue(3)

        let expectedLength = 3

        for (let i = 1; i < 3; i++) {
            expect(queue.length, `when enqueueing 1,2,3 to the queue, the length of the queue should be ${expectedLength} but got ${queue.length}`).toBe(expectedLength)
            expectedLength--

            queue.dequeue()
            expect(queue.peek(), `when enqueueing 1,2,3 to the queue and dequeueing, the front element should be ${i + 1}`).toBe(i + 1)
        }
    })

    it('Should create an `isEmpty` method which returns `true` if the queue is empty and `false` otherwise', function () {
        const queue = new Queue()
        expect(queue.isEmpty(), `when instanciating a new queue, the 'isEmpty' method should return 'true'`).toBe(true)

        for (let i = 1; i <= 3; i++) {
            queue.enqueue(i)
        }

        expect(queue.isEmpty(), `when instanciating a new queue and enqueueing some values, the 'isEmpty' method should return false`).toBe(false)

        for (let i = 1; i <= 3; i++) {
            queue.dequeue()
        }

        expect(queue.isEmpty(), `when instanciating a new queue, enqueueing some values and then dequeueing them, the 'isEmpty' method should return 'true'`).toBe(true)
    })
})