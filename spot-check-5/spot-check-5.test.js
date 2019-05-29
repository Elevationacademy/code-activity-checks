import React from 'react';
import ReactDOM from 'react-dom';
import { App, SignUp, Blurb, About } from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, render, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck5", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<About />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should render the About component inside #spotcheck-5', () => {
        const wrapper = mount(<App />);
        let aboutComponent = wrapper.find('#spotcheck-5 > About');
        expect(aboutComponent.exists(), 'Could not find an About component inside the #spotcheck-5 div').toBeTruthy();
    })
    it('Your About component should render your SignUp component', () => {
        const wrapper = mount(<About />);
        let signupComponents = wrapper.find(SignUp);
        expect(signupComponents, 'Could not find a SignUp component inside About component').toHaveLength(1);
    })
    it('Your About component should render your SignUp component', () => {
        const wrapper = mount(<About />);
        let blurbComponent = wrapper.find(Blurb);
        expect(blurbComponent, 'Could not find a Blurb component inside About component').toHaveLength(1);
    })
})






