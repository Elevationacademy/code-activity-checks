import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import {Sum} from '../../src/App';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck1", () => {
  it('Application should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sum />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('You must render a div on the page with the sum of num1 and num2', () => {
    const wrapper = mount(<Sum />);
    let text = wrapper.find('div')
    expect(text.exists(), 'There should be a div rendered on the page').toBeTruthy()
  });
})






