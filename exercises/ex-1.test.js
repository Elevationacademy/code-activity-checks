const $ = require('cheerio')
const path = require('path')

describe('exercise-1', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  })

  it(`Should add any numbers of div's to the web page inside the div with id of 'boxes'`, async function (done) {
    const html = await page.content()

    let boxes = $('.box', html)
    expect(boxes.length, `Could not find any elements with a class of 'box' on the web page`).toBeGreaterThan(0)

    boxes =$('div.box', html)
    expect(boxes.length, `Could not find any 'div' with a class of 'box' on the web page`).toBeGreaterThan(0)

    boxes =$('#boxes > .box', html)
    expect(boxes.length, `Could not find any 'div' with a class of 'box' inside the div with id of 'boxes'`).toBeGreaterThan(0)

    done()
  })

  afterAll(async done => {
    done()
  })
})
