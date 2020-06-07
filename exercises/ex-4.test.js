const $ = require('cheerio');
const path = require('path');
const { getStyleFromElement, getStyleFromElements, propsTest } = require('../../utils/utils');
let html;

// tour tests
describe('Exercise 4', () => {
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

  it(`There should be an element with an id of 'tour' inside an element with an id of 'container'. Inside this element there should be a <h2> element and four elements with class of 'date'`, async function (done) {
    try {
      const container = $('#container', html);
      const tour = $('#tour', container);
      const h2Tag = $('h2', tour);
      const dates = $('.date', tour);
      expect(container.length, `Could not find an element with an id of 'container'`).toBe(1);
      expect(
        tour.length,
        `Could not find an element with an id of 'tour' inside an element with id of 'container'`
      ).toBe(1);
      expect(
        h2Tag.length,
        `Could not find a <h2> element inside an element with id of 'tour'`
      ).toBe(1);
      expect(
        dates.length,
        `Could not find four elements with class of 'date' inside an element with id of 'tour', instead found - ${dates.length}`
      ).toBe(4);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with an id of 'tour' (or at least one of its ancestors) should have a background-color of #f9d2dc (rgb(249, 210, 220))`, async function (done) {
    try {
      const elems = ['body', '#container', '#tour'];
      let isBGColor = false;
      for (let e of elems) {
        const elementBGColor = await getStyleFromElement(page, e, 'backgroundColor');
        expect(
          elementBGColor,
          `Could not find one or more elements with id of 'container' and 'tour'`
        ).toBeTruthy();
        if (elementBGColor.includes('rgb(249, 210, 220)')) isBGColor = true;
      }
      expect(
        isBGColor,
        `The element with an id of 'tour' (and its ancestors) do not have a background-color of #f9d2dc (rgb(249, 210, 220))`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'tour' should have color of #1e2f4d (rgb(30, 47, 77)), background-color of #f9d2dc (rgb(249, 210, 220)) and and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const elems = ['body', '#container', '#tour', 'h2'];
      const expectedProps = {
        bgColor: 'rgb(249, 210, 220)',
        fFamily: 'Miriam Libre',
        color: 'rgb(30, 47, 77)',
      };
      const { isColor, isBGColor, isFont } = await propsTest(elems, expectedProps);
      if (isColor == undefined)
        expect(
          false,
          `Could not find one or more elements with an id of 'container', 'tour' or a <h2> element`
        ).toBeTruthy();
      expect(
        isColor,
        `The <h2> element inside the element with id of 'tour' (and its ancestors) do not have a color property of #1e2f4d (rgb(30, 47, 77))`
      ).toBeTruthy();
      expect(
        isBGColor,
        `The <h2> element inside the element with id of 'tour' (and its ancestors) do not have a background-color of #f9d2dc (rgb(249, 210, 220))`
      ).toBeTruthy();
      expect(
        isFont,
        `The <h2> element inside the element with id of 'tour' (and its ancestors) do not have a font-family of "Miriam Libre", sans-serif`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'tour' should have an inner HTML of 'Tour Dates'`, async function (done) {
    try {
      const tour = $('#tour', html);
      let h2HTML = $('h2', tour).html();
      expect(h2HTML, `Could not find a <h2> element inside an element with id of 'tour'`).toBeTruthy();
      expect(
        h2HTML.toLowerCase().includes('tour dates'),
        `The <h2> element inside the element with id of 'tour' do not have an inner HTML of "Tour Dates", instead it has inner HTML of - ${h2HTML}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'tour' should have its inner HTML centered`, async function (done) {
    try {
      const elems = ['body', '#container', '#tour', 'h2'];
      let isCentered = false;
      for (let e of elems) {
        const elementTextAlign = await getStyleFromElement(page, e, 'textAlign');
        expect(
          elementTextAlign,
          `Could not find one or more elements with an id of 'container', 'tour' or a <h2> element`
        ).toBeTruthy();
        if (elementTextAlign.includes('center')) isCentered = true;
      }
      expect(
        isCentered,
        `The <h2> element inside the element with id of 'tour' (and its ancestors) do not have a text-align property of 'center'`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The elements with class of 'date' inside the element with id of 'tour' should have color of #1e2f4d (rgb(30, 47, 77)), background-color of #ffffff (rgb(255, 255, 255)) and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const elems = ['body', '#container', '#tour', '.date'];
      const expectedProps = {
        bgColor: 'rgb(255, 255, 255)',
        fFamily: 'Miriam Libre',
        color: 'gb(30, 47, 77)',
      };
      const { isColor, isBGColor, isFont } = await propsTest(elems, expectedProps);
      if (isColor == undefined)
        expect(
          false,
          `Could not find one or more elements with an id of 'container', 'tour' or elements with class of 'date'`
        ).toBeTruthy();
      expect(
        isColor,
        `At least one of the four elements with class of 'date' (and their ancestors) do not have a color property of #1e2f4d (rgb(30, 47, 77))`
      ).toBeTruthy();
      expect(
        isBGColor,
        `At least one of the four elements with class of 'date' (and their ancestors) do not have a background-color of #ffffff (rgb(255, 255, 255))`
      ).toBeTruthy();
      expect(
        isFont,
        `At least one of the four elements with class of 'date' (and their ancestors) do not have a font-family of "Miriam Libre", sans-serif`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The elements with class of 'date' should all have inner HTML that contain the string '2071'`, async function (done) {
    try {
      const dates = await $('.date', html);
      expect(dates.length, `Could not find any elements with class of 'date'`).toBeTruthy();

      isCorrentHTML = true;
      $(dates).each(function (i, elm) {
        if (!$(this).html().includes('2071')) isCorrentHTML = false;
      });
      expect(
        isCorrentHTML,
        `At least one of the four elements with class of 'date' do not contain the string '2071' in their inner HTML`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The elements with class of 'date' inside the element with id of 'tour' should be aligned vertically, not blocking each others and with the same width and height'`, async function (done) {
    try {
      const datesElems = await page.$$('.date');
      expect(datesElems, `Could not find any elements with class of 'date'`).toBeTruthy();

      let datesBox = [];
      for (let i = 0; i < datesElems.length; i++) {
        datesBox.push(await datesElems[i].boxModel());
        // console.log(datesBox[i]);
      }
      let isY = true;
      let isX = true;
      let isHeight = true;
      let isWidth = true;
      expect(datesBox.length, `Could not find any elements with class of 'date'`).toBeTruthy();
      for (let i = 0; i < datesBox.length - 1; i++) {
        if (
          datesBox[i].content[0].x > datesBox[i + 1].content[0].x * 1.1 ||
          datesBox[i].content[0].x < datesBox[i + 1].content[0].x * 0.9
        )
          isX = false;
        if (datesBox[i].content[1].y > datesBox[i + 1].content[0].y) isY = false;
        if (datesBox[i].height !== datesBox[i + 1].height) isHeight = false;
        if (datesBox[i].width !== datesBox[i + 1].width) isWidth = false;
      }
      expect(
        isX,
        `At least one of the elements with class 'date' is not aligned vertically`
      ).toBeTruthy();
      expect(
        isY,
        `At least one of the elements with class 'date' is hiding another element with class 'date'`
      ).toBeTruthy();
      expect(
        isHeight,
        `At least one of the elements with class 'date' is not at the same height as another element with class 'date'`
      ).toBeTruthy();
      expect(
        isWidth,
        `At least one of the elements with class 'date' is not at the same width as another element with class 'date'`
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
