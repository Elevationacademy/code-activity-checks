import { Shop } from '../../src/stores/Shop'
import { Product } from '../../src/stores/Product'
import { isComputedProp } from 'mobx'
import Cart from '../../src/components/Cart'
import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'mobx-react'
import { MemoryRouter } from 'react-router-dom'
import CartItem from '../../src/components/CartItem'

const data = require('../../src/utils/data.json')
configure({ adapter: new Adapter() })

let shopStore
describe("exercise6", () => {
    beforeEach(() => {
        shopStore = new Shop()
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
    it(`You should add your 'Shop' state from MobX into the 'Cart' component. You should also access the state correctly and assign the 'shopStore' variable on line 11 with the 'injected' 'shopStore'.`, () => {
        const stores = { shopStore }
        const item1 = new Product(data[0].id, data[0].name, data[0].img, data[0].price, data[0].likes)
        const item2 = new Product(data[1].id, data[1].name, data[1].img, data[1].price, data[1].likes)
        shopStore.cart = [{ item: item1, quantity: 1 }, { item: item2, quantity: 2 }]

        const wrapper = mount(
            <Provider {...stores}>
                <Cart />
            </Provider>
        )
        const cartItems = wrapper.find('.cart-item')
        expect(cartItems.length, `The cart page is rendering ${cartItems.length} cart items when is should be rendering ${shopStore.cart.length} cart items. Make sure that that your component 'observes' state, the store is 'injected' to the component, and that you are accessing the injected store correctly through props.`).toBe(shopStore.cart.length)
    })
    it(`You should add your 'Shop' state from MobX into the 'CartItem' component. In the component's 'addToCart' method, you should access the store correctly and invoke its' 'addToCart' method with the product id.`, () => {
        shopStore.products = data.map(d => new Product(d.id, d.name, d.img, d.price, d.likes))
        const productToDisplay = shopStore.products.find(p => p.id === 1)
        const cartItem = { item: productToDisplay, quantity: 1 }

        const stores = { shopStore }
        let wrapper, hasError = false
        try {
            wrapper = mount(
                <Provider {...stores}>
                    <MemoryRouter>
                        <CartItem product={cartItem} />
                    </MemoryRouter>
                </Provider>
            )
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
        } else {
            const expectedCart = [cartItem]
            wrapper.find('.add-to-cart').simulate('click')
            expect(shopStore.cart.length, `When clicking the 'add to cart' button for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should have a length of ${expectedCart.length} but instead it had length of ${shopStore.cart.length}. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking it's add to cart method with the product's id (the product is already declared for you).`).toBe(expectedCart.length)
            expect(shopStore.cart, `When clicking the 'add to cart' button for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should look like this: ${JSON.stringify(expectedCart)}, but instead is looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)

            cartItem.quantity++
            wrapper.find('.add-to-cart').simulate('click')
            expect(shopStore.cart.length, `When clicking the 'add to cart' button twice for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should have a length of ${expectedCart.length} but instead it had length of ${shopStore.cart.length}. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking it's add to cart method with the product's id (the product is already declared for you).`).toBe(expectedCart.length)
            expect(shopStore.cart, `When clicking the 'add to cart' button twice for the ${productToDisplay.name} product, it is not being added to cart correctly. The cart should look like this: ${JSON.stringify(expectedCart)}, but instead is looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
        }
    })
    it(`You should add your 'Shop' state from MobX into the 'CartItem' component. In the component's 'deleteFromCart' method, you should access the store correctly and invoke its' 'deleteFromCart' method with the product id.`, () => {
        shopStore.products = data.map(d => new Product(d.id, d.name, d.img, d.price, d.likes))
        const productToDisplay = shopStore.products.find(p => p.id === 1)
        shopStore.cart = [{ item: productToDisplay, quantity: 2 }]
        const cartItem = { item: productToDisplay, quantity: 1 }

        const stores = { shopStore }
        let wrapper, hasError = false
        try {
            wrapper = mount(
                <Provider {...stores}>
                    <MemoryRouter>
                        <CartItem product={cartItem} />
                    </MemoryRouter>
                </Provider>
            )
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
        } else {
            const expectedCart = [cartItem]
            wrapper.find('.delete-from-cart').simulate('click')
            expect(shopStore.cart.length, `We added the ${productToDisplay.name} product to the cart twice. Then, when clicking the 'delete from cart' button for the ${productToDisplay.name} product, it is not being deleted from the cart correctly. The cart should have a length of ${expectedCart.length} but instead it had length of ${shopStore.cart.length}. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking it's delete from cart method with the product's id (the product is already declared for you).`).toBe(expectedCart.length)
            expect(shopStore.cart, `We added the ${productToDisplay.name} product to the cart twice. Then, when clicking the 'delete from cart' button for the ${productToDisplay.name} product, it is not being deleted from the cart correctly. The cart should look like this: ${JSON.stringify(expectedCart)}, but instead is looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)

            expectedCart.splice(0)
            wrapper.find('.delete-from-cart').simulate('click')
            expect(shopStore.cart.length, `We added the ${productToDisplay.name} product to the cart twice. Then, when clicking the 'delete from cart' button  twice for the ${productToDisplay.name} product, it is not being deleted from the cart correctly. The cart should have a length of ${expectedCart.length} but instead it had length of ${shopStore.cart.length}. Make sure you are 'inject'ing the 'shopStore', accessing it correctly, and invoking it's delete from cart method with the product's id (the product is already declared for you).`).toBe(expectedCart.length)
            expect(shopStore.cart, `We added the ${productToDisplay.name} product to the cart twice. Then, when clicking the 'delete from cart' button twice for the ${productToDisplay.name} product, it is not being deleted from the cart correctly. The cart should look like this: ${JSON.stringify(expectedCart)}, but instead is looked like this: ${JSON.stringify(shopStore.cart)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedCart)
        }
    })
})