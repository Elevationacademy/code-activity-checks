import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck3", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("The first item in the array that you return in your render function should be your morning greeting function", () => {
        expect(App.prototype.getMorningGreeting, 'You must define the getMorningGreeting method in your App component').toBeDefined()
        App.prototype.getMorningGreeting = function () {
            return <div className="greeting">mock</div>
        }
        const wrapper = mount(<App />);
        let greeting = wrapper.find('.greeting').first()
        expect(greeting.exists(), "could not find greeting").toBeTruthy()
        expect(greeting.text(), 'could not find text in the div').toBe("mock");
    });
    it("The second item in the array that you return in your render function should be your evening greeting function", () => {
        expect(App.prototype.getEveningGreeting, 'You must define the getEvening method in your App component').toBeDefined()
        App.prototype.getEveningGreeting = function () {
            return <div className="greeting">mock</div>
        }
        const wrapper = mount(<App />);
        let greeting = wrapper.find('.greeting').at(1)
        expect(greeting.exists(), "could not find greeting").toBeTruthy() 
        expect(greeting.text(), 'could not find text in your div').toBe("mock");
    });
    it('The third item in the array that you return in your render function should be a <p> element which says "some text" ', () => {
        const EXPECTED_TEXT = "some text";
        const wrapper = mount(<App />);
        let text = wrapper.find('p')
        expect(text.exists(), "The third item in the array should be a <p> element").toBeTruthy()
        expect(text.text(), `We expected to find ${EXPECTED_TEXT}, but instead found ${text.text()} `).toBe(EXPECTED_TEXT);
    });
})






