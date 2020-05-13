const $ = require('cheerio');
const path = require('path');
const fs = require('fs');

// Search tests
describe('Exercise 4', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  it(`index.html should not be modified`, async function (done) {
    const htmlContent = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'index.html'),
      'utf8'
    );
    expect(
      htmlContent.includes('id="search"'),
      `index.html contain an element with id of 'search', although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search-field"'),
      `index.html contain an element with id of search-field, although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search-btn"'),
      `index.html contain an element with id of search-btn, although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search-results"'),
      `index.html contain an element with id of search-results, although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    done();
  });

  it(`Should use jQuery and not DOM commands`, async function (done) {
    const mainContent = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'main.js'), 'utf8');
    expect(
      mainContent.includes('$'),
      `Could not find '$' (jQuery) in the main.js file. Rememeber that you should use jQuery and not DOM commands`
    ).toBeTruthy();
    done();
  });

  it(`Should display an input with id=search-field, button with id=search-btn, and div with id="search-results", after clicking on the search button (span)`, async function (done) {
    await page.click('#search')
    let html = await page.content()
    let searchField = $('#search-field', html)
    let searchBtn = $('#search-btn', html)
    let searchResults = $('#search-results', html)
    expect(searchField.length, `Could not find a tag with id=search-field after clicking the search button (span). Use the on() method for dynamic event listener`).toBe(1)
    expect(searchField[0].name, `The tag with id=search-field is not an 'input' tag, instead we got - ${searchField[0].name}. Make sure you're using the 'input' tag`).toBe('input')
    expect(searchBtn.length, `Could not find a tag with id=search-btn after clicking the search button (span). Use the on() method for dynamic event listener`).toBe(1)
    expect(searchBtn[0].name, `The tag with id=search-btn is not an 'button' tag, instead we got - ${searchBtn[0].name}. Make sure you're using the 'button' tag`).toBe('button')
    expect(searchResults.length, `Could not find a tag with id=search-results after clicking the search button (span). Use the on() method for dynamic event listener`).toBe(1)
    done()
  })

  it(`Should display a message containing an input after clicking the Search button`, async function (done) {
    try {
      await page.click('#search');
      await page.$eval('#search-field', (el) => (el.value = 'Data'));
      await page.click('#search-btn');
      let innerText = await page.evaluate(
        () => document.querySelector('#search-results').innerText
      );
      expect(innerText.includes('Data'), `After insert the string 'Data' to the input (id=#search-field) and clicking the button (id=search), there was not a message in a div (id=search-results) containing the searched word. This is what we got in the div (id=search-results): ${innerText}`).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  afterAll(async (done) => {
    done();
  });
});
