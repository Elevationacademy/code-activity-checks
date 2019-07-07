import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import Home from '../../src/components/Home';
import Landing from '../../src/components/Landing';

configure({ adapter: new Adapter() });

describe("exercise3", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("App should render your Landing component when the currentPage property inside of App's state is set to 'Landing'", () => {
        const wrapper = mount(<App />);
        wrapper.setState({ currentPage: "Landing" })
        let ex3 = wrapper.find('#ex-3')
        let landingComponent = ex3.find(Landing)
        expect(landingComponent.exists(), "could not find a Landing component rendered in App when currentPage is 'Landing'").toBeTruthy()

        let homeComponent = ex3.find(Home)
        expect(homeComponent.exists(), "should not load Home instance if `currentPage` is 'Landing'").toBeFalsy()
    });
    it("App should render your Home component when the currentPage property is not 'Landing'", () => {
        const wrapper = mount(<App />);
        wrapper.setState({ currentPage: "dummy" })
        let ex3 = wrapper.find('#ex-3')
        let homeComponent = ex3.find(Home)
        expect(homeComponent.exists(), "could not find a Home component rendered in App when currentPage is 'Home'").toBeTruthy()

        let landingComponent = ex3.find(Landing)
        expect(landingComponent.exists(), "should not load Landing instance unless `currentPage` is 'Landing'").toBeFalsy()

    });
})
