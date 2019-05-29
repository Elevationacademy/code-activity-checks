import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { Dummy } from '../../src/components/Dummy';

configure({ adapter: new Adapter() });

describe("exercise1", () => {
  it('Application should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Your App component should render your Dummy component', () => {
    const wrapper = mount(<App />);
    let dummyComponent = wrapper.find(Dummy);
    expect(dummyComponent.exists(), "could not find 'Dummy' component").toBeTruthy()
  })
  it('Your Dummy component should contain an input', () => {
    const wrapper = mount(<Dummy />);
    let input = wrapper.find('input');
    expect(input.exists(), 'There is no input element in your Dummy component').toBeTruthy();
  })
  it('Your Dummy component should contain a button', () => {
    const wrapper = mount(<Dummy />);
    let button = wrapper.find('button');
    expect(button.exists(), 'There is no button element in your Dummy component').toBeTruthy();
  })
})






