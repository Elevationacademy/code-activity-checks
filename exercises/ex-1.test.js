
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Product } from '../../src/stores/Product'
import { isComputedProp, isObservableProp } from 'mobx'

const data = require('../../src/utils/data.json')

configure({ adapter: new Adapter() })

let product, productToAdd
describe("exercise1", () => {
    beforeAll(() => {
        productToAdd = data[0]
        product = new Product(productToAdd.id, productToAdd.name, productToAdd.img, productToAdd.price, productToAdd.likes)
    })
    it(`You must create a 'Product' store with the following properties: 'id', 'name', 'img', 'price', 'likes'. Since we need to track changes in 'likes' and 'price', those properties must be 'observable'.`, () => {
        expect(product.id, `The Product's 'id' property was not created properly. Expected the 'id' to be ${productToAdd.id}, instead it was ${product.id}.`).toBe(productToAdd.id)
        expect(product.name, `The Product's 'name' property was not created properly. Expected the 'name' to be ${productToAdd.name}, instead it was ${product.name}.`).toBe(productToAdd.name)
        expect(product.img, `The Product's 'img' property was not created properly. Expected the 'img' to be ${productToAdd.img}, instead it was ${product.img}.`).toBe(productToAdd.img)
        expect(product.price, `The Product's 'price' property was not created properly. Expected the 'price' to be ${productToAdd.price}, instead it was ${product.price}.`).toBe(productToAdd.price)
        expect(product.likes, `The Product's 'likes' property was not created properly. Expected the 'likes' to be ${productToAdd.likes}, instead it was ${product.likes}.`).toBe(productToAdd.likes)
    })
    it(`Any property that you would like to track changes in its' value should be an 'observable'.`, () => {
        expect(isObservableProp(product, 'id'), `The Product's 'id' property should not be an observable property since it will typically not change.`).toBeFalsy()
        expect(isObservableProp(product, 'name'), `The Product's 'name' property should not be an observable property since it will typically not change.`).toBeFalsy()
        expect(isObservableProp(product, 'img'), `The Product's 'img' property should not be an observable property since it will typically not change.`).toBeFalsy()
        expect(isObservableProp(product, 'price'), `The Product's 'price' property must be an observable property since we need to listen to changes in its' value.`).toBeTruthy()
        expect(isObservableProp(product, 'likes'), `The Product's 'likes' property must be an observable property since we need to listen to changes in its' value.`).toBeTruthy()
    })
    it(`The Product store should have a 'likeProduct' method which increases the 'likes' property by 1.`, () => {
        if (product.likeProduct) {
            expect(product.likeProduct.isMobxAction, `The 'likeProduct' method should be a MobX 'action' because it changes an 'observable' property. The 'likeProdcut' method which was found was not a MobX 'action'.`).toBeTruthy()

            const originalLikes = product.likes
            const randomNum = Math.floor(Math.random() * 10)
            for (let i = 0; i < randomNum; i++) {
                product.likeProduct()
            }
            expect(product.likes, `The product with 'id' ${product.id} originally had ${originalLikes} likes. When invoking the 'likeProduct' method ${randomNum} times, the number of likes on the product should have been ${productToAdd.likes + randomNum}, instead it was ${product.likes}.`).toBe(productToAdd.likes + randomNum)
        } else {
            expect(product.likeProduct, `Could not find a 'likeProduct' method in the Product store.`).toBeDefined()
        }
    })

    it(`The Product store should have a 'computed' property called 'onSale'.`, () => {
        if (product.onSale !== undefined) {
            expect(isComputedProp(product, 'onSale'), `The 'onSale' property/method should be a MobX 'computed' property. The 'onSale' property/method which was found was not a MobX 'computed' property. Make sure you use the 'computed' decorator and the method is a 'get'ter.`).toBeTruthy()

            product.price = 110
            expect(product.onSale, `When the product's price is ${product.price}, 'onSale' should return 'true'.`).toBeTruthy()

            product.price = 10
            expect(product.onSale, `When the product's price is ${product.price}, 'onSale' should return 'false'.`).toBeFalsy()
        } else {
            expect(product.onSale, `Could not find an 'onSale' 'computed' property in the Product store.`).toBeDefined()
        }
    })
})
