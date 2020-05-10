const customers = require('../../.hg/customers');
const wantedCustomersNames = new Promise((resolve, reject) => {
  resolve(['Obrien', 'Turner']);
  reject('There was a problem getting the wanted customers names');
});
const promise = new Promise((resolve, reject) => {
  resolve([customers, wantedCustomersNames]);
  reject('There was a problem with the system, please try again later');
});

describe('Exercise 3', () => {
  let getWantedCustomers, wantedCustomers;
  try {
    getWantedCustomers = require('../../src/exercise3').getWantedCustomers;
    wantedCustomers = require('../../src/exercise3').wantedCustomers;
    getWantedCustomers(promise);
  } catch (error) {
    expect(false, `${error}`).toBeTruthy();
  }

  it('getWantedCustomers should resolve a promise which contain an array: the first element is a list of customers objects, the second element is a promise which contain an array of strings - the wanted customers last names. The function should update the wantedCustomers array with the wanted customers detail (the customers object) relying on the array of the wanted customers last names array', function () {
    try {
      expect(
        wantedCustomers.length,
        `The wantedCustomers array length should contain 2 customers objects. Instead we got ${wantedCustomers.length} elements in this array`
      ).toBe(2);

      expect(
        wantedCustomers,
        `The wantedCustomers array elemenys were incorrect. We got ${JSON.stringify(
          wantedCustomers
        )} for the wantedCustomers array. Rememeber to update wantedCustomers with the customers objects which lastName equal to one of the names in the inner promise array. This array was given to you as a promise inside the first promise (the second element of the first promise array)`
      ).toEqual([
        {
          firstName: 'Maddison',
          lastName: 'Obrien',
          city: 'Oxford',
          country: 'United Kingdom',
          balance: -23342,
        },
        {
          firstName: 'Matilda',
          lastName: 'Turner',
          city: 'Whanganui',
          country: 'New Zealand',
          balance: 30519,
        },
      ]);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
