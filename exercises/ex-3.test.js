const $ = require('cheerio');
const path = require('path');
const fs = require('fs');

// About tests
describe('Exercise 3', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  it(`index.html should not be modified`, async function (done) {
    const htmlContent = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'index.html'),
      'utf8'
    );
    expect(
      htmlContent.includes('<h1>'),
      `index.html contain an h1 element, although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    expect(
      htmlContent.includes('class="team-member"'),
      `index.html contain an element with class of 'team-member', although it should not be modified. Reminder: you should not add any elements to the index.html file ; make sure you write your code only in the main.js file`
    ).toBeFalsy();
    done();
  });

  it(`Should use jQuery and not DOM commands`, async function (done) {
    const mainContent = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'main.js'), 'utf8');
    expect(
      mainContent.includes('$'),
      `Could not find '$' (jQuery) in the main.js file. Rememeber that you should use jQuery and not DOM commands`
    ).toBeTruthy();
    expect(
      mainContent.includes('closest'),
      `Could not find 'closest' keyword in main.js file. Rememeber that you should use jQuery and not DOM commands`
    ).toBeTruthy();
    done();
  });

  it(`Should display five team members details after clicking on the about button (span)`, async function (done) {
    await page.click('#about');
    let html = await page.content();
    let teamMembers = $('.team-member', html);
    expect(
      teamMembers.length,
      `Could not find five div's with class of team-member after clicking the about button (span). Instead found ${teamMembers.length} div's with class or team-member. Use the on() method for dynamic event listener`
    ).toBe(5);
    await page.click('#about');
    html = await page.content();
    teamMembers = $('.team-member', html);
    expect(
      teamMembers.length,
      `Could not find five div's with class of team-member after clicking the about button (span) twice. Instead found ${teamMembers.length} div's with class or team-member. Make sure to empty the container element before appending it with the team-members div's`
    ).toBe(5);
    done();
  });

  it(`Should change the color of the name of the team member after clicking it`, async function (done) {
    await page.click('#about');
    let html = await page.content();
    let namesArr = $('.name', html);
    let innerText = await page.evaluate(() => document.querySelectorAll('.name')[0].innerText);

    expect(
      namesArr[0].attribs.style,
      `Before clicking on div with class=name of ${innerText}, it has an attribue of style which it should not have`
    ).toBeFalsy();
    await page.click('.name');
    html = await page.content();
    namesArr = $('.name', html);
    expect(
      namesArr[0].attribs.style.includes('rgb(255, 110, 159)'),
      `After clicking on div with class=name of ${innerText}, the color did not change to the right color, and instead we got ${namesArr[0].attribs.style}. Note that after clicking, the color should change to - #ff6e9f (rgb(255, 110, 159)). Use 'this' keyword to select the correct div and the 'css' keywrod to change its color`
    ).toBeTruthy();
    done();
  });

  it(`Should change the color of the position of the team member after clicking on it's name`, async function (done) {
    await page.click('#about');
    let html = await page.content();
    let posArr = $('.position', html);
    let innerText = await page.evaluate(() => document.querySelectorAll('.name')[0].innerText);
    expect(
      posArr[0].attribs.style,
      `Before clicking on div with class=name of ${innerText}, it's position div has an attribue of style which it should not have`
    ).toBeFalsy();

    await page.click('.name');
    html = await page.content();
    posArr = $('.position', html);
    expect(
      posArr[0].attribs.style.includes('rgb(255, 110, 159)'),
      `After clicking on div with class=name of ${innerText}, the color of its position div did not change to the right color, and instead we got ${posArr[0].attribs.style}. Note that after clicking, the color should change to - #ff6e9f (rgb(255, 110, 159)). Use 'this', 'closest' and 'find' keywords to select the correct div, and the 'css' keywrod to change its color`
    ).toBeTruthy();
    done();
  });

  it(`Should change the background color of the div (class=team-member) which contain the name and position of a team member after clicking on the name`, async function (done) {
    await page.click('#about');
    let html = await page.content();
    let membersArr = $('.team-member', html);
    let innerText = await page.evaluate(() => document.querySelectorAll('.name')[0].innerText);
    expect(
      membersArr[0].attribs.style,
      `Before clicking on div with class=name of ${innerText}, it's ancestor div (class=team-member) has an attribue of style which it should not have`
    ).toBeFalsy();

    await page.click('.name');
    html = await page.content();
    membersArr = $('.team-member', html);
    expect(
      membersArr[0].attribs.style.includes('rgb(30, 47, 77)'),
      `After clicking on div with class=name of ${innerText}, the background color of its ancestor div (class=team-member) did not change to the right color, and instead we got ${membersArr[0].attribs.style}. Note that after clicking, the color should change to - #1e2f4d (rgb(30, 47, 77))). Use 'this' and 'closest' keywords to select the correct div, and the 'css' keywrod to change its background color`
    ).toBeTruthy();
    done();
  });

  afterAll(async (done) => {
    done();
  });
});