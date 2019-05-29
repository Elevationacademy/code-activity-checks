import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { App } from '../../src/App';
import Spamalot from '../../src/components/Spamalot';
import Spam from '../../src/components/Spam';

configure({ adapter: new Adapter() });

describe("exercise2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('Your App component should render your Spamalot component', () => {
        const wrapper = mount(<App />);
        let spamalotComponent = wrapper.find(Spamalot);
        expect(spamalotComponent, 'could not find Spamalot component').toHaveLength(1);
    })
    it('Your Spamalot component should render your Spam functional component', () => {
        const wrapper = mount(<Spamalot />);
        let spamComponent = wrapper.find(Spam);
        expect(spamComponent.exists(), 'You must create a functional Component called Spam').toBeTruthy()
        expect(spamComponent, 'The Spamalot component must render the Spam component 500 times').toHaveLength(500);
    })
})






