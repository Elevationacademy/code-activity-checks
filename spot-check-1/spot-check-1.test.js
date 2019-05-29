import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck1", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      
      it("Your render function should return an h1 tag. Inside the h1 tag there should be a JSX expression that calls the getStuff method", () => {
        expect(App.prototype.getStuff, 'You must define the getStuff method in your App component').toBeDefined()
        App.prototype.getStuff = function () {
            return "mock"
        }
        const wrapper = mount(<App />);
        let header = wrapper.find('h1')
        expect(header.exists(), 'You must render your JSX expression in an <h1> tag').toBeTruthy()
        expect(header.text(), 'Header must contain text').toContain("mock");
    });
})






