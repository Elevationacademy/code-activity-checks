import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Company from '../../src/components/Company';

configure({ adapter: new Adapter() });

describe("spotcheck3", () => {
  it('Application should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("You must render an h4 element on the page for each Company, containing the company's name in capital letters", () => {
    const wrapper = mount(<App />);
    let spotcheck3Div = wrapper.find('#spotcheck-3')
    let company = spotcheck3Div.find('h4')
    expect(company, 'There should be three h4 elements rendered on the page').toHaveLength(3)
    const expectTesla = 'TESLA'
    const actualTesla = company.first().text()
    expect(actualTesla, `The first h4 should have the text '${expectTesla}', instead found '${actualTesla}'`).toContain(expectTesla)
    const expectMicrosoft = 'MICROSOFT'
    const actualMicrosoft = company.at(1).text()
    expect(actualMicrosoft, `The first h4 should have the text '${expectMicrosoft}', instead found '${actualMicrosoft}'`).toContain(expectMicrosoft)
    const expectGoogle = 'GOOGLE'
    const actualGoogle = company.at(2).text()
    expect(actualGoogle, `The first h4 should have the text '${expectGoogle}', instead found '${actualGoogle}'`).toContain(expectGoogle)
  });
  it("The upperCase method should be defined in App - you should use this method to uppercase your companies", () => {
    const wrapper = mount(<App />);
    expect(typeof wrapper.instance().upperCase, 'You must define the upperCase method in your App component').toBe("function")
    //cannot find a generic, loose way to check if arrow func was called.
  })
})
