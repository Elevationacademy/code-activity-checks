import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import Home from '../../src/components/Home';
import Item from '../../src/components/Item';

configure({ adapter: new Adapter() });

describe("exercise4", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("When the shouldDiscount property is set to false, the Home component should display the normal prices", () => {
        const wrapper = mount(<App />);
        wrapper.setState({ currentPage: "Home", shouldDiscount: false }, function () {
            let ex4 = wrapper.find('#ex-4')
            let homeComponent = ex4.find(Home)
            expect(homeComponent.exists(), "could not find a Home component rendered in exercise 4").toBeTruthy()

            let items = homeComponent.find(Item)
            expect(items, "Home should render some Item components").toBeTruthy()

            let expected1 = "800"
            let expected2 = "230"
            let actual1 = items.first().text()
            let actual2 = items.children().at(1).text()

            expect(actual1, `The price of the XSPS ProPlayer should be ${expected1}, instead found ${actual1}`).toContain(expected1)
            expect(actual2, `The price of the Gizem Backwatch should be ${expected2}, instead found ${actual2}`).toContain(expected2)
        })
    });

    it("When the shouldDiscount property is set to true, the Home component should display the discounted prices: `price * (1 - discount)`", () => {
        const wrapper = mount(<App />);
        wrapper.setState({ currentPage: "Home", shouldDiscount: true }, function () {

            let ex4 = wrapper.find('#ex-4')
            let homeComponent = ex4.find(Home)
            expect(homeComponent.exists(), "could not find a Home component rendered in App when currentPage is 'Home'").toBeTruthy()

            let items = homeComponent.find(Item)
            expect(items, "Home should render some Item components").toBeTruthy()

            let expected1 = 640
            let expected2 = 92

            //should find proper regex
            let text = items.first().text().split(".")[0] //in case of decimals (formatting)
            let actual1 = Number(text.replace(/[^0-9]/g, ''))
            expect(actual1, `The price of the XSPS ProPlayer with a discount should be ${expected1}, instead found ${actual1}`).toBeGreaterThanOrEqual(expected1 - 10)
            expect(actual1, `The price of the XSPS ProPlayer with a discount should be ${expected1}, instead found ${actual1}`).toBeLessThanOrEqual(expected1 + 10)

            let text2 = items.children().at(1).text().split(".")[0] //in case of decimals (formatting)
            let actual2 = Number(text2.replace(/[^0-9]/g, ''))
            expect(actual2, `The price of the Gizem Backwatch with a discount should be ${expected2}, instead found ${actual2}`).toBeGreaterThanOrEqual(expected2 - 10)
            expect(actual2, `The price of the Gizem Backwatch a discount should be ${expected2}, instead found ${actual2}`).toBeLessThanOrEqual(expected2 + 10)

        })
    });
})
