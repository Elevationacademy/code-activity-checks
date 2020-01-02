const $ = require('cheerio')
const path = require('path')

const selectElements = function (html) {
  const firstPost = $('.todo', html)[0].attribs
  return firstPost
}


describe('exercise-2', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  })

  // it(`Should calculate the amount of 'box'es on the web page and add the number as a p to the div with an id of 'total`, async function (done) {
  //   await page.click('#calc-total')
  //   const html = await page.content()
  //   const boxes = $('.box', html)
  //   const paragraphs = $('#total p', html)

  //   const total = paragraphs[paragraphs.length - 1].children[0].data
  //   expect(boxes.length, `could not find any elements with a class of 'box' on the web page`).toBe(parseInt(total))

  //   done()
  // })

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

    await page.click('#calc-total')
    const html = await page.content()
    const boxes = $('.box', html)
    const paragraphs = $('#total p', html)

    const total = paragraphs[paragraphs.length - 1].children[0].data
    expect(total, `when adding ${numDivs} divs to the web page the total that is found is ${total} instead of ${numDivs}`).toBe(`${numDivs}`)
    done()
  })

  afterAll(async done => {
    done()
  })
})