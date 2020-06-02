const $ = require('cheerio');
const path = require('path');
const { getStyleFromElement, getStyleFromElements, propsTest } = require('../../utils/utils');
let html;

// contact tests
describe('Exercise 5', () => {
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

  it(`There should be an element with an id of 'contact' inside an element with an id of 'container'. Inside this element there should be a <h2> element, two <input> elements and a <button> element`, async function (done) {
    try {
      const container = $('#container', html);
      const contact = $('#contact', container);
      const h2Tag = $('h2', contact);
      const inputs = $('input', contact);
      const button = $('button', contact);
      expect(container.length, `Could not find an element with an id of 'container'`).toBe(1);
      expect(
        contact.length,
        `Could not find an element with an id of 'contact' inside an element with id of 'container'`
      ).toBe(1);
      expect(
        h2Tag.length,
        `Could not find a <h2> element inside an element with id of 'contact'`
      ).toBe(1);
      expect(
        inputs.length,
        `Could not find two <input> elements inside an element with id of 'contact', instead found - ${inputs.length}`
      ).toBe(2);
      expect(
        button.length,
        `Could not a <button> element inside an element with id of 'contact'`
      ).toBe(1);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The element with an id of 'contact' (or at least one of its ancestors) should have a background-color of #f9d2dc (rgb(249, 210, 220))`, async function (done) {
    try {
      const elems = ['body', '#container', '#contact'];
      let isBGColor = false;
      for (let e of elems) {
        const elementBGColor = await getStyleFromElement(page, e, 'backgroundColor');
        expect(elementBGColor,`Could not find an element with id of ${e.slice(1)}`).toBeTruthy()
        if (elementBGColor.includes('rgb(249, 210, 220)')) isBGColor = true;
      }
      expect(
        isBGColor,
        `The element with an id of 'contact' (and its ancestors) do not have a background-color of #f9d2dc (rgb(249, 210, 220))`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'contact' should have color of #1e2f4d (rgb(30, 47, 77)), background-color of #f9d2dc (rgb(249, 210, 220)) and font-family of "Miriam Libre", sans-serif`, async function (done) {
    try {
      const elems = ['body', '#container', '#contact', 'h2'];
      const expectedProps = {
        bgColor: 'rgb(249, 210, 220)',
        fFamily: 'Miriam Libre',
        color: 'rgb(30, 47, 77)',
      };
      const { isColor, isBGColor, isFont } = await propsTest(elems, expectedProps);
      if (isColor == undefined)
        expect(
          false,
          `Could not find one or more elements with an id of 'container', 'contact' or a <h2> element`
        ).toBeTruthy();
      expect(
        isColor,
        `The <h2> element inside the element with id of 'contact' (and its ancestors) do not have a color property of #1e2f4d (rgb(30, 47, 77))`
      ).toBeTruthy();
      expect(
        isBGColor,
        `The <h2> element inside the element with id of 'contact' (and its ancestors) do not have a background-color of #f9d2dc (rgb(249, 210, 220))`
      ).toBeTruthy();
      expect(
        isFont,
        `The <h2> element inside the element with id of 'contact' (and its ancestors) do not have a font-family of "Miriam Libre", sans-serif`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <h2> element inside the element with id of 'contact' should have an inner HTML of 'Contact Us'`, async function (done) {
    try {
      const contact = $('#contact', html);
      let h2HTML = $('h2', contact).html();
      expect(h2HTML, `Could not find a <h2> element inside an element with id of 'contact'`).toBeTruthy();

      expect(
        h2HTML.toLowerCase().includes('contact us'),
        `The <h2> element inside the element with id of 'contact' do not have an inner HTML of "Contact Us", instead it has inner HTML of - ${h2HTML}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`One of the <input> elements inside the element with id of 'contact' should have a placeholder of 'Name' and the other should have a placeholder of 'Email'`, async function (done) {
    try {
      const inputs = $('input', html);
      expect(inputs.length, `Could not find any <input> elements`).toBeTruthy();

      const expectedPlaceholders = ['name', 'email'];
      const placeholders = [];
      $(inputs).each(function (i, elm) {
        placeholders.push($(this).attr('placeholder').toLowerCase());
      });
      expect(
        placeholders,
        `Expected to find two <input> elements with placeholder attributes of 'Name' and 'Email' - but instead found <input> elements with placeholders of - ${placeholders}`
      ).toEqual(expectedPlaceholders);
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <button> element inside the element with id of 'contact' should have a color of #ffffff (rgb(255, 255, 255)) and background-color of #1e2f4d (rgb(30, 47, 77))`, async function (done) {
    try {
      const buttonColor = await getStyleFromElement(page, 'button', 'color');
      const buttonBGColor = await getStyleFromElement(page, 'button', 'backgroundColor');
      expect(buttonColor, `Could not find a <button> element`).toBeTruthy();

      expect(
        buttonColor.includes('rgb(255, 255, 255)'),
        `The <button> element do not have a color of #ffffff (rgb(255, 255, 255)). Instead, it has a color of - ${buttonColor}`
      ).toBeTruthy();
      expect(
        buttonBGColor.includes('rgb(30, 47, 77)'),
        `The <button> element do not have a background-color of #1e2f4d (rgb(30, 47, 77)). Instead, it has a background-color of - ${buttonBGColor}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <button> element inside the element with id of 'contact' should have an inner HTML of 'SEND'`, async function (done) {
    try {
      const buttonHTML = $('button', html).html();
      expect(buttonHTML, `Could not find a <button> element`).toBeTruthy();

      expect(
        buttonHTML.toLowerCase().includes('send'),
        `The <button> element do not have an inner HTML of "SEND", instead it has inner HTML of - ${buttonHTML}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <button> element inside the element with id of 'contact' should change its color to #1e2f4d (rgb(30, 47, 77)) and its background-color to #ffffff (rgb(255, 255, 255)) when hovered on`, async function (done) {
    try {
      const button = await page.$('button')
      expect(button, `Could not find a <button> element`).toBeTruthy();

      if (button) await page.hover('button');

      const buttonColor = await getStyleFromElement(page, 'button', 'color');
      const buttonBGColor = await getStyleFromElement(page, 'button', 'backgroundColor');
      expect(
        buttonColor.includes('rgb(30, 47, 77)'),
        `The <button> element do not have a color of #1e2f4d (rgb(30, 47, 77)) when being hovered. Instead, it has a color of - ${buttonColor}`
      ).toBeTruthy();
      expect(
        buttonBGColor.includes('rgb(255, 255, 255)'),
        `The <button> element do not have a background-color of #ffffff (rgb(255, 255, 255)) when being hovered. Instead, it has a background-color of - ${buttonBGColor}`
      ).toBeTruthy();
      done();
    } catch (error) {
      expect(false, `${error}`).toBeTruthy();
    }
  });

  it(`The <button> element and two <input> elements inside the element with id of 'contact' should be aligned horizontally, not blocking each others and with around the same height`, async function (done) {
    try {
      const inputsElems = await page.$$('input');
      expect(
        inputsElems,
        `Could not find any <input> elements`
      ).toBeTruthy();

      const buttonElem = await page.$('button');
      expect(
        buttonElem,
        `Could not find a <button> element`
      ).toBeTruthy();

      let contactElemsBox = [];
      for (let i = 0; i < inputsElems.length; i++) {
        contactElemsBox.push(await inputsElems[i].boxModel());
        // console.log(contactElemsBox[i]);
      }
      contactElemsBox.push(await buttonElem.boxModel());
      // console.log(contactElemsBox[2]);
      let isY = true;
      let isX = true;
      let isHeight = true;
      for (let i = 0; i < contactElemsBox.length - 1; i++) {
        if (
          contactElemsBox[i].content[0].y > contactElemsBox[i + 1].content[0].y * 1.1 ||
          contactElemsBox[i].content[0].y < contactElemsBox[i + 1].content[0].y * 0.9
        )
          isY = false;
        if (contactElemsBox[i].content[1].x > contactElemsBox[i + 1].content[0].x) isX = false;
        if (
          contactElemsBox[i].height > contactElemsBox[i + 1].height * 1.1 ||
          contactElemsBox[i].height < contactElemsBox[i + 1].height * 0.9
        )
          isHeight = false;
      }
      expect(
        isY,
        `At least one of the elements of the #contact section (the two <input>s and one <button>) is not aligned horizontally`
      ).toBeTruthy();
      expect(
        isX,
        `At least one of the elements of the #contact section (the two <input>s and one <button>) is hiding another element`
      ).toBeTruthy();
      expect(
        isHeight,
        `At least one of the elements of the #contact section (the two <input>s and one <button>) is not around at the same height as another element`
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
