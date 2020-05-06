// Book class tests
describe('Exercise 2', function () {
  it('The Book class should inherit from the Item class', function () {
    try {
      const Item = require(`../../src/Item`);
      const Book = require(`../../src/Book`);
      let book = new Book();
      expect(
        book instanceof Item,
        'The Book class does not inherit from the Item class. Make sure you use the extends method when defining the class'
      ).toBeTruthy();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The Book class should create an object with 3 properties: title, author and pages - and they should be initialized in the constructor', function () {
    try {
      const Book = require(`../../src/Book`);
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
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });


  it('The Book class should have a method called use that decrease the value property by 5 if pages is greater than 50, or by 10 otherwise', function () {
    try {
      const Book = require(`../../src/Book`);
      let book = new Book('Elevation', 'Jona', 100);
      expect(
        typeof book.use,
        "There was not method called 'use' in the Book class - p.s. it should be outside of the constructor"
      ).toBe('function');
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
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});



