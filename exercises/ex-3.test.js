const $ = require('cheerio');
const path = require('path');
const fs = require('fs');

// About tests
describe('Exercise 3', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  it(`The index.html file should not be modified`, async function (done) {
    const htmlContent = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'index.html'),
      'utf8'
    );
    expect(
      htmlContent.includes('<h1>'),
      `The index.html file contains an h1 element, although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('class="team-member"'),
      `The index.html file contain an element with class of 'team-member', although it should not be modified. Reminder: you should not add any elements to the index.html file - make sure you write your code only in the main.js file`
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
      mainContent.includes('closest'),
      `Could not find the 'closest' keyword in main.js file. Rememeber that you should use jQuery and not vanilla JS DOM operations`
    ).toBeTruthy();
    done();
  });

  it(`Clicking on the 'about' button (span) should display an 'h1' tag with 'The Team:' as it's innerHTML`, async function (done) {
    try {
      await page.click('#about');
      let html = await page.content();
      let header = $('h1', html);
      expect(
        header.length,
        `Could not find an 'h1' tag on the page after clicking the 'about' button (span). Use the jQuery on() method to create a dynamic event listener`
      ).toBe(1);
      headerHTML = await page.$eval('h1', (element) => {
        return element.innerHTML;
      });
      expect(
        headerHTML,
        `After clicking the 'about' button (span), we could not find an 'h1' tag with 'The Team:' as it's innerHTML. Instead we got - ${headerHTML}. Make sure you use the 'aboutHeader' variable and use the jQuery on() method to create a dynamic event listener`
      ).toBe('The Team:');

      await page.click('#about');
      html = await page.content();
      header = $('h1', html);
      expect(
        header.length,
        `Could not find 'one' 'h1' tag after clicking the about button (span) twice, instead found ${header.length}. Make sure to empty the container element before appending the 'h1' tag to it`
      ).toBe(1);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`Clicking on the 'about' button (span) should display five team member details on the page`, async function (done) {
    try {
      await page.click('#about');
      let html = await page.content();
      let teamMembers = $('.team-member', html);
      expect(
        teamMembers.length,
        `Could not find five 'div's with a class of 'team-member' after clicking the 'about' button (span). Instead found ${teamMembers.length} divs with class of team-member. Use the jQuery on() method to create a dynamic event listener`
      ).toBe(5);
      await page.click('#about');
      html = await page.content();
      teamMembers = $('.team-member', html);
      expect(
        teamMembers.length,
        `Could not find five 'div's with a class of 'team-member' after clicking the about button (span) twice. Instead found ${teamMembers.length} divs with class of 'team-member'. Make sure to empty the container element before appending the 'team-member' divs to it`
      ).toBe(5);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`Clicking on the name of a team member should change its' color`, async function (done) {
    try {
      await page.click('#about');
      let html = await page.content();
      let namesArr = $('.name', html);
      let innerText = await page.evaluate(() => document.querySelectorAll('.name')[0].innerText);

      expect(
        namesArr[0].attribs.style,
        `Before clicking on div with class of 'name' and innerHTML of ${innerText}, it has style attribue which it should not have`
      ).toBeFalsy();
      await page.click('.name');
      html = await page.content();
      namesArr = $('.name', html);
      expect(
        namesArr[0].attribs.style.includes('rgb(255, 110, 159)'),
        `After clicking on div with class of 'name' and innerHTML of ${innerText}, the color did not change to the correct color, and instead we got ${namesArr[0].attribs.style}. Note that after clicking, the color should change to - #ff6e9f (rgb(255, 110, 159)). Use the 'this' keyword to select the correct div and the jQuery'css()' method to change its' color`
      ).toBeTruthy();
      expect(
        namesArr[0].attribs.style.includes('color'),
        `After clicking on div with class of 'name' and innerHTML of ${innerText}, the color did not change to the correct color, and instead we got ${namesArr[0].attribs.style}. Note that after clicking, the color should change to - #ff6e9f (rgb(255, 110, 159)). Use the 'this' keyword to select the correct div and the jQuery'css()' method to change its' color`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`Clicking on the name of a team member should change the color of the 'position' of that team member`, async function (done) {
    try {
      await page.click('#about');
      let html = await page.content();
      let posArr = $('.position', html);
      let innerText = await page.evaluate(() => document.querySelectorAll('.name')[0].innerText);
      expect(
        posArr[0].attribs.style,
        `Before clicking on a div with class of 'name' and innerHTML of ${innerText}, it's 'position' div had a style attribue which it should not have`
      ).toBeFalsy();

      await page.click('.name');
      html = await page.content();
      posArr = $('.position', html);
      expect(
        posArr[0].attribs.style.includes('rgb(255, 110, 159)'),
        `After clicking on a div with class of 'name' and innerHTML of ${innerText}, the color of its 'position' div did not change to the correct color, and instead we got ${posArr[0].attribs.style}. Note that after clicking on the name, the color should change to - #ff6e9f (rgb(255, 110, 159)). Use the 'this', 'closest' and 'find' keywords to select the correct div, and the jQuery 'css()' method to change its color`
      ).toBeTruthy();
      expect(
        posArr[0].attribs.style.includes('color'),
        `After clicking on a div with class of name and innerHTML of ${innerText}, the color of its 'position' div did not change to the correct color, and instead we got ${posArr[0].attribs.style}. Note that after clicking on the name, the color should change to - #ff6e9f (rgb(255, 110, 159)). Use the 'this', 'closest' and 'find' keywords to select the correct div, and the jQuery 'css()' method to change its color`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`Clicking on the 'name' should change the background color of the div with class of 'team-member' which contains the clicked name`, async function (done) {
    try {
      await page.click('#about');
      let html = await page.content();
      let membersArr = $('.team-member', html);
      let innerText = await page.evaluate(() => document.querySelectorAll('.name')[0].innerText);
      expect(
        membersArr[0].attribs.style,
        `Before clicking on div with class of 'name' and innerHTML of ${innerText}, it's ancestor div (with class 'team-member') has a style attribue which it should not have`
      ).toBeFalsy();

      await page.click('.name');
      html = await page.content();
      membersArr = $('.team-member', html);
      expect(
        membersArr[0].attribs.style.includes('rgb(30, 47, 77)'),
        `After clicking on a div with class of name and innerHTML of ${innerText}, the background color of its ancestor div (with class 'team-member') did not change to the correct color, and instead we got ${membersArr[0].attribs.style}. Note that after clicking on the name, the background color should change to - #1e2f4d (rgb(30, 47, 77))). Use the 'this' and 'closest' keywords to select the correct div, and the jQuery 'css()' method to change its background color`
      ).toBeTruthy();
      expect(
        membersArr[0].attribs.style.includes('background-color'),
        `After clicking on a div with class of 'name' and innerHTML of ${innerText}, the background color of its ancestor div (with class 'team-member') did not change to the correct color, and instead we got ${membersArr[0].attribs.style}. Note that after clicking on the name, the background color should change to - #1e2f4d (rgb(30, 47, 77))). Use the 'this' and 'closest' keywords to select the correct div, and the jQuery 'css()' method to change its background color`
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
