let DuoQueue

try {
  DuoQueue = require('../../src/DuoQueue')
} catch (error) {
  console.log("i")
}


describe('Exercise 3', () => {
  it("Should create a DuoQueue which consists of 'enqueue', 'dequeue', 'getShortestQueue', 'getLongestQueue', & 'balanceQueues' methods", function () {
    const dq = new DuoQueue()

    dq.enqueue(1, 1)
    dq.enqueue(1, 1)
    dq.enqueue(1, 1)
    dq.enqueue(2, 2)
    dq.enqueue(2, 2)
    dq.dequeue(1)
    dq.dequeue(1)

    expect(JSON.stringify(dq.getLongestQueue()), `running the first set of test code - longest queue should be [2,2] but got ${dq.getLongestQueue()}`).toContain('[2,2]')
    expect(JSON.stringify(dq.getShortestQueue()), `running the first set of test code - shortest queue should be [1] but got ${dq.getShortestQueue()}`).toContain('[1]')


    dq.enqueue(1, 1)
    dq.enqueue(1, 1)
    dq.enqueue(1, 1)
    dq.enqueue(1, 1)
    dq.enqueue(1, 1)
    dq.enqueue(1, 1)

    expect(JSON.stringify(dq.getLongestQueue()), `running the second set of test code - longest queue should be [1,1,1,1,1,1,1] but got ${dq.getLongestQueue()}`).toContain('[1,1,1,1,1,1,1]')
    expect(JSON.stringify(dq.getShortestQueue()), `running the second set of test code - shortest queue should be [2,2] but got ${dq.getShortestQueue()}`).toContain('[2,2]')

    dq.balanceQueues()

    expect(dq.getLongestQueue().length, `after balancing queue - longest queue should have 5 elements instead got ${dq.getLongestQueue().length}`).toBe(5)
    expect(dq.getShortestQueue().length, `after balancing queue - shortest queue should have 4 elements instead got ${dq.getShortestQueue().length}`).toBe(4)
  })
})