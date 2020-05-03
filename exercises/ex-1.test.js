// Item class tests
describe('Exercise 1', function () {
  it("The Item class should create an object with 2 properties: `status` with a value of 'Available', and `value` with a value of 100", function () {
    try {
      const Item = require(`../../src/Item`);
      let item = new Item();
      expect(
        item.status,
        `The status property was not initialized in the constructor to 'Available', instead it was initalized with - '${item.status}'`
      ).toBe('Available');
      expect(
        item.value,
        `The value property was not initialized in the constructor to 100, instead it was initialized with -  '${item.value}'`
      ).toEqual(100);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it("The Item class should have a method called use that decreases the value property by 5", function () {
    try {
      const Item = require(`../../src/Item`);
      let item = new Item();
      expect(
        typeof item.use,
        "There was not a method called 'use' in the Item class - p.s. it should be outside of the constructor"
      ).toBe('function');
      item.use();
      expect(
        item.value,
        `When invoking use() method of the Item class, the 'value' property was not decreased by 5`
      ).toBe(95);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
