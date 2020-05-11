const customers = require('../../.hg/customers');
const promise = new Promise((resolve, reject) => {
  resolve(customers);
  reject('There was a problem with the system, please try again later');
});

describe('Exercise 2', () => {
  let getWealthyCustomersInfo, info;
  try {
    getWealthyCustomersInfo = require('../../src/exercise2').getWealthyCustomersInfo;
    info = require('../../src/exercise2').info;
    getWealthyCustomersInfo(promise);
  } catch (error) {
    expect(false, `${error}`).toBeTruthy();
  }

  it(`The 'getWealthyCustomersInfo' function should resolve a promise which contains a list of customers objects and update the info object with the number of wealthy customers (customers whose balance in above 10,000$) and with the full name of the wealthiest customer`, function () {
    try {
      expect(
        info.counter,
        `The counter value was incorrect. We got ${
          info.counter
        } as the number of customers whose balance is above 10,000$, which is ${
          info.counter > 14 ? 'higher' : 'lower'
        } than the correct answer. Remember to use the 'await' keyword and to include an if statement to count the number of customers whose balance is above 10,000$. Also remember that you should update the info object (the counter property)`
      ).toBe(14);

      expect(
        info.wealthiestCustomer,
        `The name of the wealthiest customer was incorrect. We got ${info.wealthiestCustomer} as the name of the wealthiest customer. Rememeber that we expect to get the full name (firstName + ' ' + lastName) of the customer with the highest balance value - this should be stored in the info object (the wealthiestCustomer property)`
      ).toBe('Grace Boyd');

      expect(
        getWealthyCustomersInfo.toString().includes('async'),
        `Expected the 'getWealthyCustomersInfo' function to include the 'async' keyword to resolve the promise. Please make sure you use async-await syntax`
      ).toBeTruthy();

      expect(
        getWealthyCustomersInfo.toString().includes('await'),
        `Expected the 'getWealthyCustomersInfo' function to include the 'await' keyword to resolve the promise. Please make sure you use async-await syntax`
      ).toBeTruthy();

      expect(
        getWealthyCustomersInfo.toString().includes('then'),
        `Expected the 'getWealthyCustomersInfo' function to NOT include the 'then' method to resolve the promise. Please make sure you use async-await syntax instead`
      ).toBeFalsy();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
