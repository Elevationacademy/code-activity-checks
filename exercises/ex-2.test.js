const MinStack = require('../../src/MinStack')

const pushMany = function (num, stack) {
    for (let i = 0; i < num; i++) {
        const rand = Math.floor(Math.random() * 1000)
        stack.push(rand)
    }
}

const getRunTime = function (stack) {
    const startTime = new Date()
    stack.getMin()
    const endTime = new Date()

    return endTime - startTime
}

describe('Exercise 2', () => {
    it('Should create a `getMin` method which returns the minimum value in the stack', function () {
        const ms = new MinStack()

        ms.push(17)
        ms.push(12)
        ms.push(31)
        expect(ms.getMin(), `when pushing 17,12,31 to the stack, the 'getMin' function should return 12 but got ${ms.getMin()}`).toBe(12)

        ms.pop()
        ms.pop()
        ms.pop()
        expect(ms.getMin(), `when pushing 17,12,31 to the stack and then popping all values, the 'getMin' function should return 'null' but got ${ms.getMin()}`).toBe(null)

        ms.push(19)
        ms.push(21)
        expect(ms.getMin(), `when pushing 19,21 to the stack, the 'getMin' function should return 19 but got ${ms.getMin()}`).toBe(19)

        ms.push(3)
        expect(ms.getMin(), `when pushing 19,21,3 to the stack, the 'getMin' function should return 3 but got ${ms.getMin()}`).toBe(3)

        ms.pop()
        ms.pop()
        expect(ms.getMin(), `when pushing 19,21,3 to the stack and then popping 2 values, the 'getMin' function should return 19 but got ${ms.getMin()}`).toBe(19)
    })

    it('The `getMin` method should be in O(1)', function () {
        const smallStack = new MinStack()
        const bigStack = new MinStack()

        pushMany(10000, smallStack)
        pushMany(10000000, bigStack)

        const runTimeSmall = getRunTime(smallStack)
        const runTimeBig = getRunTime(bigStack)

        const runTimeDifference = Math.abs(runTimeBig - runTimeSmall)
        expect(runTimeDifference, 'the `getMin` method should run in O(1)').toBeLessThan(100)
    })
})