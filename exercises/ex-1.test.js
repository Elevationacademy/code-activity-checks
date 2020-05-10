const customers = require('../../.hg/customers');
const promise = new Promise((resolve, reject) => {
  resolve(customers);
  reject('There was a problem with the system, please try again later');
});

describe('Exercise 1', () => {

  let { getRiskyCustomersInfo, info } = require('../../src/exercise1');
  try {
    getRiskyCustomersInfo(promise);
  } catch (error) {
    expect(false, `${error}`).toBeTruthy();
  }

  it('getRiskyCustomersInfo should resolve a promise which contain a list of customers objects and update the info object with the number of risky customers (customers which balance in below -10,000$) and with the riskiest customer full name', function () {
    try {
      expect(
        info.counter,
        `The counter value was incorrect. We got ${
          info.counter
        } as the number of customers which balance is below -10,000$, which is ${
          info.counter > 16 ? 'higher' : 'lower'
        } then the correct answer. Remember to use the then() keyword and to include an if statement to count the number of customers which balance is lower then -10,000$. Also remember that you should update the info object (the counter property)`
      ).toBe(16);

      expect(
        info.riskiestCustomer,
        `The name of the riskiest customer was incorrect. We got ${info.riskiestCustomer} as the name of the riskiest customer. Rememeber that we expect to get the full name (firstName + ' ' + lastName) of the customer with the lowest balance value - this should be in the info object (the riskiestCustomer property)`
      ).toBe('Nicole Hart');

      expect(
        getRiskyCustomersInfo.toString().includes('then'),
        `Expected getRiskyCustomersInfo function to include the then() method to resolve the promise. Please make sure you use the then() method`
      ).toBeTruthy();

      expect(
        getRiskyCustomersInfo.toString().includes('async'),
        `Expected getRiskyCustomersInfo function to NOT include the async keyword to resolve the promise. Please make sure you use the then() method instead`
      ).toBeFalsy();

      expect(
        getRiskyCustomersInfo.toString().includes('await'),
        `Expected getRiskyCustomersInfo function to NOT include the await keyword to resolve the promise. Please make sure you use the then() method instead`
      ).toBeFalsy();


    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
