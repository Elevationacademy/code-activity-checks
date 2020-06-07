const $ = require('cheerio');
const path = require('path');
let html;

// general tests
describe('Exercise 6', () => {
  beforeAll(async () => {
    page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    });
    // page.setViewport({
    //   width: 1280,
    //   height: 720,
    //   deviceScaleFactor: 1
    // })
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'));
    html = await page.content();
  });

  it(`The order of the elements on the page should be (in this exact order, one after another): #nav-bar and then #container. Inside the #container the order should be (in this exact order, one after another): #logo, #band, #tour, #contact`, async function (done) {
    try {
      const navbarElem = await page.$('#nav-bar');
      expect(navbarElem, `Could not find any element with id of 'nav-bar'`).toBeTruthy();
      const containerElem = await page.$('#container');
      expect(containerElem, `Could not find any element with id of 'container'`).toBeTruthy();

      const navbarBox = await navbarElem.boxModel();
      const containerBox = await containerElem.boxModel();
      expect(
        navbarBox.content[3].y <= containerBox.content[0].y,
        `The element with id of 'nav-bar' is not positioned above the element with id of 'container'`
      ).toBeTruthy();

      const containerElems = ['#logo', '#band', '#tour', '#contact'];
      let containerElemsBox = [];
      for (let elem of containerElems) {
        const element = await page.$(elem);
        expect(element, `Could not find any elements with id of '${elem.slice(1)}'`).toBeTruthy();
        containerElemsBox.push(await element.boxModel());
      }
      let isY = true;
      for (let i = 0; i < containerElemsBox.length - 1; i++) {
        if (containerElemsBox[i].content[3].y > containerElemsBox[i + 1].content[0].y) isY = false;
      }
      expect(
        isY,
        `At least one of the elements of the #container section (the elements with id of 'logo', 'band', 'tour' or 'contact') is not in its correct place. Make sure the elements are positioned one after another in this exact order: #logo, #band, #tour, #contact`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The #logo, #band, #tour and #contact elements should all be aligned vertically`, async function (done) {
    try {
      const containerElems = ['#logo', '#band', '#tour', '#contact'];
      let containerElemsBox = [];
      for (let elem of containerElems) {
        const element = await page.$(elem);
        expect(element, `Could not find any elements with id of '${elem.slice(1)}'`).toBeTruthy();
        containerElemsBox.push(await element.boxModel());
      }
      let isX = true;
      for (let i = 0; i < containerElemsBox.length - 1; i++) {
        if (
          containerElemsBox[i].margin[0].x > containerElemsBox[i + 1].margin[0].x * 1.1 ||
          containerElemsBox[i].margin[0].x < containerElemsBox[i + 1].margin[0].x * 0.9
        )
          isX = false;
      }
      expect(
        isX,
        `At least one of the elements of the #container section (the elements with id of 'logo', 'band', 'tour' or 'contact') is not aligned vertically`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The #logo, #band, #tour and #contact elements should all be positioned around the center of the element with id of 'nav-bar' (having left and right margins)`, async function (done) {
    try {
      const navbarElem = await page.$('#nav-bar');
      expect(navbarElem, `Could not find any element with id of 'nav-bar'`).toBeTruthy();
      const navbarBox = await navbarElem.boxModel();
      const navbarLeftX = navbarBox.margin[0].x;
      const navbarRightX = navbarBox.margin[1].x;

      const containerElems = ['#logo', '#band', '#tour', '#contact'];
      let containerElemsBox = [];
      for (let elem of containerElems) {
        const element = await page.$(elem);
        expect(element, `Could not find any elements with id of '${elem.slice(1)}'`).toBeTruthy();
        containerElemsBox.push(await element.boxModel());
      }

      let isMargin = true;
      for (let i = 0; i < containerElemsBox.length - 1; i++) {
        if (containerElemsBox[i].margin[0].x == 0 || containerElemsBox[i].margin[1].x == 0 ) isMargin = false;
      }
      expect(
        isMargin,
        `At least one of the elements of the #container section (the elements with id of 'logo', 'band', 'tour' or 'contact') do not have space on the left or right sides. Make sure to add space on both sides as per the provided image`
      ).toBeTruthy();

      let isEqualMargin = true;
      for (let i = 0; i < containerElemsBox.length - 1; i++) {
        const leftMargin = containerElemsBox[i].margin[0].x - navbarLeftX;
        const rightMargin = navbarRightX - containerElemsBox[i].margin[1].x;
        if (leftMargin > rightMargin * 1.1 || leftMargin < rightMargin * 0.9) isEqualMargin = false;
      }
      expect(
        isEqualMargin,
        `At least one of the elements of the #container section (the elements with id of 'logo', 'band', 'tour' or 'contact') do not have equal space on the left or right sides. Make sure to add equal space on both sides as per the provided image`
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
