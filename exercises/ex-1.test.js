let Store, Client, Item, Book, Instrument;

describe('Exercise 1', function() {
  // Importing the classes
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

  // Item class tests
  it("The Item class should create an object with 2 attributes: status with a value of 'Available', and value with a value of 100", function() {
    let item = new Item();
    expect(
      item.status,
      "The status attribue was not initialized in the contructor to 'Available'"
    ).toEqual('Available');
    expect(item.value, 'The value attribue was not initialized in the contructor to 100').toEqual(
      100
    );
  });
  it('The Item class should have a function called - use', function() {
    let item = new Item();
    expect(
      typeof item.use,
      "there should be a function called 'use' in the Item class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });
  it('The Item class should create an object with an use() function that decrease the value attribute by 5 only if the value is higher than 5', function() {
    let item = new Item();
    item.use();
    expect(
      item.value,
      'The use() function in Item class should decrease the value attribute by 5 if the value is higher than 5'
    ).toEqual(95);
    item.value = 2;

    item.use();
    expect(
      item.value,
      'The use() function in Item class should NOT decrease the value attribute if it is lower than 5'
    ).toEqual(2);
  });

  // Book class tests
  it('The Book class should inherit from the Item class', function() {
    let book = new Book();
    expect(book instanceof Item, 'Book class should inherit from Item class').toBeTruthy();
  });
  it('The Book class should create an object with 3 attributes: title, author and pages - and they should be initialized in the constructor', function() {
    let book = new Book('elevation', 'Jona', 100);
    expect(
      book.title,
      "the 'title' of the book was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('elevation');
    expect(
      book.author,
      "the 'author' of the book was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('Jona');
    expect(
      book.pages,
      "the 'pages' of the book was not initialized in the constructor - make sure you're using `this`"
    ).toEqual(100);
  });
  it('The Book class should have a function called - use', function() {
    let book = new Book('elevation', 'Jona', 100);
    expect(
      typeof book.use,
      "there should be a function called 'use' in the Book class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });
  it('The use function in Book class should decrease the value attribute by 5 if pages > 50 or else by 10', function() {
    let book = new Book('elevation', 'Jona', 100);
    book.use();
    expect(
      book.value,
      'the use function of Book class should decrease the value attribute by 5 if pages > 50'
    ).toEqual(95);
    book.pages = 40;
    book.use();
    expect(
      book.value,
      'the use function of Book class should decrease the value attribute by 10 if pages <= 50'
    ).toEqual(85);
  });

  // Instrument class tests
  it('The Instrument class should inherit from the Item class', function() {
    let inst = new Instrument();
    expect(inst instanceof Item, 'Instrument class should inherit from Item class').toBeTruthy();
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
      "there should be a function called 'use' in the Instrument class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });

  it('The use function in Instrument class should decrease the value attribute by 5 ONLY if category = "Strings"', function() {
    let inst = new Instrument('Strings', 'Jona');
    inst.use();
    expect(
      inst.value,
      'the use function of Instrument class should decrease the value attribute by 5 if category = "Strings"'
    ).toEqual(95);
    inst.category = 'elevation';
    inst.use();
    expect(
      inst.value,
      'the use function of Instrument class should NOT decrease the value attribute by 10 if category NOT equal to "Strings"'
    ).toEqual(95);
  });

  // Client class tests
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
  it('The Client class should create an empty array when being initiated', function() {
    let client = new Client('elevation', 'Jona');
    expect(
      client.rentedItems,
      "the 'emptyItems' of the client was not initialized when creating an instance of Client - make sure you're using `this` and asign 'rentedItems' in the constructor to be [] (an empty array)"
    ).toEqual([]);
  });
  it('The Client class should have a function called - checkoutItem', function() {
    let client = new Client('elevation', 'Jona');
    expect(
      typeof client.checkoutItem,
      "there should be a function called 'checkoutItem' in the Client class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });

  it('The checkoutItem function in Client class should push the item to the rentedItems array if the rentedItems array has less than 5 items AND the item status is "Available"', function() {
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    client.checkoutItem(store, book);
    expect(
      client.rentedItems.length,
      'the checkoutItem function of Client class should push the item to the rentedItems'
    ).toEqual(1);
  });

  it('The checkoutItem function in Client class should use the Store class function rentItem()', function() {
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
      "rentItem() function in the Store class wasn't called from the checkoutItem() function of the Client class"
    ).toHaveBeenCalled();
  });

  // Store class tests
  it('The Store class should create an object with 3 attributes: name (should be initialized in the constructor), clients array and items array', function() {
    let store = new Store('elevation');
    expect(
      store.name,
      "the 'name' of the store was not initialized in the constructor - make sure you're using `this`"
    ).toEqual('elevation');
    expect(
      store.clients,
      "the 'clients' of the store was not initialized to an empty array in the constructor - make sure you're using `this`"
    ).toEqual([]);

    expect(
      store.items,
      "the 'items' of the store was not initialized to an empty array in the constructor - make sure you're using `this`"
    ).toEqual([]);
  });
  it('The Store class should have a functions called - rentItem, returnItem, addItem, repairItem, addClient', function() {
    let store = new Store('elevation');
    expect(
      typeof store.rentItem,
      "there should be a function called 'rentItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.returnItem,
      "there should be a function called 'returnItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.addItem,
      "there should be a function called 'addItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.repairItem,
      "there should be a function called 'repairItem' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
    expect(
      typeof store.addClient,
      "there should be a function called 'addClient' in the Store class - p.s. it should be outside of the constructor"
    ).toEqual('function');
  });

  it('the addItem function of Store class should push the item to the items array of the store', function() {
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.addItem(book);
    expect(
      store.items,
      'the addItem function of Store class should push the item to the items array of the store'
    ).toEqual([
      {
        status: 'Available',
        value: 100,
        title: 'elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
  });

  it('the addClient function of Store class should push the client to the clients array of the store', function() {
    let client = new Client('elevation', 'Jona');
    let store = new Store('Lior');
    store.addClient(client);
    expect(
      store.clients,
      'the addClient function of Store class should push the client to the clients array of the store'
    ).toEqual([{ firstName: 'elevation', lastName: 'Jona', rentedItems: [] }]);
  });

  it("the repairItem function of Store class should change the status of the item to 'In Repair'", function() {
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.repairItem(book);
    expect(
      book.status,
      "the repairItem function of Store class should change the status of the item to 'In Repair"
    ).toEqual('In Repair');
  });

  it("the rentItem function of Store class should push the item to the rentedItems of the clients ; set the item's status to 'Rented'; invoke item's use() function - under certain conditions", function() {
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.rentItem(book, client);
    expect(
      book.status,
      "the rentItem function of Store class should change the item's status to 'Rented' - p.s. it should be outside of the constructor"
    ).toEqual('Rented');
    expect(
      book.value,
      'the rentItem function of Store class should invoke the use() function of Item class and increase the value of the item'
    ).toEqual(95);
    expect(
      client.rentedItems,
      'the rentItem function of Store class should push the item to the rentedItems of the clients'
    ).toEqual([
      {
        status: 'Rented',
        value: 95,
        title: 'elevation',
        author: 'Jona',
        pages: 100
      }
    ]);
  });

  it("the returnItem function of Store class should delete the item from the client's rentedItems and change the item's status to 'Available'", function() {
    let client = new Client('elevation', 'Jona');
    let book = new Book('elevation', 'Jona', 100);
    let store = new Store('Lior');
    store.addClient(client);
    store.rentItem(book, client);
    store.returnItem(book);
    expect(
      book.status,
      "the returnItem function of Store class should change the item's status to 'Available' - p.s. it should be outside of the constructor"
    ).toEqual('Available');
    expect(
      client.rentedItems.length,
      "the rentItem function of Store class should should delete the item from the client's rentedItems"
    ).toEqual(0);
  });
});
