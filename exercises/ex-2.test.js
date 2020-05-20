const $ = require('cheerio');
const path = require('path');
const fs = require('fs');

// Home tests
describe('Exercise 2', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  it(`The index.html file should not be modified`, async function (done) {
    const htmlContent = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'index.html'),
      'utf8'
    );
    expect(
      htmlContent.includes('<img'),
      `The index.html file contains an img element, although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
    ).toBeFalsy();
    done();
  });

  it(`You should use jQuery and not vanilla JS DOM methods`, async function (done) {
    const mainContent = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'main.js'), 'utf8');
    expect(
      mainContent.includes('$'),
      `Could not find '$' (jQuery) in the main.js file. Rememeber that you should use jQuery and not vanilla JS DOM operations`
    ).toBeTruthy();
    expect(
      mainContent.includes('empty'),
      `Could not find the 'empty' keyword to empty the container element before appending the img element in the main.js file. Rememeber that you should use jQuery and not vanilla JS DOM operations`
    ).toBeTruthy();
    done();
  });

  it(`Clicking the 'home' button (span) should display an img tag with id 'logo' and correct src attribute`, async function (done) {
    try {
      await page.click('#home');
      let html = await page.content();
      let imgTag = $('#logo', html);
      expect(
        imgTag.length,
        `Could not find an img tag with id 'logo' after clicking the home button (span). Use the jQuery on() method to create a dynamic event listener`
      ).toBe(1);
      await page.click('#home');
      html = await page.content();
      imgTag = $('#logo', html);
      expect(
        imgTag.length,
        `Could not find 'one' img tag with id 'logo' after clicking the home button (span) twice, instead found ${imgTag.length}. Make sure to empty the container element before appending the img tag to it`
      ).toBe(1);
      const srcStr = imgTag[0].attribs.src;
      expect(
        srcStr.includes('logo.svg'),
        `The img tag's 'src' attribute does not have the correct path to the image. Rememeber to use the 'logo' variable for the 'src' attribute. Backticks can help here`
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
