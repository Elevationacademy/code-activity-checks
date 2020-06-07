const $ = require('cheerio');
const path = require('path');
const { getStyleFromElement, getStyleFromElements } = require('../../utils/utils');
let html;

// nav-bar tests
describe('Exercise 1', () => {
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

  it(`There should be four <a> elements with a class of 'link' inside an element with id of 'nav-bar'`, async function (done) {
    try {
      const navbar = $('#nav-bar', html);
      const links = $('a.link', navbar);
      expect(navbar.length, `Could not find an element with an id of 'nav-bar'`).toBe(1);
      expect(
        links.length,
        `Could not find four <a> elements with a class of 'link' inside an element with id of 'nav-bar', instead found - ${links.length} <a> elements with a class of 'link'`
      ).toBe(4);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The four <a> elements with a class of 'link' should have href attributes of #, #band, #tour and #contact`, async function (done) {
    try {
      const links = $('a.link', html);
      const expectedHrefs = ['#', '#band', '#tour', '#contact'];
      const hrefs = [];
      $(links).each(function (i, elm) {
        hrefs.push($(this).attr('href'));
      });
      expect(
        hrefs,
        `Expected to find four <a> elements with a class of 'link' and href attributes of #, #band, #tour, #contact - but instead found <a> elements with a class of 'link' and hrefs of - ${hrefs}`
      ).toEqual(expectedHrefs);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The four <a> elements with a class of 'link' should have innerHTML of HOME, BAND, TOUR and CONTACT`, async function (done) {
    try {
      const links = $('a.link', html);
      const expectedHTMLs = ['home', 'band', 'tour', 'contact'];
      const HTMLs = [];
      const lowerCasedHTMLs = [];
      $(links).each(function (i, elm) {
        HTMLs.push($(this).html());
        lowerCasedHTMLs.push($(this).html().toLowerCase());
      });
      expect(
        lowerCasedHTMLs,
        `Expected to find four <a> elements with a class of 'link' and innerHTML of HOME, BAND, TOUR, CONTACT - but instead found <a> elements with a class of 'link' and innerHTML of - ${HTMLs}`
      ).toEqual(expectedHTMLs);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with an id of 'nav-bar' and/or the <a> tags (with a class of 'link') inside it should have a background-color of #1e2f4d (rgb(30, 47, 77))`, async function (done) {
    try {
      const navbarBGColor = await getStyleFromElement(page, '#nav-bar', 'backgroundColor');
      const linksBGColor = await getStyleFromElements(page, '.link', 'backgroundColor');
      const isBGColorCorrect =
        navbarBGColor === 'rgb(30, 47, 77)' || linksBGColor === 'rgb(30, 47, 77)';
      expect(
        isBGColorCorrect,
        `Both the element with an id of 'nav-bar' and the <a> tagss (with a class of 'link') inside it, do not have a background-color of #1e2f4d (rgb(30, 47, 77)). Instead, the navbar has a background-color of - ${navbarBGColor}, and the <a> tags (with class of 'link') inside it has a background-color of ${linksBGColor}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The elements with a class of 'link' should have a color of #ffffff (rgb(255, 255, 255)) and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const linksColor = await getStyleFromElements(page, '.link', 'color');
      expect(linksColor, `Could not find elements with a class of 'link'`).toBeTruthy();
      const linksFF = await getStyleFromElements(page, '.link', 'fontFamily');
      expect(linksFF, `Could not find elements with a class of 'link'`).toBeTruthy();
      expect(
        linksColor.includes('rgb(255, 255, 255)'),
        `The elements with a class of 'link' do not have a color of #ffffff (rgb(255, 255, 255)), instead they have a color of - ${linksColor}`
      ).toBeTruthy();

      expect(
        linksFF.includes('Miriam Libre'),
        `The elements with a class of 'link' do not have font-family of "Miriam Libre", sans-serif, instead the font-family is - ${linksFF}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with an id of 'nav-bar' should be placed at the upper-left corner of the page`, async function (done) {
    try {
      const navbarElem = await page.$('#nav-bar');
      expect(navbarElem, `Could not find an element with an id of 'nav-bar'`).toBeTruthy();
      const navbarBox = await navbarElem.boxModel();
      const navbarX = navbarBox.margin[0].x;
      const navbarY = navbarBox.margin[0].y;
      let isCorrectNavbarXY = navbarX >= 0 && navbarX <= 15 && navbarY >= 0 && navbarY <= 15;
      expect(
        isCorrectNavbarXY,
        `The element with an id of 'nav-bar' is not located at the upper-left corner of the page. Hint: Make the <body> margin a value of 0, and add this element as the first element inside 'body'`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The elements with a class 'link' should be aligned horizontally, not blocking each other, and with the same height`, async function (done) {
    try {
      const linksElems = await page.$$('.link');
      let linksBox = [];
      for (let i = 0; i < linksElems.length; i++) {
        linksBox.push(await linksElems[i].boxModel());
      }
      let isY = true;
      let isX = true;
      let isHeight = true;
      expect(linksBox.length, `Could not find any elements with a class of 'link'`).toBeTruthy();
      for (let i = 0; i < linksBox.length - 1; i++) {
        if (
          linksBox[i].content[0].y > linksBox[i + 1].content[0].y * 1.1 ||
          linksBox[i].content[0].y < linksBox[i + 1].content[0].y * 0.9
        )
          isY = false;
        if (linksBox[i].content[1].x > linksBox[i + 1].content[0].x) isX = false;
        if (linksBox[i].height !== linksBox[i + 1].height) isHeight = false;
      }
      expect(
        isY,
        `At least one of the elements with a class of 'link' is not aligned horizontally`
      ).toBeTruthy();
      expect(
        isX,
        `At least one of the elements with a class of 'link' is hiding another element with a class of 'link'`
      ).toBeTruthy();
      expect(
        isHeight,
        `At least one of the elements with a class of 'link' does not have the same height as another element with a class of 'link'`
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
