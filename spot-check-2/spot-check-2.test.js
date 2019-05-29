import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import {App} from '../../src/App';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("The first div rendered on your page should have an id of 'nav'", () => {
        const wrapper = mount(<App />);
        let navDiv = wrapper.find('#spotcheck-2 > Nav > #nav');
        expect(navDiv.exists(), "There should be a div with an id of 'nav'").toBeTruthy()
    });
    it("You must render a LandingPage component containing an h1 element which says welcome after the Nav component", () => {
        const expectedMessage = "Welcome!";
        const wrapper = mount(<App />); 
        let welcome = wrapper.find('#spotcheck-2 > LandingPage');
        expect(welcome.exists(), "There should be an h1 element after the Nav div").toBeTruthy()
        const actualText = welcome.text().trim();
        expect(actualText, `The h1 text must say '${expectedMessage}. Instead we found ${actualText}'`).toBe('Welcome!')
    });
})






