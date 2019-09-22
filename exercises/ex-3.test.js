let DuoQueue

try {
  DuoQueue = require('../../src/DuoQueue')
} catch (error) {
  console.log("i")
}

const enqueueMany = function (duoQueue, addToFirst, addToSecond) {

  for (let i = 0; i < addToFirst; i++) {
    duoQueue.enqueue(1, 1)
  }

  for (let i = 0; i < addToSecond; i++) {
    duoQueue.enqueue(2, 2)
  }
}

const getRunTime = function (duoQueue, method) {
  const startTime = new Date()
  duoQueue[method]()
  const endTime = new Date()

  return endTime - startTime
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

    expect(JSON.stringify(dq.getLongestQueue()), `after balancing queue - longest queue should be [1,1,1,1,1] but got ${dq.getLongestQueue()}`).toContain('[1,1,1,1,1]')
    expect(JSON.stringify(dq.getShortestQueue()), `after balancing queue - shortest queue should be [2,2,1,1] but got ${dq.getShortestQueue()}`).toContain('[2,2,1,1]')
  })
})