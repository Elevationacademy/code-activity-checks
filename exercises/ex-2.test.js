import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../../src/App';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';
import { MemoryRouter } from 'react-router-dom';
import { mount, render, shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("Passing a parameter above 30 should create a div with a class of 'hell-scape'", () => {
        let input = 40
        let expectedOutput = 'hell-scape'
        expect(App.prototype.getClassName, 'You must define the getClassName method in your App component').toBeDefined()
        expect(App.prototype.getClassName(input), "an input above 30 should output 'hell-scape'").toBe(expectedOutput)
    });
    it("Passing a parameter between 15 and 30 should create a div with a class of 'fair'", () => {
        let input = 20
        let expectedOutput = 'fair'
        expect(App.prototype.getClassName, 'You must define the getClassName method in your App component').toBeDefined()
        expect(App.prototype.getClassName(input), "an input between 15 and 30 should output 'fair'").toBe(expectedOutput)
    });
    it("Passing a parameter below 15 should create a div with a class of 'freezing'", () => {
        let input = 10
        let expectedOutput = 'freezing'
        expect(App.prototype.getClassName, 'You must define the getClassName method in your App component').toBeDefined()
        expect(App.prototype.getClassName(input), "an input under 15 should output 'freezing'").toBe(expectedOutput)
    });
    it("Your render function should return a div with a className equal to your getClassName function", () => {
        expect(App.prototype.getClassName, 'You must define the getClassName method in your App component').toBeDefined()
        App.prototype.getClassName = function () {
            return "mock"
        }
        const wrapper = mount(<App />);
        expect(wrapper.find('.mock').exists(), 'Your get getClassName function did not render a div with a class').toBeTruthy();
    });

})






