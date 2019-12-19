const $ = require('cheerio')
const path = require('path')

const selectElements = function (html) {
  const firstPost = $('.todo', html)[0].attribs
  return firstPost
}

// const getHtml = async function () {
//   await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))

//   const html = await page.content()
//   return html
// }


describe('exercise-1', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  })

  it('Should create an `enqueue` method which adds a new element to the end of the queue', async function (done) {
    const html = await page.content()
    const id = selectElements(html)['data-id']
    // const firstPost = page.$('.todo')[0].attribs['data-id']


    expect(id, `when enqueueing 1 to the queue, the length of the queue should be 1`).toBe('0')
    done()
  })

  afterAll(async done => {
    done()
  })
})
