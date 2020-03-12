let Store, Client, Item, Book, Instrument; // NICE JOB ON THIS - MY COMMENTS IN COMMENT FORM

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
  it("The Item class should create an object with 2 attributes: `status` with a value of 'Available', and `value` with a value of 100", function() {
    let item = new Item();
    expect(
      item.status,
      "The status attribute was not initialized in the constructor to 'Available'"
    ).toEqual('Available'); //Please change all 'toEqual' to 'toBe' if checking primitive types; Also please allow your tests to run if they use different capitalization than you ;)
    expect(item.value, 'The value attribute was not initialized in the constructor to 100').toEqual(
      100
    );
  });
  it('The Item class should have a function called - use', function() {
    let item = new Item();
    expect(
      typeof item.use,
      "There should be a function called 'use' in the Item class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });
  it('The Item class should have a use() function that decreases the value attribute by 5', function() {
    let item = new Item();
    item.use();
    expect(
      item.value,
      'The use() function in the Item class does not decrease the value attribute by 5'
    ).toEqual(95);
  });
});

// Book class tests
describe('Exercise 1', function() {
  it('The Book class should inherit from the Item class', function() {
    let book = new Book();
    expect(book instanceof Item, 'The Book class does not inherit from the Item class').toBeTruthy();
  });
  it('The Book class should create an object with 3 attributes: title, author and pages - and they should be initialized in the constructor', function() {
    let book = new Book('elevation', 'Jona', 100);
    expect(
      book.title,
      "The 'title' of the book was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('elevation');
    expect(
      book.author,
      "The 'author' of the book was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('Jona');
    expect(
      book.pages,
      "The 'pages' of the book was not initialized in the constructor - make sure you're using `this`"
    ).toEqual(100);
  });
  it('The Book class should have a function called - use', function() {
    let book = new Book('elevation', 'Jona', 100);
    expect(
      typeof book.use,
      "there should be a function called 'use' in the Book class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });
  it('The use function in the Book class should decrease the value attribute by 5 if pages is greater than 50, or by 10 otherwise', function() {
    let book = new Book('elevation', 'Jona', 100);
    book.use();
    expect(
      book.value,
      'The use function of Book class does not decrease the value attribute by 5 when pages is greater than 50'
    ).toEqual(95);
    book.pages = 40;
    book.use();
    expect(
      book.value,
      'The use function of Book class does not decrease the value attribute by 10 when pages is smaller/equal to 50'
    ).toEqual(85);
  });
});

// Instrument class tests
describe('Exercise 1', function() {
  it('The Instrument class should inherit from the Item class', function() {
    let inst = new Instrument();
    expect(inst instanceof Item, 'The Instrument class does not inherit from the Item class').toBeTruthy();
  });
  it('The Book class should create an object with 2 attributes: category and type - and they should be initialized in the constructor', function() {
    let inst = new Instrument('elevation', 'Jona');
    expect(
      inst.category,
      "the 'category' of the instrument was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('elevation');
    expect(
      inst.type,
      "the 'type' of the instrument was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('Jona');
  });
  it('The Instrument class should have a function called - use', function() {
    let inst = new Instrument('elevation', 'Jona');
    expect(
      typeof inst.use,
      "There should be a function called 'use' in the Instrument class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });
  it('The use function in the Instrument class should decrease the value attribute by 5 ONLY if its category is equal to "Strings"', function() {
    let inst = new Instrument('Strings', 'Jona');
    inst.use();
    expect(
      inst.value,
      'The use function of Instrument class does not decrease the value attribute by 5 when its category is equal to "Strings"'
    ).toEqual(95);
    inst.category = 'elevation';
    inst.use();
    expect(
      inst.value,
      'The use function of the Instrument class is decreasing the value attribute even when the category is not equal to "Strings"; the use function should NOT decrease the value attribute (at all) if its category is NOT equal to "Strings"'
    ).toEqual(95);
  });
});

// Client class tests
describe('Exercise 1', function() {
  it('The Client class should create an object with 2 attributes: firstName and lastName - and they should be initialized in the constructor', function() {
    let client = new Client('elevation', 'Jona');
    expect(
      client.firstName,
      "the 'firstName' of the client was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('elevation');
    expect(
      client.lastName,
      "the 'lastName' of the client was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('Jona');
  });
  it('The Client class should create an empty array when being initialized', function() { //add this to previous test. Also tell them what the name of the property is supposed to be
    let client = new Client('elevation', 'Jona');
    expect(
      client.rentedItems,
      "the 'rentedItems' of the client was not initialized when creating an instance of Client - make sure you're using `this` and asign 'rentedItems' in the constructor to be [] (an empty array)"
    ).toEqual([]);
  });
  it('The Client class should have a function called - checkoutItem', function() {
    let client = new Client('elevation', 'Jona');
    expect(
      typeof client.checkoutItem,
      "There should be a function called 'checkoutItem' in the Client class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });
  it("The `checkoutItem` function in Client class should push the item to the client's `rentedItems` array if the `rentedItems` array has less than 5 items AND the item's status is 'Available'", function() {
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    try {
      client.checkoutItem(store, book);
      expect(
        client.rentedItems.length,
        'The `checkoutItem` function in the Client class does not push the item to the `rentedItems` items array'
      ).toEqual(1);
    } catch (error) {
      expect(
        false,
        "There was an error with your code while trying to invoke the checkoutItem() function of the Client class. Make sure you're passing the item and the client to the rentItem() function of the Store class. Use 'this' to pass the client"
      ).toBeTruthy();
    }
  });

  it('The `checkoutItem` function in the Client class should use the Store class function rentItem()', function() {
    StoreMock = require(`../../src/Store`);
    jest.mock('../../src/Store');
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new StoreMock('Lior');
    client.checkoutItem(store, book);
    const mockStoreInstance = StoreMock.mock.instances[0];
    const mockRentItem = mockStoreInstance.rentItem;

    expect(
      mockRentItem,
      "The rentItem() function in the Store class wasn't invoked by the checkoutItem() function of the Client class"
    ).toHaveBeenCalled();
  });
});

// Store class tests
describe('Exercise 1', function() {
  it('The Store class should create an object with 3 attributes: name, clients and items (should all be initialized in the constructor)', function() {
    let store = new Store('elevation');
    expect(
      store.name,
      "The 'name' of the store was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('elevation');
    expect(
      store.clients,
      "The 'clients' of the store was not initialized to an empty array in the constructor - make sure you're using `this`"
    ).toEqual([]);

    expect(
      store.items,
      "The 'items' of the store was not initialized to an empty array in the constructor - make sure you're using `this`"
    ).toEqual([]);
  });
  it('The Store class should have the following functions - `rentItem`, `returnItem`, `addItem`, `repairItem`, and `addClient`', function() {
    let store = new Store('elevation');
    expect(
      typeof store.rentItem,
      "There should be a function called 'rentItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.returnItem,
      "There should be a function called 'returnItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.addItem,
      "There should be a function called 'addItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.repairItem,
      "There should be a function called 'repairItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.addClient,
      "There should be a function called 'addClient' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });

  it('The `addItem` function of the Store class should push the item it receives to the `items` array of the store', function() {
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.addItem(book);
    expect(
      store.items,
      'The `addItem` function of the Store class does not push the it receives to the `items` array of the store'
    ).toEqual([
      {
        status: 'Available', //Account for lowercase here as well
        value: 100,
        title: 'elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
  });

  it('The `addClient` function of the Store class should push the client it receives to the `clients` array of the store', function() {
    let client = new Client('elevation', 'Jona');
    let store = new Store('Lior');
    store.addClient(client);
    expect(
      store.clients,
      'The `addClient` function of the Store class does not push the client it received to the `clients` array of the store'
    ).toEqual([{ firstName: 'elevation', lastName: 'Jona', rentedItems: [] }]);
  });

  it("The `repairItem` function of the Store class should change the status of the item it receives to 'In Repair'", function() {
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.repairItem(book);
    expect(
      book.status,
      "The `repairItem` function of the Store class does not change the status of the item it receives to 'In Repair"
    ).toEqual('In Repair'); //Please account for if the student uses lowercase
  });

  it("The `rentItem` function of the Store class should push the item it recieves to the `rentedItems` array of the client it receives, set the item's status to 'Rented', invoke item's use() function - only if the `rentedItems` array of the client has a length that is less than 5 AND the item's status is 'Available'", function() {
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.rentItem(book, client);
    expect(
      book.status,
      "The `rentItem` function of the Store class does not change the item's status to 'Rented' - p.s. it should be outside of the constructor"
    ).toEqual('Rented'); //Account for different casing
    expect(
      book.value,
      'The `rentItem` function of the Store class does not invoke the use() function of the item it receives in order to decrease the value of the item'
    ).toEqual(95);
    expect(
      client.rentedItems,
      'The `rentItem` function of the Store class does not push the item it receives to the `rentedItems` array of the client it receives'
    ).toEqual([
      {
        status: 'Rented', //Account for casing
        value: 95,
        title: 'elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
    let book2 = new Book('elevation2', 'Jona2', 100);
    book2.status = 'Lior';
    store.rentItem(book2, client);
    expect(
      client.rentedItems,
      "The `rentItem` function of the Store class should NOT push the item to the `rentedItems` array of the client it receives if the item's status is not 'Available'"
    ).toEqual([
      {
        status: 'Rented', //casing
        value: 95,
        title: 'elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
    expect(
      book2.value,
      "The `rentItem` function of the Store class should NOT invoke the use() function of the item it receives and NOT decrease the value of the item if the item's status is not 'Available'"
    ).toEqual(100);
    expect(
      book2.status,
      "The `rentItem` function of the Store class should NOT change the item's status to 'Rented' if the item's status is not 'Available'"
    ).toEqual('Lior'); //Not sure if all these tests are the same.
  });

  it("The `returnItem` function of the Store class should remove the item it receives from the correct client's `rentedItems` and change the item's status to 'Available' if it's value > 0, otherwise use the repairItem() function to change its status to 'In Repair'", function() {
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.addClient(client);
    store.rentItem(book, client);
    store.returnItem(book);
    expect(
      book.status,
      "The `returnItem` function of the Store class should change the `status` of the item it receives to 'Available' if it's value is greater than 0 - p.s. it should be outside of the constructor"
    ).toEqual('Available');
    expect(
      client.rentedItems.length,
      "The `rentItem` function of the Store class should does not remove the item from the correct client's `rentedItems` array"
    ).toEqual(0);
    let client2 = new Client('elevation', 'Jona');
    let book2 = new Book('elevation', 'Jona', 100);
    let store2 = new Store('Lior');
    store2.addClient(client2);
    store2.rentItem(book2, client2);
    book2.value = 0;
    store2.returnItem(book2);
    expect(
      book2.status,
      "The `returnItem` function of the Store class does not change the `status` of the item it receives to 'In Repair' if it's value is 0 - p.s. it should be outside of the constructor"
    ).toEqual('In Repair'); //Account for casing.
  });
});

//Overall I think you should also tell them what value you received ...