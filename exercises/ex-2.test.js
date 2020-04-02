const $ = require('cheerio')
const path = require('path')

describe('exercise-2', () => {
  beforeAll(async () => {
    jest.setTimeout(30000)
    await page.goto('file://' + path.join(__dirname, '..', '..', 'src', 'index.html'))
  })

  it(`If the user enters an invalid breed, you should append a 'p' element to the 'div' with id 'result' letting the user know the breed was 'not found'.`, async function (done) {
    let html = await page.content()
    let pElem = $('#result p', html)
    expect(pElem.length, `There was a 'p' element in the 'div' with id 'result' before initiating the search. Make sure to make the API request only when the user clicks the search button and append the error message only when there is an error`).toBe(0)

    let searchValue
    try {
      searchValue = 'h'
      await page.evaluate((searchValue) => {
        document.querySelector('#breed-input').value = searchValue
      }, searchValue)
      await page.click('#search')
      await page.waitFor(4000)
      html = await page.content()
    } catch (e) {
      expect(false, `Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.`).toBeTruthy()
    }

    let text
    try {
      text = $('#result p', html).text().toLowerCase()
    } catch (e) {
      text = null
    }

    if (text) {
      let includesErrorText = false
      if (text.includes('not') && text.includes('found')) { includesErrorText = true }

      expect(includesErrorText, `The 'p' element did not have an error message inside when searching for an invalid input such as '${searchValue}', make sure to add a 'p' element with the message "Breed not found - try again" to the 'div' with id 'result' if there is an 'error' with the API request`).toBeTruthy()
      done()
    } else {
      expect(false, `There was no 'p' in the 'div' with id 'result' after the API request was made. Please append a 'p' with the correct text to the 'result' 'div' after the error occurs`).toBeTruthy()
      done()
    }
  })

  afterAll(async done => {
    done()
  })
})