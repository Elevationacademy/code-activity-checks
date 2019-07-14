import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Exercise2 from '../../src/components/Exercise2';

configure({ adapter: new Adapter() });

describe("ex-2", () => {
  it('Application should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('There should be a `fruit` property in state that is updated when changing selection in the dropdown with the class `option-menu`', () => {
    const wrapper = mount(<Exercise2 />)

    let options = wrapper.find('option');
    expect(options.length, "There should be at least 1 <option> inside the select").toBeGreaterThanOrEqual(1)

    let optionValue = options.at(0).prop('value') || options.at(0).text();
    let select = wrapper.find('#select-input')

    select.instance().value = optionValue
    select.simulate('change')
    expect(wrapper.state("fruit"), "When a different drop-down value is selected, the state's `fruit` property should change to the selected option").toEqual(optionValue);
  });
})