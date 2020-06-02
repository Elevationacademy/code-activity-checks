const $ = require('cheerio');
const path = require('path');
const { getStyleFromElement, getStyleFromElements, propsTest } = require('../../utils/utils');
let html;

// band tests
describe('Exercise 3', () => {
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

  it(`There should be an element with an id of 'band' inside an element with an id of 'container'. Inside this element there should be a <h2> element and two <p>'s elements`, async function (done) {
    try {
      const container = $('#container', html);
      const band = $('#band', container);
      const h2Tag = $('h2', band);
      const pTags = $('p', band);
      expect(container.length, `Could not find an element with an id of 'container'`).toBe(1);
      expect(
        band.length,
        `Could not find an element with an id of 'band' inside an element with id of 'container'`
      ).toBe(1);
      expect(
        h2Tag.length,
        `Could not find a <h2> element inside an element with id of 'band'`
      ).toBe(1);
      expect(
        pTags.length,
        `Could not find two <p> elements inside an element with id of 'band', instead found - ${pTags.length}`
      ).toBe(2);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'band' should have a color of #1e2f4d (rgb(30, 47, 77)), background-color of #f9d2dc (rgb(249, 210, 220)) and and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const elems = ['body', '#container', '#band', 'h2'];
      const expectedProps = {
        bgColor: 'rgb(249, 210, 220)',
        fFamily: 'Miriam Libre',
        color: 'rgb(30, 47, 77)',
      };
      const { isColor, isBGColor, isFont } = await propsTest(elems, expectedProps);
      if (isColor == undefined)
        expect(
          false,
          `Could not find one or more elements with an id of 'container', 'band' or a <h2> element`
        ).toBeTruthy();
      expect(
        isColor,
        `The <h2> element inside the element with id of 'band' (and its ancestors) do not have a color property of #1e2f4d (rgb(30, 47, 77))`
      ).toBeTruthy();
      expect(
        isBGColor,
        `The <h2> element inside the element with id of 'band' (and its ancestors) do not have a background-color of #f9d2dc (rgb(249, 210, 220))`
      ).toBeTruthy();
      expect(
        isFont,
        `The <h2> element inside the element with id of 'band' (and its ancestors) do not have a font-family of "Miriam Libre", sans-serif`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'band' should have an inner HTML of 'We're back!'`, async function (done) {
    try {
      const band = $('#band', html);
      let h2HTML = $('h2', band).html();
      expect(h2HTML, `Could not find a <h2> element inside an element with id of 'band'`).toBeTruthy();
      expect(
        h2HTML.toLowerCase().includes('we&apos;re back!'),
        `The <h2> element inside the element with id of 'band' do not have an inner HTML of "We're back!", instead it has inner HTML of - ${h2HTML}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'band' should have its inner HTML centered`, async function (done) {
    try {
      const elems = ['body', '#container', '#band', 'h2'];
      let isCentered = false;
      for (let e of elems) {
        const elementTextAlign = await getStyleFromElement(page, e, 'textAlign');
        expect(
          elementTextAlign,
          `Could not find one or more elements with an id of 'container', 'band' or a <h2> element`
        ).toBeTruthy();
        if (elementTextAlign.includes('center')) isCentered = true;
      }
      expect(
        isCentered,
        `The <h2> element inside the element with id of 'band' (and its ancestors) do not have a text-align property of 'center'`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <p> elements inside the element with id of 'band' should have color of #1e2f4d (rgb(30, 47, 77)), background-color of #f9d2dc (rgb(249, 210, 220)) and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const elems = ['body', '#container', '#band', 'p'];
      const expectedProps = {
        bgColor: 'rgb(249, 210, 220)',
        fFamily: 'Miriam Libre',
        color: 'rgb(30, 47, 77)',
      };
      const { isColor, isBGColor, isFont } = await propsTest(elems, expectedProps);
      if (isColor == undefined)
        expect(
          false,
          `Could not find one or more elements with an id of 'container', 'band' or a <p> element`
        ).toBeTruthy();
      expect(
        isColor,
        `At least one of the <p> elements inside the element with id of 'band' (and their ancestors) do not have a color property of #1e2f4d (rgb(30, 47, 77))`
      ).toBeTruthy();
      expect(
        isBGColor,
        `At least one of the <p> elements inside the element with id of 'band' (and their ancestors) do not have a background-color of #f9d2dc (rgb(249, 210, 220))`
      ).toBeTruthy();
      expect(
        isFont,
        `At least one of the <p> elements inside the element with id of 'band' (and their ancestors) do not have a font-family of "Miriam Libre", sans-serif`
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
