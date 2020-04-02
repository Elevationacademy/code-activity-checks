const $ = require('cheerio')
const path = require('path')

describe('exercise-1', () => {
  beforeAll(async () => {
    jest.setTimeout(30000)
    await jestPuppeteer.resetBrowser()
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  })

  it(`When clicking on the 'Search' button, you should make an API request to the Dog API with the breed from the input`, async function (done) {
    let html = await page.content()
    let imgElem = $('#result img', html)
    expect(imgElem.length, `There was an image in the 'div' with id 'result' before initiating the search. Make sure to make the API request only when the user clicks the search button and append the image when the response from the API is received`).toBe(0)

    let searchValue
    try {
      searchValue = 'hound'
      await page.evaluate((searchValue) => {
        document.querySelector('#breed-input').value = searchValue
      }, searchValue)
      await page.click('#search')
      await page.waitFor(4000)
      html = await page.content()
    } catch (e) {
      expect(false, `Hmm, seems like you're error handling isn't working. Please make sure you are not using try/catch. You should be using the jQuery ajax method and passing an 'error' callback`).toBeTruthy()
    }

    let src
    try {
      src = $('#result img', html).attr('src').toLowerCase()
    } catch (e) {
      src = null
    }

    if (src) {
      let isImage = false
      const imageExtensions = ['.jpg', '.jpeg', 'png']
      imageExtensions.forEach(e => {
        if (src.includes(e)) { isImage = true }
      })

      expect(isImage, `The 'src' attribute of the 'img' tag was not a valid image when searching for '${searchValue}', make sure to add the image link from the API response to the 'src' attribute of the 'img'`).toBeTruthy()
      done()
    } else {
      expect(false, `There was no image in the 'div' with id 'result' after the API request was made. Please append an image with the correct 'src' attribute to the 'result' 'div' after the response from the API is received`).toBeTruthy()
      done()
    }
  })

  afterAll(async done => {
    done()
  })
})