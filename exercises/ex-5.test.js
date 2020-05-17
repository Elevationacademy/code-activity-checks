import { Shop } from '../../src/stores/Shop'
import { Product } from '../../src/stores/Product'
import { isComputedProp } from 'mobx'
import Navbar from '../../src/components/Navbar'
import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'mobx-react'
import { MemoryRouter } from 'react-router-dom'

const data = require('../../src/utils/data.json')
configure({ adapter: new Adapter() })

let shopStore
describe("exercise5", () => {
    beforeEach(() => {
        shopStore = new Shop()
    })
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
    it(`You should add your 'Shop' state from MobX into the 'Navbar' component. You should also access the state correctly and assign the 'shopStore' variable on line 12 with the 'injected' 'shopStore'.`, () => {
        const stores = { shopStore }
        shopStore.products = data.map(d => new Product(d.id, d.name, d.img, d.price, d.likes))
        const item1 = new Product(data[0].id, data[0].name, data[0].img, data[0].price, data[0].likes)
        const item2 = new Product(data[1].id, data[1].name, data[1].img, data[1].price, data[1].likes)
        shopStore.cart = [{ item: item1, quantity: 1 }, { item: item2, quantity: 2 }]

        let wrapper, hasError = false
        try {
            wrapper = mount(
                <Provider {...stores}>
                    <MemoryRouter>
                        <Navbar />
                    </MemoryRouter>
                </Provider>
            )
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
        } else {
            const cartTotal = shopStore.cart.reduce((acc, cur) => acc + cur.item.price * cur.quantity, 0)
            const cartInfo = wrapper.find('#cart-info').first()
            expect(cartInfo.text().includes('3'), `The 'Navbar' component is not accessing the 'Shop' store correctly. . Make sure that that your component 'observes' state, the store is 'injected' to the component, you are accessing the injected store correctly through props, and that you are assigning the 'shopStore' to the 'shopStore' variable on line 12.`).toBeTruthy()
            expect(cartInfo.text().includes(`${cartTotal}`), `The 'Navbar' component is not accessing the 'Shop' store correctly. . Make sure that that your component 'observes' state, the store is 'injected' to the component, you are accessing the injected store correctly through props, and that you are assigning the 'shopStore' to the 'shopStore' variable on line 12.`).toBeTruthy()
        }
    })
})