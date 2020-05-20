const $ = require('cheerio');
const path = require('path');
const fs = require('fs');

// Navbar tests
describe('Exercise 1', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  it(`index.html should not be modified`, async function (done) {
    const htmlContent = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'index.html'),
      'utf8'
    );
    expect(
      htmlContent.includes('class="nav-link"'),
      `index.html contain at least one element with class of 'nav-link', although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="home"'),
      `index.html contain an element with id of 'home', although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="about"'),
      `index.html contain an element with id of 'about', although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('id="search"'),
      `index.html contain an element with id of 'search', although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
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

  it(`Should add three span's to the web page inside the div with id of 'navbar'`, async function (done) {
    try {
      const html = await page.content();
      let navLinks = $('.nav-link', html);
      expect(
        navLinks.length,
        `Could not find three elements with a class of 'nav-link' on the web page, instead found ${navLinks.length}`
      ).toBe(3);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`Should have three spans with id's of: home, about, search`, async function (done) {
    try {
      const html = await page.content();
      let homeLink = $('#home', html);
      expect(
        homeLink.length,
        `Could not find one element with an id of 'home' on the web page, instead found ${homeLink.length}. Make sure the id's name is 'home', lowercased`
      ).toBe(1);
      let aboutLink = $('#about', html);
      expect(
        aboutLink.length,
        `Could not find one element with an id of 'about' on the web page, instead found ${aboutLink.length}. Make sure the id's name is 'about', lowercased`
      ).toBe(1);
      let searchLink = $('#search', html);
      expect(
        searchLink.length,
        `Could not find one element with an id of 'search' on the web page, instead found ${searchLink.length}. Make sure the id's name is 'search', lowercased`
      ).toBe(1);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  afterAll(async (done) => {
    done();
  });
});
