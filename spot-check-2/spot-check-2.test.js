import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("You must render a single div inside #spotcheck-2 (either the div that is returned by the getMorningGreeting or getEveningGreeting", () =>{
        const wrapper = mount(<App />);
        expect(wrapper.find('#spotcheck-2').children('div').exists(), 'could not find a div rendered inside of #spotcheck-2').toBeTruthy()

    })
    it("Your render function should return an invocation of one of your methods using a conditional statement", () => {
        expect(App.prototype.getMorningGreeting, 'You must define the getMorningGreeting method in your App component').toBeDefined()
        expect(App.prototype.getEveningGreeting, 'You must define the getEvening method in your App component').toBeDefined()
        App.prototype.getEveningGreeting = function () {
            return <div className="greet">mock</div>
        }
        App.prototype.getMorningGreeting = function () {
            return <div className="greet">mock</div>
        }
        const wrapper = mount(<App />);
        let greeting = wrapper.find('.greet')
        expect(greeting.exists(), 'Your method should return JSX of a simple string').toBeTruthy()
    });
})






