import { Shop } from '../../src/stores/Shop'
import { Product } from '../../src/stores/Product'
import { isComputedProp, isObservableArray } from 'mobx'

const data = require('../../src/utils/data.json')

let shopStore
describe("exercise2", () => {
    beforeEach(()=> {
        shopStore = new Shop()
    })
    it(`The Shop store should have a 'products' property which is initialized to an empty array.`, () => {
        expect(shopStore.products, `The 'products' property in the Shop store must be an empty array ([]), instead its' value was ${shopStore.products}`).toEqual([])
        expect(isObservableArray(shopStore.products), `The 'products' property was not an 'observable'. The 'products' property in the Shop store must be an 'observable' because we must track changes that occur to it.`).toBeTruthy()
    })
    it(`The Shop store should have a 'getProducts' method and it should be a MobX 'action'.`, () => {
        if (shopStore.getProducts) {
            expect(shopStore.getProducts.isMobxAction, `The 'getProducts' method should be a MobX 'action' because it changes an 'observable' property. The 'getProducts' method which was found was not a MobX 'action'.`).toBeTruthy()

            shopStore.getProducts()
            expect(shopStore.products.length, `After invoking the 'getProducts method in the Shop store, the 'products' array in the Shop store should have length of ${data.length}, but instead it had length of ${shopStore.products.length}`).toBe(data.length)
            expect(shopStore.products, `After invoking the 'getProducts method in the Shop store, the 'products' array in the Shop store should have look like this: ${JSON.stringify(data)}. Instead it looked like this: ${JSON.stringify(shopStore.products)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(data)
            expect(shopStore.products[0] instanceof Product, `The products in the 'products' array after invoking the 'getProducts' method should be instances of the Product store. When checking the 'products' array, the elements were not instances of the Product store.`).toBeTruthy()
        } else {
            expect(shopStore.getProducts, `Could not find a 'getProducts' method in the Shop store.`).toBeDefined()
        }
    })
    it(`The Shop store should have a 'findProductById' method which receives an 'id' as a parameter and return the product with the given id.`, () => {
        if (shopStore.findProductById) {
            expect(shopStore.findProductById.isMobxAction, `When running the code, we found that your 'findProductById' method was a MobX 'action'. The 'findProductById' method should not be a MobX 'action' because it is not changing an 'observable'.`).toBeFalsy()

            shopStore.products = data.map(d => new Product(d.id, d.name, d.img, d.price, d.likes))
            for (let product of data) {
                const { id, name, img, price, likes } = product
                const expectedProduct = new Product(id, name, img, price, likes)
                const productReceived = shopStore.findProductById(expectedProduct.id)

                expect(productReceived, `When invoking the 'findProductById' method with the 'id' ${id}, we should have received the following product: ${JSON.stringify(expectedProduct)}. Instead we received: ${JSON.stringify(productReceived)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedProduct)
                expect(productReceived instanceof Product, `The product received when invoking the 'findProductById' method with 'id' ${id} was not an instance of the Product class. Make sure you every product in your products array is an instance of the Product class.`).toBeTruthy()
            }
        } else {
            expect(shopStore.findProductById, `Could not find a 'findProductById' method in the Shop store.`).toBeDefined()
        }
    })
    it(`The Shop store should have a 'computed' property called 'isProductsPopulated'.`, () => {
        if (shopStore.isProductsPopulated !== undefined) {
            expect(isComputedProp(shopStore, 'isProductsPopulated'), `The 'isProductsPopulated' property/method should be a MobX 'computed' property. The 'isProductsPopulated' property/method which was found was not a MobX 'computed' property. Make sure you use the 'computed' decorator and the method is a 'get'ter.`).toBeTruthy()

            expect(shopStore.isProductsPopulated, `When the 'products' array is empty, the 'isProductsPopulated' property should return 'false', instead it returned ${shopStore.isProductsPopulated}.`).toBeFalsy()

            shopStore.products = data.map(d => new Product(d.id, d.name, d.img, d.price, d.likes))
            expect(shopStore.isProductsPopulated, `After adding products to the 'products' array, the 'isProductsPopulated' property should return 'true', instead it returned ${shopStore.isProductsPopulated}.`).toBeTruthy()
        } else {
            expect(shopStore.isProductsPopulated, `Could not find a 'isProductsPopulated' 'computed' property in the Shop store.`).toBeDefined()
        }
    })
})