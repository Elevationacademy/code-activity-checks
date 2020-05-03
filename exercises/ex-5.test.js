// Store class tests
describe('Exercise 5', function () {
  it('The Store class should create an object with 3 properties: name, clients and items (should all be initialized in the constructor)', function () {
    try {
      const Store = require(`../../src/Store`);
      let store = new Store('Elevation');
      expect(
        store.name,
        `The 'name' of the store was not initialized in the constructor. When passing 'Elevation' as an argument to the constructor, the nanme property was initialized to '${store.name}' - make sure you're using 'this'`
      ).toBe('Elevation');
      expect(
        store.clients,
        `The 'clients' of the store was not initialized to an empty array in the constructor, instead it was initialized to ${store.clients} - make sure you're using 'this'`
      ).toEqual([]);

      expect(
        store.items,
        `The 'items' of the store was not initialized to an empty array in the constructor, instead it was initialized to ${store.items} - make sure you're using 'this'`
      ).toEqual([]);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The Store class should have the following methods - `rentItem`, `returnItem`, `addItem`, `repairItem`, and `addClient`', function () {
    try {
      const Store = require(`../../src/Store`);
      let store = new Store('elevation');
      expect(
        typeof store.rentItem,
        "There should be a method called 'rentItem' in the Store class - p.s. it should be outside of the constructor"
      ).toBe('function');
      expect(
        typeof store.returnItem,
        "There should be a method called 'returnItem' in the Store class - p.s. it should be outside of the constructor"
      ).toBe('function');
      expect(
        typeof store.addItem,
        "There should be a method called 'addItem' in the Store class - p.s. it should be outside of the constructor"
      ).toBe('function');
      expect(
        typeof store.repairItem,
        "There should be a method called 'repairItem' in the Store class - p.s. it should be outside of the constructor"
      ).toBe('function');
      expect(
        typeof store.addClient,
        "There should be a method called 'addClient' in the Store class - p.s. it should be outside of the constructor"
      ).toBe('function');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The `addItem` method of the Store class should push the item it receives to the `items` array of the store', function () {
    try {
      const Store = require(`../../src/Store`);
      const Book = require(`../../src/Book`);
      let book = new Book('Elevation', 'Jona', 100);
      let store = new Store('LH');
      store.addItem(book);
      expect(
        store.items,
        'The `addItem` method of the Store class did not push the item it received to the `items` array of the store'
      ).toEqual([
        {
          status: 'Available',
          value: 100,
          title: 'Elevation',
          author: 'Jona',
          pages: 100,
        },
      ]);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The `addClient` method of the Store class should push the client it receives to the `clients` array of the store', function () {
    try {
      const Store = require(`../../src/Store`);
      const Client = require(`../../src/Client`);
      let client = new Client('Jona', 'Banana');
      let store = new Store('LH');
      store.addClient(client);
      expect(
        store.clients,
        'The `addClient` method of the Store class did not push the client it received to the `clients` array of the store'
      ).toEqual([{ firstName: 'Jona', lastName: 'Banana', rentedItems: [] }]);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it("The `repairItem` method of the Store class should change the status of the item it receives to 'In Repair'", function () {
    try {
      const Store = require(`../../src/Store`);
      const Book = require(`../../src/Book`);
      let book = new Book('Elevation', 'Jona', 100);
      let store = new Store('LH');
      store.repairItem(book);
      expect(
        book.status,
        `repairItem method of the Store class should change the status of the item it receives to 'In Repair'. Instead we got '${book.status}' after invoking this method `
      ).toBe('In Repair');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it("The `rentItem` method of the Store class should push the item it recieves to the `rentedItems` array of the client it receives, set the item's status to 'Rented', invoke item's use() method - only if the `rentedItems` array of the client has a length that is less than 5 AND the item's status is 'Available'", function () {
    try {
      const Client = require(`../../src/Client`);
      const Book = require(`../../src/Book`);
      const Store = require(`../../src/Store`);
      let client = new Client('Jona', 'Banana');
      let book = new Book('Elevation', 'Jona', 100);
      let store = new Store('LH');
      store.rentItem(book, client);
      expect(
        book.status,
        `The 'rentItem' method of the Store class did not change the 'status' property of the item it received to 'Rented', instead it was initialized to '${book.status}'`
      ).toBe('Rented');
      expect(
        book.value,
        'The `rentItem` method of the Store class did not invoke the use() method of the item it received and/or did not decrease its value'
      ).toBe(95);
      expect(
        client.rentedItems,
        'The `rentItem` method of the Store class did not push the item it received to the `rentedItems` array of the client it receives'
      ).toEqual([
        {
          status: 'Rented',
          value: 95,
          title: 'Elevation',
          author: 'Jona',
          pages: 100,
        },
      ]);
      let book2 = new Book('Elevation 2', 'Jona', 100);
      book2.status = 'Destroyed';
      store.rentItem(book2, client);
      expect(
        client.rentedItems,
        "The `rentItem` method of the Store class should NOT push the item to the `rentedItems` array of the client it receives if the item's status is not 'Available'"
      ).toEqual([
        {
          status: 'Rented',
          value: 95,
          title: 'Elevation',
          author: 'Jona',
          pages: 100,
        },
      ]);
      expect(
        book2.value,
        "The `rentItem` method of the Store class should NOT invoke the use() method of the item it receives and NOT decrease the value of the item if the item's status is not 'Available'"
      ).toBe(100);
      expect(
        book2.status,
        "The `rentItem` method of the Store class should NOT change the item's status to 'Rented' if the item's status is not 'Available'"
      ).toBe('Destroyed');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it("The `returnItem` method of the Store class should remove the item it receives from the correct client's `rentedItems` and change the item's status to 'Available' if it's value > 0, otherwise use the repairItem() method to change its status to 'In Repair'", function () {
    try {
      const Client = require(`../../src/Client`);
      const Book = require(`../../src/Book`);
      const Store = require(`../../src/Store`);
      let client = new Client('Jona', 'Banana');
      let book = new Book('Elevation', 'Jona', 100);
      let store = new Store('LH');
      store.addClient(client);
      store.rentItem(book, client);
      store.returnItem(book);
      expect(
        book.status,
        "The `returnItem` method of the Store class should change the `status` of the item it receives to 'Available' if it's value is greater than 0"
      ).toBe('Available');
      expect(
        client.rentedItems.length,
        "The `rentItem` method of the Store class  did not remove the item it received from the client's `rentedItems` array"
      ).toBe(0);
      let client2 = new Client('Jona', 'Banana');
      let book2 = new Book('Elevation', 'Jona', 100);
      let store2 = new Store('LH');
      store2.addClient(client2);
      store2.rentItem(book2, client2);
      book2.value = 0;
      store2.returnItem(book2);
      expect(
        book2.status,
        "The `returnItem` method of the Store class did not change the `status` of the item it received to 'In Repair' when it's value is 0 - p.s. it should be outside of the constructor"
      ).toBe('In Repair');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
