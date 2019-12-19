const puppeteer = require('puppeteer')
const $ = require('cheerio')
const path = require('path')

const selectElements = function (html) {
  const firstPost = $('.todo', html)[0].attribs
  return firstPost
}

const getHtml = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))

  const html = await page.content()
  return html
}

beforeAll(done => {
  done()
})

describe('exercise-1', () => {
  it('Should create an `enqueue` method which adds a new element to the end of the queue', async function (done) {
    const html = await getHtml()
    const id = selectElements(html)['data-id']

    expect(id, `when enqueueing 1 to the queue, the length of the queue should be 1`).toBe('0')
    done()
  })
})

afterAll(async done => {
  done()
})