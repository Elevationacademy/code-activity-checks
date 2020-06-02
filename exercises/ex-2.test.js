const $ = require('cheerio');
const path = require('path');
const { getStyleFromElement, getStyleFromElements } = require('../../utils/utils');
let html;

// logo tests
describe('Exercise 2', () => {
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

  it(`There should be an element with an id of 'logo' inside an element with an id of 'container'. Inside this element there should be an element with id of 'logo-title'`, async function (done) {
    try {
      const container = $('#container', html);
      const logo = $('#logo', container);
      const logoTitle = $('#logo-title', logo);
      const logoElements = [container, logo, logoTitle];
      const logoElementsStr = ['container', 'logo', 'logo-title'];
      for (let i in logoElements) {
        expect(
          logoElements[i].length,
          `Could not find an element with an id of '${logoElementsStr[i]}'`
        ).toBe(1);
      }
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with id of 'logo' should have a background-image property of the given url's jpg picture`, async function (done) {
    try {
      const logoBGImage = await getStyleFromElement(page, '#logo', 'backgroundImage');
      expect(logoBGImage, `Could not find an element with id of 'logo'`).toBeTruthy();
      expect(
        logoBGImage.includes('https://cdn.statically.io/img/wallpapercave.com/wp/wp2858550.jpg'),
        `The element with id of 'logo' do not have a background-image property of the given url's jpg picture. Instead it has the following as a background-image propety: ${logoBGImage}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with id of 'logo-title' should have an inner HTML of 'The Pink Elevations'`, async function (done) {
    try {
      const logoTitleHTML = $('#logo-title', html).html();
      expect(logoTitleHTML, `Could not find an element with id of 'logo-title'`).toBeTruthy();
      expect(
        logoTitleHTML.toLowerCase().includes('the pink elevations'),
        `The element with id of 'logo-title' do not have an inner HTML of 'The Pink Elevations', instead it has inner HTML of - ${logoTitleHTML}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with id of 'logo-title' should have its inner HTML centered with color of #1e2f4d (rgb(30, 47, 77)) and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const elems = ['body', '#container', '#logo', '#logo-title'];
      let isCentered = false,
        isColor = false,
        isFont = false;
      for (let e of elems) {
        const elementTextAlign = await getStyleFromElement(page, e, 'textAlign');
        const elementColor = await getStyleFromElement(page, e, 'color');
        const elementFont = await getStyleFromElement(page, e, 'fontFamily');
        expect(elementFont, `Could not find an element with id of '${e}'`).toBeTruthy();
        if (elementTextAlign.includes('center')) isCentered = true;
        if (elementColor.includes('rgb(30, 47, 77)')) isColor = true;
        if (elementFont.includes('Miriam Libre')) isFont = true;
      }
      expect(
        isCentered,
        `The element with id of 'logo-title' (and its ancestors) do not have a text-align property of 'center'`
      ).toBeTruthy();
      expect(
        isColor,
        `The element with id of 'logo-title' (and its ancestors) do not have a color property of #1e2f4d (rgb(30, 47, 77))`
      ).toBeTruthy();
      expect(
        isFont,
        `The element with id of 'logo-title' (and its ancestors) do not have a font-family of "Miriam Libre", sans-serif`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with id of 'logo-title' should be placed around the middle of the element with id of "logo"`, async function (done) {
    try {
      const logoElem = await page.$('#logo');
      expect(logoElem, `Could not find an element with id of 'logo'`).toBeTruthy();
      const logoTitleElem = await page.$('#logo-title');
      expect(logoTitleElem, `Could not find an element with id of 'logo-title'`).toBeTruthy();
      const logoBox = await logoElem.boxModel();
      const logoTitleBox = await logoTitleElem.boxModel();
      const dist1 = logoTitleBox.margin[0].y - logoBox.margin[0].y;
      const dist2 = logoBox.margin[3].y - logoTitleBox.margin[3].y;
      const isMiddle = dist1 / dist2 > 0.75 || dist1 / dist2 < 1.4;
      expect(
        isMiddle,
        `The element with id of 'logo-title' is not located around the middle of the element with id of "logo". Use position: 'absolute' and 'top' to locate the "logo-title" element around the middle of the 'logo' element`
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
