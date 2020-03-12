let Store, Client, Item, Book, Instrument;

// Importing the classes
describe('Exercise 1', function() {
  it('There should be Item, Book, Instrument, Client and Store files/classes', function() {
    let classesToCheck = ['Book', 'Item', 'Instrument', 'Client', 'Store'];

    for (let classToCheck of classesToCheck) {
      try {
        classToCheck === 'Item'
          ? (Item = require(`../../src/${classToCheck}`))
          : classToCheck === 'Book'
          ? (Book = require(`../../src/${classToCheck}`))
          : classToCheck === 'Instrument'
          ? (Instrument = require(`../../src/${classToCheck}`))
          : classToCheck === 'Client'
          ? (Client = require(`../../src/${classToCheck}`))
          : classToCheck === 'Store'
          ? (Store = require(`../../src/${classToCheck}`))
          : null;
      } catch (error) {
        expect(
          false,
          'There was an error with your code while trying to import one of the classes'
        ).toBeTruthy();
      }
    }
  });
});

// Item class tests
describe('Exercise 1', function() {
  it("The Item class should create an object with 2 properties: `status` with a value of 'Available', and `value` with a value of 100", function() {
    let item = new Item();
    expect(
      item.status.toLowerCase(),
      `The status property was not initialized in the constructor to 'Available', instead it was initalized with - '${item.status}'`
    ).toBe('available');
    expect(item.value, `The value property was not initialized in the constructor to 100, instead it was initialized with -  '${item.value}'`).toEqual(
      100
    );
  });
  it('The Item class should have a method called - use', function() {
    let item = new Item();
    expect(
      typeof item.use,
      "There was not a method called 'use' in the Item class - p.s. it should be outside of the constructor"
    ).toBe('function');
  });
  it('The Item class should have a use() method that decreases the value property by 5', function() {
    let item = new Item();
    item.use();
    expect(
      item.value,
      `When invoking use() method of the Item class, the 'value' property was not decreased by 5`
    ).toBe(95);
  });
});

// Book class tests
describe('Exercise 1', function() {
  it('The Book class should inherit from the Item class', function() {
    let book = new Book();
    expect(book instanceof Item, 'The Book class does not inherit from the Item class').toBeTruthy();
  });
  it('The Book class should create an object with 3 properties: title, author and pages - and they should be initialized in the constructor', function() {
    let book = new Book('Elevation', 'Jona', 100);
    expect(
      book.title,
      `The 'title' of the book was not initialized in the constructor. When passing 'Elevation' as an argument to the constructor, the title property was initialized to '${book.title}' - make sure you're using 'this'`
    ).toBe('Elevation');
    expect(
      book.author,
      `The 'author' of the book was not initialized in the constructor. When passing 'Jona' as an argument to the constructor, the author property was initialized to '${book.author}' - make sure you're using 'this'`
    ).toBe('Jona');
    expect(
      book.pages,
      `The 'pages' of the book was not asigned in the constructor to 100, instead it has the value of ${book.pages}`
    ).toBe(100);
  });
  it('The Book class should have a method called - use', function() {
    let book = new Book('Elevation', 'Jona', 100);
    expect(
      typeof book.use,
      "There was not method called 'use' in the Book class - p.s. it should be outside of the constructor"
    ).toBe('function');
  });
  it('The use() method in the Book class should decrease the value property by 5 if pages is greater than 50, or by 10 otherwise', function() {
    let book = new Book('Elevation', 'Jona', 100);
    book.use();
    expect(
      book.value,
      'The use() method of Book class does not decrease the value property by 5 when pages is greater than 50'
    ).toBe(95);
    book.pages = 40;
    book.use();
    expect(
      book.value,
      'The use method of Book class does not decrease the value property by 10 when pages is smaller/equal to 50'
    ).toBe(85);
  });
});

