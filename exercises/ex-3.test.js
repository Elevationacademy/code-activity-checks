// Instrument class tests
describe('Exercise 3', function () {
  it('The Instrument class should inherit from the Item class', function () {
    try {
      const Item = require(`../../src/Item`);
      const Instrument = require(`../../src/Instrument`);
      let inst = new Instrument();
      expect(
        inst instanceof Item,
        'The Instrument class does not inherit from the Item class. Make sure you use the extends method when defining the class'
      ).toBeTruthy();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The Instrument class should create an object with 2 properties: category and type - and they should be initialized in the constructor', function () {
    try {
      const Instrument = require(`../../src/Instrument`);
      let inst = new Instrument('Percussion', 'Tambourine');
      expect(
        inst.category,
        `the 'category' of the instrument was not initialized in the constructor. When passing 'Percussion' as an argument to the constructor, the category property was initialized to '${inst.category}' - make sure you're using 'this'`
      ).toBe('Percussion');
      expect(
        inst.type,
        `the 'type' of the instrument was not initialized in the constructor. When passing 'Tambourine' as an argument to the constructor, the type property was initialized to '${inst.type}' - make sure you're using 'this'`
      ).toBe('Tambourine');
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it('The Instrument class should have a method called uses that hould decrease the value property by 5 ONLY if its category is equal to "Percussion"', function () {
    try {
      const Instrument = require(`../../src/Instrument`);
      let inst = new Instrument('Percussion', 'Tambourine');
      expect(
        typeof inst.use,
        "There was not a method called 'use' in the Instrument class - p.s. it should be outside of the constructor"
      ).toBe('function');
      inst.use();
      expect(
        inst.value,
        'The use method of Instrument class did not decrease the value property by 5 when its category equal to "Percussion"'
      ).toBe(95);
      inst.category = 'Woodwind';
      inst.use();
      expect(
        inst.value,
        'The use method of the Instrument class decreased the value property even when the category was not equal to "Percussion"; the use method should NOT decrease the value property (at all) if its category is NOT equal to "Percussion"'
      ).toBe(95);
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });
});
