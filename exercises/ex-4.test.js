import { Shop } from '../../src/stores/Shop'
import { Product as Prod } from '../../src/stores/Product'
import { isObservableArray } from 'mobx'
import Product from '../../src/components/Product'
import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'mobx-react'
import { MemoryRouter } from 'react-router-dom'

const data = require('../../src/utils/data.json')
configure({ adapter: new Adapter() })


let shopStore
describe("exercise4", () => {
    beforeEach(() => {
        try {
            shopStore = new Shop()
        } catch (e) {
            shopStore = {}
        }
    })
    it(`The Shop store should have a 'cart' property which is initialized to an empty array.`, () => {
        expect(shopStore.cart, `The 'cart' property in the Shop store must be an empty array ([]), instead its' value was ${shopStore.products}.`).toEqual([])
        expect(isObservableArray(shopStore.cart), `The 'cart' property was not an 'observable'. The 'cart' property in the Shop store must be an 'observable' because we must track changes that occur to it.`).toBeTruthy()
    })
    it(`The Shop store should have an 'addToCart' method which receives an 'id' as a paramter and adds that product to the cart. The method should be a MobX 'action'.`, () => {
        if (shopStore.addToCart) {
            expect(shopStore.addToCart.isMobxAction, `The 'addToCart' method should be a MobX 'action' because it changes an 'observable' property. The 'addToCart' method which was found was not a MobX 'action'.`).toBeTruthy()

            const expectedCart = []

            let item, hasError = false
            try {
                shopStore.products = data.map(d => new Prod(d.id, d.name, d.img, d.price, d.likes))
                item = new Prod(data[0].id, data[0].name, data[0].img, data[0].price, data[0].likes)
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, `The code you submitted is crashing. Please check things like syntax and try again. Additionally, make sure you are using the correct decorators.`).toBeTruthy()
            } else {
                expectedCart.push({ item, quantity: 1 })
                shopStore.addToCart(item.id)
                expect(shopStore.cart.length, `After invoking the 'addToCart' method with 'id' ${item.id}, the length of 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
                expect(shopStore.cart, `After invoking the 'addToCart' method with 'id' ${item.id}, the 'cart' array should look like this: ${JSON.stringify(expectedCart)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
                expect(shopStore.cart[0].item instanceof Prod, `The products that were added to the 'cart' where not instances of the Prodcut class. Make sure that you are only working with instances of the Product class.`).toBeTruthy()

                const firstId = item.id
                item = new Prod(data[1].id, data[1].name, data[1].img, data[1].price, data[1].likes)
                expectedCart.push({ item, quantity: 2 })
                shopStore.addToCart(item.id)
                shopStore.addToCart(item.id)
                expect(shopStore.cart.length, `After invoking the 'addToCart' method with 'id' ${firstId} once, and invoking it again with 'id' ${item.id} twice, the length of 'cart' should be ${expectedCart.length}, but instead it was ${shopStore.cart.length}.`).toBe(expectedCart.length)
                expect(shopStore.cart, `After invoking the 'addToCart' method with 'id' ${firstId} once, and invoking it again with 'id' ${item.id} twice, the 'cart' array should look like this: ${JSON.stringify(expectedCart.length)}. Instead it looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
                expect(shopStore.cart[1].item instanceof Prod, `The products that were added to the 'cart' where not instances of the Prodcut class. Make sure that you are only working with instances of the Product class.`).toBeTruthy()
            }
        } else {
            expect(shopStore.addToCart, `Could not find an 'addToCart' method in the Shop store.`).toBeDefined()
        }

    })
    it(`You should add your 'Shop' state from MobX into the 'Product' component. In the component's 'addToCart' method, you should access the store correctly and invoke its' 'addToCart' method with the product id.`, () => {
        shopStore.cart = []

        let hasError = false
        try {
            shopStore.products = data.map(d => new Prod(d.id, d.name, d.img, d.price, d.likes))
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The code you submitted is crashing. Please check things like syntax and try again. Additionally, make sure you are using the correct decorators.`).toBeTruthy()
        } else {
            const productToDisplay = shopStore.products.find(p => p.id === 1)

            const stores = { shopStore }
            let wrapper
            hasError = false
            try {
                wrapper = mount(
                    <Provider {...stores}>
                        <MemoryRouter>
                            <Product product={productToDisplay} />
                        </MemoryRouter>
                    </Provider>
                )
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
            } else {
                const expectedCart = [{ item: productToDisplay, quantity: 1 }]
                wrapper.find('.add-to-cart').simulate('click')
                expect(shopStore.cart.length, `When clicking the 'add to cart' button for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should have a length of ${expectedCart.length} but instead it had length of ${shopStore.cart.length}. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking it's add to cart method with the product's id (the product is already declared for you).`).toBe(expectedCart.length)
                expect(shopStore.cart, `When clicking the 'add to cart' button for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should look like this: ${JSON.stringify(expectedCart)}, but instead is looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)

                expectedCart[0].quantity++
                wrapper.find('.add-to-cart').simulate('click')
                expect(shopStore.cart.length, `When clicking the 'add to cart' button twice for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should have a length of ${expectedCart.length} but instead it had length of ${shopStore.cart.length}. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking it's add to cart method with the product's id (the product is already declared for you).`).toBe(expectedCart.length)
                expect(shopStore.cart, `When clicking the 'add to cart' button twice for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should look like this: ${JSON.stringify(expectedCart)}, but instead is looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
            }
        }
    })
    it(`You should add your 'Shop' state from MobX into the 'Product' component. In the component's 'likeProduct' method, you should invoke the 'product's 'likeProduct' method. Note: the product variable is already declared for you.`, () => {
        let hasError = false
        try {
            shopStore.products = data.map(d => new Prod(d.id, d.name, d.img, d.price, d.likes))
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The code you submitted is crashing. Please check things like syntax and try again. Additionally, make sure you are using the correct decorators.`).toBeTruthy()
        } else {
            const productToDisplay = shopStore.products.find(p => p.id === 1)

            const stores = { shopStore }
            let wrapper
            hasError = false
            try {
                wrapper = mount(
                    <Provider {...stores}>
                        <MemoryRouter>
                            <Product product={productToDisplay} />
                        </MemoryRouter>
                    </Provider>
                )
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
            } else {
                const initialProductLikes = productToDisplay.likes
                wrapper.find('.like-button').simulate('click')
                expect(productToDisplay.likes, `When clicking the 'like product (+)' button for the ${productToDisplay.name} product, it is not increasing it's likes correctly. The product should have likes of ${initialProductLikes + 1}, but instead had ${productToDisplay.likes} likes. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking the product's 'likeProduct' method correctly (in the component's 'likeProduct' method).`).toBe(initialProductLikes + 1)

                wrapper.find('.like-button').simulate('click')
                expect(productToDisplay.likes, `When clicking the 'like product (+)' button twice for the ${productToDisplay.name} product, it is not increasing it's likes correctly. The product should have likes of ${initialProductLikes + 2}, but instead had ${productToDisplay.likes} likes. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking the product's 'likeProduct' method correctly (in the component's 'likeProduct' method).`).toBe(initialProductLikes + 2)
            }
        }
    })
})