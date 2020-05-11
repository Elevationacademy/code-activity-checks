import { Shop } from '../../src/stores/Shop'
import { Product } from '../../src/stores/Product'
import { isComputedProp, isObservableArray } from 'mobx'

const data = require('../../src/utils/data.json')

let shopStore
describe("exercise4", () => {
    beforeEach(() => {
        shopStore = new Shop()
    })
    it(`The Shop store should have a 'cart' property which is initialized to an empty array.`, () => {
        expect(shopStore.cart, `The 'cart' property in the Shop store must be an empty array ([]), instead its' value was ${shopStore.products}.`).toEqual([])
        expect(isObservableArray(shopStore.cart), `The 'cart' property was not an 'observable'. The 'cart' property in the Shop store must be an 'observable' because we must track changes that occur to it.`).toBeTruthy()
    })
    it(`The Shop store should have an 'addToCart' method which receives an 'id' as a paramter and adds that product to the cart. The method should be a MobX 'action'.`, () => {
        if (shopStore.addToCart) {
            expect(shopStore.addToCart.isMobxAction, `The 'addToCart' method should be a MobX 'action' because it changes an 'observable' property. The 'addToCart' method which was found was not a MobX 'action'.`).toBeTruthy()

            const expectedCart = []
            shopStore.products = data.map(d => new Product(d.id, d.name, d.img, d.price, d.likes))

            let item = new Product(data[0].id, data[0].name, data[0].img, data[0].price, data[0].likes)
            expectedCart.push({ item, quantity: 1 })
            shopStore.addToCart(item.id)
            expect(shopStore.cart.length, `After invoking the 'addToCart' method with 'id' ${item.id}, the length of 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
            expect(shopStore.cart, `After invoking the 'addToCart' method with 'id' ${item.id}, the 'cart' array should look like this: ${JSON.stringify(expectedCart)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
            expect(shopStore.cart[0].item instanceof Product, `The products that were added to the 'cart' where not instances of the Prodcut class. Make sure that you are only working with instances of the Product class.`).toBeTruthy()

            const firstId = item.id
            item = new Product(data[1].id, data[1].name, data[1].img, data[1].price, data[1].likes)
            expectedCart.push({ item, quantity: 2 })
            shopStore.addToCart(item.id)
            shopStore.addToCart(item.id)
            expect(shopStore.cart.length, `After invoking the 'addToCart' method with 'id' ${firstId} once, and invoking it again with 'id' ${item.id} twice, the length of 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
            expect(shopStore.cart, `After invoking the 'addToCart' method with 'id' ${firstId} once, and invoking it again with 'id' ${item.id} twice, the 'cart' array should look like this: ${JSON.stringify(expectedCart.length)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
            expect(shopStore.cart[1].item instanceof Product, `The products that were added to the 'cart' where not instances of the Prodcut class. Make sure that you are only working with instances of the Product class.`).toBeTruthy()
        } else {
            expect(shopStore.addToCart, `Could not find an 'addToCart' method in the Shop store.`).toBeDefined()
        }
    })
    it(`The Shop store should have a 'deleteFromCart' method which receives an 'id' as a paramter and deletes that product from the cart. The method should be a MobX 'action'.`, () => {
        if (shopStore.deleteFromCart) {
            expect(shopStore.deleteFromCart.isMobxAction, `The 'deleteFromCart' method should be a MobX 'action' because it changes an 'observable' property. The 'deleteFromCart' method which was found was not a MobX 'action'.`).toBeTruthy()

            const item1 = new Product(data[0].id, data[0].name, data[0].img, data[0].price, data[0].likes)
            const item2 = new Product(data[1].id, data[1].name, data[1].img, data[1].price, data[1].likes)
            shopStore.cart = [{ item: item1, quantity: 1 }, { item: item2, quantity: 2 }]

            let expectedCart = [{ item: item1, quantity: 1 }, { item: item2, quantity: 1 }]
            shopStore.deleteFromCart(item2.id)
            expect(shopStore.cart.length, `After adding 1 ${item1.name} and 2 ${item2.name} to the cart and then invoking 'deleteFromCart' with the 'id' ${item2.id}, the length of the 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
            expect(shopStore.cart, `After adding 1 ${item1.name} and 2 ${item2.name} to the cart and then invoking 'deleteFromCart' with the 'id' ${item2.id}, the 'cart' should look like this: ${JSON.stringify(expectedCart)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)

            expectedCart = [{ item: item2, quantity: 1 }]
            shopStore.deleteFromCart(item1.id)
            expect(shopStore.cart.length, `We added 1 ${item1.name} and 2 ${item2.name} to the cart. Then we invoked 'deleteFromCart' with the 'id' ${item2.id}, and then inoked it again with 'id' ${item1.id}. After these actions, the length of the 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
            expect(shopStore.cart, `We added 1 ${item1.name} and 2 ${item2.name} to the cart. Then we invoked 'deleteFromCart' with the 'id' ${item2.id}, and then inoked it again with 'id' ${item1.id}. After these actions, the 'cart' should look like this: ${JSON.stringify(expectedCart)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)

            expectedCart = []
            shopStore.deleteFromCart(item2.id)
            expect(shopStore.cart.length, `We added 1 ${item1.name} and 2 ${item2.name} to the cart. Then we invoked 'deleteFromCart' with the 'id' ${item2.id}, and then inoked it again with 'id' ${item1.id}, and again with 'id' ${item2.id}. After these actions, the length of the 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
            expect(shopStore.cart, `We added 1 ${item1.name} and 2 ${item2.name} to the cart. Then we invoked 'deleteFromCart' with the 'id' ${item2.id}, and then inoked it again with 'id' ${item1.id}, and again with 'id' ${item2.id}. After these actions, the 'cart' should look like this: ${JSON.stringify(expectedCart)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
        } else {
            expect(shopStore.deleteFromCart, `Could not find an 'deleteFromCart' method in the Shop store.`).toBeDefined()
        }
    })
    //
    it(`The Shop store should have a 'computed' property called 'cartQuantity'.`, () => {
        if (shopStore.cartQuantity !== undefined) {
            expect(isComputedProp(shopStore, 'cartQuantity'), `The 'cartQuantity' property/method should be a MobX 'computed' property. The 'cartQuantity' property/method which was found was not a MobX 'computed' property. Make sure you use the 'computed' decorator and the method is a 'get'ter.`).toBeTruthy()

            expect(shopStore.cartQuantity, `When the 'cart' is empty, 'cartQuantity' should return 0, instead it return ${shopStore.cartQuantity}.`).toBe(0)

            shopStore.cart.push({ item: data[0], quantity: 1 })
            expect(shopStore.cartQuantity, `After adding 1 ${data[0].name} product to the 'cart', 'cartQuantity' should return 1, instead it returned ${shopStore.cartQuantity}.`).toBe(1)

            shopStore.cart.push({ item: data[2], quantity: 2 })
            expect(shopStore.cartQuantity, `After adding 1 ${data[0].name} product  and 2 ${data[2].name} products to the 'cart', 'cartQuantity' should return 3, instead it returned ${shopStore.cartQuantity}.`).toBe(3)
        } else {
            expect(shopStore.cartQuantity, `Could not find a 'cartQuantity' 'computed' property in the Shop store.`).toBeDefined()
        }
    })
    it(`The Shop store should have a 'computed' property called 'cartTotal'.`, () => {
        if (shopStore.cartTotal !== undefined) {
            expect(isComputedProp(shopStore, 'cartTotal'), `The 'cartTotal' property/method should be a MobX 'computed' property. The 'cartTotal' property/method which was found was not a MobX 'computed' property. Make sure you use the 'computed' decorator and the method is a 'get'ter.`).toBeTruthy()

            expect(shopStore.cartTotal, `When the 'cart' is empty, 'cartTotal' should return 0, instead it return ${shopStore.cartTotal}.`).toBe(0)

            shopStore.cart.push({ item: data[0], quantity: 1 })
            expect(shopStore.cartTotal, `After adding 1 product with price ${data[0].price} to the 'cart', 'cartTotal' should return ${data[0].price}, instead it returned ${shopStore.cartTotal}.`).toBe(data[0].price)

            shopStore.cart.push({ item: data[2], quantity: 2 })
            const total = data[0].price + data[2].price * 2
            expect(shopStore.cartTotal, `After adding 1 product with price ${data[0].price} and 2 products with price ${data[2].price} to the 'cart', 'cartTotal' should return ${total}, instead it returned ${shopStore.cartTotal}.`).toBe(total)
        } else {
            expect(shopStore.cartTotal, `Could not find a 'cartTotal' 'computed' property in the Shop store.`).toBeDefined()
        }
    })
})