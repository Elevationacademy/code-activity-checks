import { Shop } from '../../src/stores/Shop'
import { Product as Prod } from '../../src/stores/Product'
import { isComputedProp, isObservableArray } from 'mobx'
import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductPage from '../../src/components/ProductPage'
import Product from '../../src/components/Product'
import { Provider } from 'mobx-react'
import { MemoryRouter } from 'react-router-dom'

const data = require('../../src/utils/data.json')
configure({ adapter: new Adapter() })

let shopStore
describe("exercise3", () => {
    beforeEach(() => {
        shopStore = new Shop()
    })
    it(`The Shop store should have a 'findProductById' method which receives an 'id' as a parameter and returns the product with the given id.`, () => {
        if (shopStore.findProductById) {
            expect(shopStore.findProductById.isMobxAction, `When running the code, we found that your 'findProductById' method was a MobX 'action'. The 'findProductById' method should not be a MobX 'action' because it is not changing an 'observable'.`).toBeFalsy()

            shopStore.products = data.map(d => new Prod(d.id, d.name, d.img, d.price, d.likes))
            for (let product of data) {
                const { id, name, img, price, likes } = product
                const expectedProduct = new Prod(id, name, img, price, likes)
                const productReceived = shopStore.findProductById(expectedProduct.id)

                expect(productReceived, `When invoking the 'findProductById' method with the 'id' ${id}, we should have received the following product: ${JSON.stringify(expectedProduct)}. Instead we received: ${JSON.stringify(productReceived)}. We suggest you parse these stringified objects in order to comfortably see how they look.`).toEqual(expectedProduct)
                expect(productReceived instanceof Prod, `The product received when invoking the 'findProductById' method with 'id' ${id} was not an instance of the Product class. Make sure you every product in your products array is an instance of the Product class.`).toBeTruthy()
            }
        } else {
            expect(shopStore.findProductById, `Could not find a 'findProductById' method in the Shop store.`).toBeDefined()
        }
    })
    it(`The Shop store should have a 'computed' property called 'isProductsPopulated'.`, () => {
        if (shopStore.isProductsPopulated !== undefined) {
            expect(isComputedProp(shopStore, 'isProductsPopulated'), `The 'isProductsPopulated' property/method should be a MobX 'computed' property. The 'isProductsPopulated' property/method which was found was not a MobX 'computed' property. Make sure you use the 'computed' decorator and the method is a 'get'ter.`).toBeTruthy()

            expect(shopStore.isProductsPopulated, `When the 'products' array is empty, the 'isProductsPopulated' property should return 'false', instead it returned ${shopStore.isProductsPopulated}.`).toBeFalsy()

            shopStore.products = data.map(d => new Prod(d.id, d.name, d.img, d.price, d.likes))
            expect(shopStore.isProductsPopulated, `After adding products to the 'products' array, the 'isProductsPopulated' property should return 'true', instead it returned ${shopStore.isProductsPopulated}.`).toBeTruthy()
        } else {
            expect(shopStore.isProductsPopulated, `Could not find a 'isProductsPopulated' 'computed' property in the Shop store.`).toBeDefined()
        }
    })
    it(`You should add your 'Shop' state from MobX into the 'Products' component. You should also access the state correctly and assign the 'shopStore' variable on line 10 with the 'injected' 'shopStore'.`, () => {
        const stores = { shopStore }
        shopStore.products = data.map(d => new Prod(d.id, d.name, d.img, d.price, d.likes))
        const expectedProduct = shopStore.products.find(p => p.id === 7)

        const matchProps = { params: { productId: `${expectedProduct.id}` } }
        let wrapper, hasError = false
        try {
            wrapper = mount(
                <Provider {...stores}>
                    <MemoryRouter>
                        <ProductPage match={matchProps} />
                    </MemoryRouter>
                </Provider>
            )
        } catch (e) {
            hasError = true
        }

        if (hasError) {
            expect(false, `The component is not accessing the 'Shop' store correctly. Make sure you are 'inject'ing it into the component.`).toBeTruthy()
        } else {
            const product = wrapper.find(Product)
            expect(product.length, `The product page is not rendering a single product. Make sure that that your component 'observes' state, the store is 'injected' to the component, and that you are accessing the injected store correctly through props.`).toBe(1)

            const prop = product.first().props().product
            expect(prop, `You did not use the 'Shop' store's 'findProductById' method correctly. Make sure you are invoking it with the 'productId' variable (declared for you) and assigning the return value to the 'product' variable on line 14.`).toEqual(expectedProduct)
        }
    })
})