// Instrument class tests
describe('Exercise 1', function() {
  it('The Instrument class should inherit from the Item class', function() {
    let inst = new Instrument();
    expect(inst instanceof Item, 'The Instrument class does not inherit from the Item class').toBeTruthy();
  });
  it('The Book class should create an object with 2 properties: category and type - and they should be initialized in the constructor', function() {
    let inst = new Instrument('Strings', 'Guitar');
    expect(
      inst.category,
      `the 'category' of the instrument was not initialized in the constructor. When passing 'Strings' as an argument to the constructor, the category property was initialized to '${inst.category}' - make sure you're using 'this'`
    ).toBe('Strings');
    expect(
      inst.type,
      `the 'type' of the instrument was not initialized in the constructor. When passing 'Guitar' as an argument to the constructor, the type property was initialized to '${inst.type}' - make sure you're using 'this'`
    ).toBe('Guitar');
  });
  it('The Instrument class should have a method called - use', function() {
    let inst = new Instrument('Strings', 'Guitar');
    expect(
      typeof inst.use,
      "There was not a method called 'use' in the Instrument class - p.s. it should be outside of the constructor"
    ).toBe('function');
  });
  it('The use method in the Instrument class should decrease the value property by 5 ONLY if its category is equal to "Strings"', function() {
    let inst = new Instrument('Strings', 'Guitar');
    inst.use();
    expect(
      inst.value,
      'The use method of Instrument class did not decrease the value property by 5 when its category equal to "Strings"'
    ).toBe(95);
    inst.category = 'Percussion';
    inst.use();
    expect(
      inst.value,
      'The use method of the Instrument class decreased the value property even when the category was not equal to "Strings"; the use method should NOT decrease the value property (at all) if its category is NOT equal to "Strings"'
    ).toBe(95);
  });
});

// Client class tests
describe('Exercise 1', function() {
  it('The Client class should create an object with 3 properties: firstName, lastName and rentedItems - and they should be initialized in the constructor', function() {
    let client = new Client('Jona', 'Banana');
    expect(
      client.firstName,
      `the 'firstName' of the client was not initialized in the constructor. When passing 'Jona' as an argument to the constructor, the category property was initialized to '${client.firstName}' - make sure you're using 'this'`
    ).toBe('Jona');
    expect(
      client.lastName,
      `the 'lastName' of the client was not initialized in the constructor. When passing 'Banana' as an argument to the constructor, the category property was initialized to '${client.lastName}' - make sure you're using 'this'`
    ).toBe('Banana');
    expect(
      client.rentedItems,
      `The 'rentedItems' of the store was not initialized to an empty array in the constructor, instead it was initialized to ${client.rentedItems} - make sure you're using 'this'`
    ).toEqual([]);
  });
  it('The Client class should have a method called - checkoutItem', function() {
    let client = new Client('Jona', 'Banana');
    expect(
      typeof client.checkoutItem,
      "There should be a method called 'checkoutItem' in the Client class - p.s. it should be outside of the constructor"
    ).toBe('function');
  });
  it("The `checkoutItem` method in Client class should push the item to the client's `rentedItems` array if the `rentedItems` array has less than 5 items AND the item's status is 'Available'", function() {
    let client = new Client('Jona', 'Banana');
    let book = new Book('Elevation', 'Jona', 100);
    let store = new Store('LH');
    try {
      client.checkoutItem(store, book);
      expect(
        client.rentedItems.length,
        'The `checkoutItem` method in the Client class did not push the item to the `rentedItems` items array'
      ).toBe(1);
    } catch (error) {
      expect(
        false,
        "There was an error with your code while trying to invoke the checkoutItem() method of the Client class. Make sure you're passing the item and the client to the rentItem() method of the Store class. Use 'this' to pass the client"
      ).toBeTruthy();
    }
  });

  it('The `checkoutItem` method in the Client class should use the Store class method rentItem()', function() {
    StoreMock = require(`../../src/Store`);
    jest.mock('../../src/Store');
    let client = new Client('Jona', 'Banana');
    let book = new Book('Elevation', 'Jona', 100);
    let store = new StoreMock('LH');
    client.checkoutItem(store, book);
    const mockStoreInstance = StoreMock.mock.instances[0];
    const mockRentItem = mockStoreInstance.rentItem;

    expect(
      mockRentItem,
      "The rentItem() method in the Store class wasn't invoked by the checkoutItem() method of the Client class"
    ).toHaveBeenCalled();
  });
});

