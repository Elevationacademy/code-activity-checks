import { Shop } from '../../src/stores/Shop'
import { Product } from '../../src/stores/Product'
import { isObservableArray } from 'mobx'
import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../../src/App'
import { Provider } from 'mobx-react'


const data = require('../../src/utils/data.json')
configure({ adapter: new Adapter() })

let shopStore
describe("exercise2", () => {
    beforeEach(() => {
        try {
            shopStore = new Shop()
        } catch (e) {
            shopStore = {}
        }
    })
    it(`The Shop store should have a 'products' property which is initialized to an empty array.`, () => {
        expect(shopStore.products, `The 'products' property in the Shop store must be an empty array ([]), instead its' value was ${shopStore.products}`).toEqual([])
        expect(isObservableArray(shopStore.products), `The 'products' property was not an 'observable'. The 'products' property in the Shop store must be an 'observable' because we must track changes that occur to it.`).toBeTruthy()
    })
    it(`The Shop store should have a 'getProducts' method and it should be a MobX 'action'.`, () => {
        if (shopStore.getProducts) {
            expect(shopStore.getProducts.isMobxAction, `The 'getProducts' method should be a MobX 'action' because it changes an 'observable' property. The 'getProducts' method which was found was not a MobX 'action'.`).toBeTruthy()

            let hasError = false
            try {
                shopStore.getProducts()
            } catch (e) {
                hasError = true
            }

            if (hasError) {
                expect(false, `The code you submitted is crashing. Please check things like syntax and try again. Additionally, make sure you are using the correct decorators.`).toBeTruthy()
            } else {
            expect(shopStore.products.length, `After invoking the 'getProducts method in the Shop store, the 'products' array in the Shop store should have length of ${data.length}, but instead it had length of ${shopStore.products.length}`).toBe(data.length)
            expect(shopStore.products, `After invoking the 'getProducts method in the Shop store, the 'products' array in the Shop store should have look like this: ${JSON.stringify(data)}. Instead it looked like this: ${JSON.stringify(shopStore.products)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(data)
            expect(shopStore.products[0] instanceof Product, `The products in the 'products' array after invoking the 'getProducts' method should be instances of the Product store. When checking the 'products' array, the elements were not instances of the Product store.`).toBeTruthy()
            }
        } else {
            expect(shopStore.getProducts, `Could not find a 'getProducts' method in the Shop store.`).toBeDefined()
        }
    })
    it(`You should add your 'Shop' state from MobX into the 'Products' component. You should also access the state correctly and assign the 'shopStore' variable in the 'render' method with the 'injected' 'shopStore'.`, () => {
        const stores = { shopStore }

        let wrapper, hasError = false
        try {
            wrapper = mount(
                <Provider {...stores}>
                    <App />
                </Provider>
            )
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
        } else {
            const products = wrapper.find('.product')
            expect(products.length, `The products page is rendering ${products.length} products when is should be rendering ${data.length} products. Make sure that that your component 'observes' state, the store is 'injected' to the component, and that you are accessing the injected store correctly through props.`).toBe(data.length)
        }
    })
})