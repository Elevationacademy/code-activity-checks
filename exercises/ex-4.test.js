import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';
import { MemoryRouter } from 'react-router-dom';
import { mount, render, shallow, configure } from 'enzyme';
import {App} from '../../src/App';
import NavBar from '../../src/components/NavBar';
import Menu from '../../src/components/Menu';
import Checkout from '../../src/components/Checkout';
import Item from '../../src/components/Item';


configure({ adapter: new Adapter() });

describe("exercise4", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('Your App component should render the NavBar, Menu, and Checkout components', () => {
        const wrapper = mount(<App />);
        let navComponent = wrapper.find(NavBar);
        let menuComponent = wrapper.find(Menu);
        let checkoutComponent = wrapper.find(Checkout);
        expect(navComponent.find(Checkout).exists(), 'The NavBar component should be returned in the render function of App and should not render any other components').toBeFalsy();
        expect(navComponent.find(Menu).exists(), 'The NavBar component should be returned in the render function of App and should not render any other components').toBeFalsy();
        expect(navComponent.find(Item).exists(), 'The NavBar component should be returned in the render function of App and should not render any other components').toBeFalsy();        
        
        expect(menuComponent.find(Checkout).exists(), 'The Menu component should be returned in the render function of App').toBeFalsy();
        expect(menuComponent.find(NavBar).exists(), 'The Menu component should be returned in the render function of App').toBeFalsy();

        expect(checkoutComponent.find(NavBar).exists(), 'The Checkout component should be returned in the render function of App').toBeFalsy();
        expect(checkoutComponent.find(Menu).exists(), 'The Checkout component should be returned in the render function of App').toBeFalsy();
    })
    // it('The Menu component should render the Item component once', () => {
    //     const wrapper = mount(<Menu />);
    //     let itemComponent = wrapper.find(Item);
    //     expect(itemComponent, 'The Item component should be returned in the render function of the Menu component').toHaveLength(1);

    // })
    // it('The Checkout component should render the Item component once', () => {
    //     const wrapper = mount(<Checkout />);
    //     let itemComponent = wrapper.find(Item);
    //     expect(itemComponent, 'The Item component should be returned in the render function of the Checkout component').toHaveLength(1);
    // })
    it("Each Component should render a div with its class' name as text", () => {
        const wrapper = mount(<App />);
        let itemComponent = wrapper.find(Item);
        let navComponent = wrapper.find(NavBar);
        let menuComponent = wrapper.find(Menu);
        let checkoutComponent = wrapper.find(Checkout);
        expect(itemComponent.exists(), 'could not find Item component').toBeTruthy()
        expect(navComponent.exists(), 'could not find Nav component').toBeTruthy()
        expect(menuComponent.exists(), 'could not find Menu component').toBeTruthy()
        expect(checkoutComponent.exists(), 'could not find Checkout component').toBeTruthy()
    })
})