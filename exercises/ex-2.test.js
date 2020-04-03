const $ = require('cheerio')
const path = require('path')

describe('exercise-2', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  })

  it(`Should calculate the amount of 'box'es on the web page and add the number as a p to the div with an id of 'total`, async function (done) {
    const numDivs = Math.floor(Math.random() * 30)
    await page.evaluate((numDivs) => {
      const boxes = document.getElementById('boxes')
      boxes.innerHTML = ''

      for (let i = 0; i < numDivs; i++) {
        const box = document.createElement('div')
        box.className = 'box'
        box.innerHTML = Math.floor(Math.random() * 100)
        boxes.appendChild(box)
      }
    }, numDivs)

    let buttonExists = true
    try {
      await page.click('#calc-total')
    } catch (e) {
      buttonExists = false
    }

    if (buttonExists) {
      const html = await page.content()
      const boxes = $('.box', html)
      const paragraphs = $('#total p', html)

      const total = paragraphs[paragraphs.length - 1].children[0].data
      expect(total, `when adding ${numDivs} divs to the web page the total that is found is ${total} instead of ${numDivs}`).toBe(`${numDivs}`)
      done()
    } else {
      expect(false, `Couldn't find a button with id of 'calc-total' on the page. Please add the button inside the div with the class 'exercise'.`).toBeTruthy()
      done()
    }
  })

  afterAll(async done => {
    done()
  })
})