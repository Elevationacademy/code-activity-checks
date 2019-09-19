const Stack = require('../../src/stack')

describe('exercise1', () => {
    it('Should create a `push` method which adds a new element to the top of the stack', function () {
        const stack = new Stack()
        stack.push(1)

        const expectedStack = [1]

        expect(stack.length, `when pushing 1 to the stack, the length of the stack should be 1`).toBe(1)
        expect(stack.stack, `when pushing 1 to the stack, the stack should look like this - [1]`).toEqual(expectedStack)
    })

    it('Should create a `peek` method which returns the top element of the stack', function () {
        const stack = new Stack()

        for (let i = 1; i <= 3; i++) {
            stack.push(i)
            expect(stack.peek(), `when pushing ${i} to the stack, the top element should be ${i}`).toBe(i)
        }
    })

    it('Should create a `pop` method which removes the top element of the stack', function () {
        const stack = new Stack()
        expect(stack.peek(), `when running the 'peek' method on an empty stack the method should return 'null'`).toBe(null)

        stack.push(1)
        stack.push(2)
        stack.push(3)

        for (let i = 3; i > 1; i--) {
            expect(stack.length, `when pushing 1,2,3 to the stack, the length of the stack should be ${i}`).toBe(i)

            stack.pop()
            expect(stack.peek(), `when pushing 1,2,3 to the stack and popping, the top element should be ${i - 1}`).toBe(i - 1)
        }
    })

    it('Should create an `isEmpty` method which returns `true` if the stack is empty and `false` otherwise', function () {
        const stack = new Stack()
        expect(stack.isEmpty(), `when instanciating a new stack, the 'isEmpty' method should return 'true'`).toBe(true)

        for (let i = 1; i <= 3; i++) {
            stack.push(i)
        }

        expect(stack.isEmpty(), `when instanciating a new stack and pushing some values, the 'isEmpty' method should return false`).toBe(false)

        for (let i = 1; i <= 3; i++) {
            stack.pop()
        }

        expect(stack.isEmpty(), `when instanciating a new stack, pushing some values and then popping them, the 'isEmpty' method should return 'true'`).toBe(true)
    })
})






