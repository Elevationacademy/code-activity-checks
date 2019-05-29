import React from 'react';
import ReactDOM from 'react-dom';
import { App, Banner } from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck4", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("You must create a functional component called 'Banner'", () => {
        const wrapper = mount(<Banner />);
        let banner = wrapper.find('.banner')
        expect(banner.exists(), "There should be a div with a class of 'banner'").toBeTruthy()
        expect(banner.text().toUpperCase().trim(), "Your div should have the text 'THE LOGO'").toBe('THE LOGO')
    })
})






