const { transposeMatrix } = require('../../src/app');
const utils = require('../../utils/utils.class');

describe('Exercise 3', function() {
  it("The function transposeMatrix should flip over a given matrix's main diagonal, switching the row and column indices of the matrix", function() {
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

    const result = transposeMatrix(matrix);

    const isCorrect = utils.isMatEqual(result, expectedResult);
    expect(
      isCorrect,
      `the function did not return the correct matrix - when passing ${JSON.stringify(
        matrix
      )} to the function expected ${JSON.stringify(expectedResult)} instead got ${JSON.stringify(
        result
      )}`
    ).toBeTruthy();
  });
});
