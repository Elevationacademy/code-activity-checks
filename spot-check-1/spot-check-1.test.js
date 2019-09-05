import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';
import Company from '../../src/components/Company';

configure({ adapter: new Adapter() });

describe("spotcheck1", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
      });    
      it('You must render an h4 element on the page with the word Tesla', () => {
        const wrapper = mount(<App />);
        const expectedText = "Tesla";
        let spotcheck1Div= wrapper.find('#spotcheck-1')
        let teslaText = spotcheck1Div.find('h4')
        expect(teslaText.exists(), 'could not find h4 element').toBeTruthy()
        const actualText = teslaText.html()
        expect(actualText, `The text in the h4 should contain '${expectedText}'.`).toContain(expectedText)
        expect(teslaText, "You should only render one h4 element").toHaveLength(1)
      });
      it('The App component should render the Company component with props', () => {
        const wrapper = mount(<App />);
        let companyComponent = wrapper.find("#spotcheck-1").find(Company);
        expect(companyComponent.exists(), 'You must create a Component called Company').toBeTruthy()
        const expectedName = "Tesla"
        const actualName = companyComponent.first().props().name
        expect(actualName, `The name prop was not passed accurately; expected ${expectedName}, instead found ${actualName}`).toEqual(expectedName)
    })
    it('The Company component should render the SubCompany component', () => {
        const wrapper = mount(<Company name='Tesla' />);
        let subCompanyComponent = wrapper.find('SubCompany');
        expect(subCompanyComponent.exists(), 'You must create a Component called SubCompany').toBeTruthy()
      
    })
})






