const { transposeMatrix } = require('../../src/app');
const utils = require('../../utils/utils.class');

describe('Exercise 3', function () {
  it("The function transposeMatrix should flip over a given matrix's main diagonal, switching the row and column indices of the matrix", function () {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ];
    const expectedResult = [
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],
      [4, 8, 12]
    ];

    let result, hasError
    try {
      result = transposeMatrix(matrix);
    } catch (e) {
      hasError = true
    }

    if (hasError) {
      expect(
        false,
        `There was an error with your code when providing a matrix with 3 rows and 4 columns. Make sure your function accounts for this scenario`
      ).toBeTruthy();
    } else {
      const isCorrect = utils.isMatEqual(result, expectedResult);
      expect(
        isCorrect,
        `the function did not return the correct matrix - when passing ${JSON.stringify(
          matrix
        )} to the function expected ${JSON.stringify(expectedResult)} instead got ${JSON.stringify(
          result
        )}`
      ).toBeTruthy();
    }
  });

  it("The function transposeMatrix should flip over a given matrix's main diagonal, switching the row and column indices of the matrix", function () {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
    ];
    const expectedResult = [
      [1, 4, 7, 10],
      [2, 5, 8, 11],
      [3, 6, 9, 12]
    ];

    let result, hasError
    try {
      result = transposeMatrix(matrix);
    } catch (e) {
      hasError = true
    }

    if (hasError) {
      expect(
        false,
        `There was an error with your code when providing a matrix with 4 rows and 3 columns. Make sure your function accounts for this scenario`
      ).toBeTruthy();
    } else {
      const isCorrect = utils.isMatEqual(result, expectedResult);
      expect(
        isCorrect,
        `The function did not return the correct matrix - when passing ${JSON.stringify(
          matrix
        )} to the function expected ${JSON.stringify(expectedResult)} instead got ${JSON.stringify(
          result
        )}`
      ).toBeTruthy();
    }
  });
});