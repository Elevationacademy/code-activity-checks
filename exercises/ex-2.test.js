import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import Home from '../../src/components/Home';
import Landing from '../../src/components/Landing';
import Item from '../../src/components/Item';

configure({ adapter: new Adapter() });

describe("exercise2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('App should render your Home component', () => {
        const wrapper = mount(<App />);
        let homeComponent = wrapper.find("#ex-2").find(Home)
        expect(homeComponent.exists(), 'could not find a Home component in App').toBeTruthy()
    });

    it('App should render your Landing component', () => {
        const wrapper = mount(<App />);
        let landingComponent = wrapper.find("#ex-2").find(Landing)
        expect(landingComponent.exists(), 'could not find a Landing component in App').toBeTruthy()
    });

    it("The Landing component should render a div which says 'Welcome, Robyn', followed by the hottest item", () => {
        const wrapper = mount(<App />);
        wrapper.setState({
            user: "mockUser",
            store: [{ item: "mockItem", price: 3099, discount: 0.05, hottest: true }]
        }, function () {
            const landing = wrapper.find("#ex-2").find(Landing)
            expect(landing.length, 'could not find the Landing component rendered by App').toBeGreaterThan(0)

            let text = landing.html()
            expect(text, "the user's name should be passed as props to the Landing component from the App's state").toContain("mockUser")
            expect(text, "the hottest item should be rendered by accessing props passed from the Apps's state").toContain('mockItem')
        })
    })

    it("The Home component should render the Item component for every item in the store", () => {
        const wrapper = mount(<App />);
        let itemComponent = wrapper.find("#ex-2").find(Home).find(Item)
        expect(itemComponent.exists(), 'could not find an Item component rendered by the Home component').toBeTruthy()
    });

    it("The Item component should render a the name and price of an item from App's `store` - remember to use data from `state`!", () => {
        const wrapper = mount(<App />);
        wrapper.setState({
            user: "mockUser",
            store: [{ item: "mockName", price: 42, discount: 0.05, hottest: true }]
        }, function () {
            let item = wrapper.find("#ex-2").find(Home).find(Item).children()
            expect(item.exists(), 'could not find any instance of the Item component').toBeTruthy()
            expect(item.first().html(), 'the name of the item should be passed using props').toContain("mockName")
            expect(item.first().html(), 'the price of the item sould be passed using props').toContain(42)
        })
    });
})