// Store class tests
describe('Exercise 1', function() {
  it('The Store class should create an object with 3 properties: name, clients and items (should all be initialized in the constructor)', function() {
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
  });
  it('The Store class should have the following methods - `rentItem`, `returnItem`, `addItem`, `repairItem`, and `addClient`', function() {
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
  });

  it('The `addItem` method of the Store class should push the item it receives to the `items` array of the store', function() {
    let book = new Book('Elevation', 'Jona', 100);
    let store = new Store('LH');
    store.addItem(book);
    book.status = book.status.toLowerCase()
    expect(
      store.items,
      'The `addItem` method of the Store class did not push the item it received to the `items` array of the store'
    ).toEqual([
      {
        status: 'available',
        value: 100,
        title: 'Elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
  });

  it('The `addClient` method of the Store class should push the client it receives to the `clients` array of the store', function() {
    let client = new Client('Jona', 'Banana');
    let store = new Store('LH');
    store.addClient(client);
    expect(
      store.clients,
      'The `addClient` method of the Store class did not push the client it received to the `clients` array of the store'
    ).toEqual([{ firstName: 'Jona', lastName: 'Banana', rentedItems: [] }]);
  });

  it("The `repairItem` method of the Store class should change the status of the item it receives to 'In Repair'", function() {
    let book = new Book('Elevation', 'Jona', 100);
    let store = new Store('LH');
    store.repairItem(book);
    book.status = book.status.toLowerCase()
    expect(
      book.status,
      `The 'repairItem' method of the Store class did not change the 'status' property of the item it received to 'In Repair', instead it was initialized to '${book.status}'`
    ).toBe('in repair');
  });

  it("The `rentItem` method of the Store class should push the item it recieves to the `rentedItems` array of the client it receives, set the item's status to 'Rented', invoke item's use() method - only if the `rentedItems` array of the client has a length that is less than 5 AND the item's status is 'Available'", function() {
    let client = new Client('Jona', 'Banana');
    let book = new Book('Elevation', 'Jona', 100);
    let store = new Store('LH');
    store.rentItem(book, client);
    book.status = book.status.toLowerCase()
    expect(
      book.status,
      `The 'rentItem' method of the Store class did not change the 'status' property of the item it received to 'Rented', instead it was initialized to '${book.status}' - p.s. it should be outside of the constructor`
    ).toBe('rented');
    expect(
      book.value,
      'The `rentItem` method of the Store class did not invoke the use() method of the item it received and/or did not decrease its value'
    ).toBe(95);
    expect(
      client.rentedItems,
      'The `rentItem` method of the Store class did not push the item it received to the `rentedItems` array of the client it receives'
    ).toEqual([
      {
        status: 'rented',
        value: 95,
        title: 'Elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
    let book2 = new Book('Elevation 2', 'Jona', 100);
    book2.status = 'Destroyed';
    store.rentItem(book2, client);
    expect(
      client.rentedItems,
      "The `rentItem` method of the Store class should NOT push the item to the `rentedItems` array of the client it receives if the item's status is not 'Available'"
    ).toEqual([
      {
        status: 'rented',
        value: 95,
        title: 'Elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
    expect(
      book2.value,
      "The `rentItem` method of the Store class should NOT invoke the use() method of the item it receives and NOT decrease the value of the item if the item's status is not 'Available'"
    ).toBe(100);
    expect(
      book2.status,
      "The `rentItem` method of the Store class should NOT change the item's status to 'Rented' if the item's status is not 'Available'"
    ).toBe('Destroyed');
  });

  it("The `returnItem` method of the Store class should remove the item it receives from the correct client's `rentedItems` and change the item's status to 'Available' if it's value > 0, otherwise use the repairItem() method to change its status to 'In Repair'", function() {
    let client = new Client('Jona', 'Banana');
    let book = new Book('Elevation', 'Jona', 100);
    let store = new Store('LH');
    store.addClient(client);
    store.rentItem(book, client);
    store.returnItem(book);
    book.status = book.status.toLowerCase()
    expect(
      book.status,
      "The `returnItem` method of the Store class should change the `status` of the item it receives to 'Available' if it's value is greater than 0 - p.s. it should be outside of the constructor"
    ).toBe('available');
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
    book2.status = book2.status.toLowerCase()
    expect(
      book2.status,
      "The `returnItem` method of the Store class did not change the `status` of the item it received to 'In Repair' when it's value is 0 - p.s. it should be outside of the constructor"
    ).toBe('in repair');
  });
});
