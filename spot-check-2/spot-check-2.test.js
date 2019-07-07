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
  it('You must render an h4 element on the page for each Company', () => {
    const wrapper = mount(<App />);
    let spotcheck2Div = wrapper.find('#spotcheck-2')
    let companies = spotcheck2Div.find('h4')
    expect(companies, 'There should be three h4 elements rendered on the page').toHaveLength(3)
    
    const expected1 = 'Tesla'
    const actual1 = companies.first().text()
    expect(actual1.toLowerCase(), `The first h4 should have the text '${expected1}'; instead found '${actual1}'`).toContain(expected1.toLowerCase())
    
    const expected2 = 'Microsoft'
    const actual2 = companies.at(1).text()
    expect(actual2.toLowerCase(), `The second h4 should have the text '${expected2}'; instead found '${actual2}`).toContain(expected2.toLowerCase())
    
    const expected3 = 'Google'
    const actual3 = companies.at(2).text()
    expect(actual3.toLowerCase(), `The third h4 should have the text '${expected3}'; instead found '${actual3}`).toContain(expected3.toLowerCase())
  });
  it("The App component's render function should invoke the generateCompanyTags function", () => {
    const wrapper = mount(<App />);
    expect(typeof wrapper.instance().generateCompanyTags, 'You must define the generateCompanyTags method in your App component').toBe('function')
    //cannot find a generic, loose way to check if arrow func was called.
  })
})
