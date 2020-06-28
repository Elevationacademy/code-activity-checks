const $ = require('cheerio');
const path = require('path');
const fs = require('fs');

// Search tests
describe('Exercise 4', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  it(`The index.html file should not be modified`, async function (done) {
    const htmlContent = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'index.html'),
      'utf8'
    );
    expect(
      htmlContent.includes('id="search"'),
      `The index.html file contains an element with id of 'search', although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search-field"'),
      `The index.html file contains an element with id of 'search-field', although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search-btn"'),
      `The index.html file contains an element with id of 'search-btn', although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search-results"'),
      `The index.html file contains an element with id of 'search-results', although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
    ).toBeFalsy();
    done();
  });

  it(`You should use jQuery and not vanilla JS DOM methods`, async function (done) {
    const mainContent = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'main.js'), 'utf8');
    expect(
      mainContent.includes('$'),
      `Could not find '$' (jQuery) in the main.js file. Rememeber that you should use jQuery and not vanilla JS DOM operations`
    ).toBeTruthy();
    done();
  });

  it(`Clicking on the search button (span) should display an input with id of 'search-field', button with id of 'search-btn', and div with id of 'search-results'`, async function (done) {
    try {
      await page.click('#search');
      let html = await page.content();
      let searchField = $('#search-field', html);
      let searchBtn = $('#search-btn', html);
      let searchResults = $('#search-results', html);
      expect(
        searchField.length,
        `Could not find a tag with id of 'search-field' after clicking the 'search' button (span). Use the jQuery on() method to create a dynamic event listener`
      ).toBe(1);
      expect(
        searchField[0].name,
        `The tag with id of 'search-field' is not an 'input' tag, instead we got - ${searchField[0].name}. Make sure you're using the 'input' tag`
      ).toBe('input');
      expect(
        searchBtn.length,
        `Could not find a tag with id of 'search-btn' after clicking the 'search' button (span). Use the jQuery on() method to create a dynamic event listener`
      ).toBe(1);
      expect(
        searchBtn[0].name,
        `The tag with id of 'search-btn' is not a 'button' tag, instead we got - ${searchBtn[0].name}. Make sure you're using a 'button' tag`
      ).toBe('button');
      expect(
        searchResults.length,
        `Could not find a tag with id of 'search-results' after clicking the 'search' button (span). Use the jQuery on() method to create a dynamic event listener`
      ).toBe(1);

      await page.click('#search');
      html = await page.content();
      searchField = $('#search-field', html);
      expect(
        searchField.length,
        `Could not find 'one' tag with id of 'search-field' after clicking the 'search' button (span) twice. Use the jQuery on() method to create a dynamic event listener and make sure you empty the container before you append to it`
      ).toBe(1);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`Clicking the 'Search' button should display a message containing the value of the input`, async function (done) {
    try {
      await page.click('#search');
      await page.$eval('#search-field', (el) => (el.value = 'Data'));
      await page.click('#search-btn');
      let innerText = await page.evaluate(
        () => document.querySelector('#search-results').innerText
      );
      expect(
        innerText.includes('Data'),
        `After inserting the string 'Data' to the input (with id of 'search-field') and clicking the 'Search' button (with id of 'search-btn'), there was not a message in the div with id of 'search-results' containing the searched word. This is what we found in the div (with id of 'search-results'): ${innerText}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  afterAll(async (done) => {
    done();
  });
});
