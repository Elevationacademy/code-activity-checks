const swap = require('../../src/app').swap

describe('Exercise 3', function () {
    it('The function should recieve two arrays and transfer all the elements in the first array to the second array so that the second array retains the order from the first array', function () {
      const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      const arr2 = []

      swap(arr1, arr2)

      expect(arr1.length, `the function did not swap the arrays, when passing ${JSON.stringify(arr1)} as arr1 to the function expected length of arr1 to be 0 got ${arr1.length}`).toBe(0)
      expect(arr2.length, `the function did not swap the arrays, when passing ${JSON.stringify(arr2)} as arr1 to the function expected length of arr1 to be 9 got ${arr2.length}`).toBe(9)
      expect(arr1, `the function did not swap the arrays, when passing ${JSON.stringify(arr1)} as arr1 to the function expected arr1 to be [] but got ${JSON.stringify(arr1)}`).toEqual([])
      expect(arr2, `the function did not swap the arrays, when passing ${JSON.stringify(arr2)} as arr2 to the function expected arr2 to be [1,2,3,4,5,6,7,8,9] but got ${JSON.stringify(arr2)}`).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
} )