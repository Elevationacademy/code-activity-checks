// Client class tests
describe('Exercise 4', function () {
  it('The Client class should create an object with 3 properties: firstName, lastName and rentedItems - and they should be initialized in the constructor', function () {
    try {
      const Client = require(`../../src/Client`);
      let client = new Client('Jona', 'Banana');
      expect(
        client.firstName,
        `the 'firstName' of the client was not initialized in the constructor. When passing 'Jona' as an argument to the constructor, the firstName property was initialized to '${client.firstName}' - make sure you're using 'this'`
      ).toBe('Jona');
      expect(
        client.lastName,
        `the 'lastName' of the client was not initialized in the constructor. When passing 'Banana' as an argument to the constructor, the lastName property was initialized to '${client.lastName}' - make sure you're using 'this'`
      ).toBe('Banana');
      expect(
        client.rentedItems,
        `The 'rentedItems' of the store was not initialized to an empty array in the constructor, instead it was initialized to ${client.rentedItems} - make sure you're using 'this'`
      ).toEqual([]);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });


  it("The Client class should have a method called checkoutItem that should push the item to the client's `rentedItems` array if the `rentedItems` array has less than 5 items AND the item's status is 'Available'", function () {
    try {
      const Client = require(`../../src/Client`);
      const Store = require(`../../src/Store`);
      const Book = require(`../../src/Book`);
      let client = new Client('Jona', 'Banana');
      let store = new Store('LH')
      let book = new Book('Elevation', 'Jona', 100);
      expect(
        typeof client.checkoutItem,
        "There should be a method called 'checkoutItem' in the Client class"
      ).toBe('function');
      client.checkoutItem(book, store);
      expect(
        client.rentedItems.length,
        'The `checkoutItem` method in the Client class did not push the item to the `rentedItems` items array'
      ).toBe(1);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The `checkoutItem` method in the Client class should use the Store class method rentItem()', function () {
    try {
      const Client = require(`../../src/Client`);
      const Book = require(`../../src/Book`);
      const StoreMock = require(`../../src/Store`);
      jest.mock('../../src/Store');
      let client = new Client('Jona', 'Banana');
      let book = new Book('Elevation', 'Jona', 100);
      let store = new StoreMock('LH');
      client.checkoutItem(book, store);
      const mockStoreInstance = StoreMock.mock.instances[0];
      const mockRentItem = mockStoreInstance.rentItem;
      expect(
        mockRentItem,
        "The rentItem() method in the Store class wasn't invoked by the checkoutItem() method of the Client class"
      ).toHaveBeenCalled();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
