import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Exercise1 from '../../src/components/Exercise1';
import App from '../../src/App';

configure({ adapter: new Adapter() });

describe("ex-1", () => {
    
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(App, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('The `name` property in state should update when typing in the `#name-input` input', () => {
        const wrapper = mount(<Exercise1 />);
        const input = wrapper.find('#name-input')
        const value = "SOMENAME"

        input.instance().value = value
        input.simulate('change')

        expect(wrapper.instance().state.name, "Each type the user types anything in the `#name-input`, the state's `name` key should automatically be updated with the text in the input").toEqual(value);
    });

    it('The `age` property in state should update when typing in the `#age-input` input', () => {
        const wrapper = mount(<Exercise1 />);
        const input = wrapper.find('#age-input')
        const value = "14"

        input.instance().value = value
        input.simulate('change')

        expect(wrapper.instance().state.age, "Each type the user types anything in the `#age-input`, the state's `age` key should automatically be updated with the text in the input").toEqual(value);
    });

    it('The `value` inside of `#name-input` should change when `name` is changed in state', () => {
        const wrapper = mount(<Exercise1 />)
        const input = wrapper.find('#name-input')
        const newName = 'Lucius'

        wrapper.setState({ name: newName })
        expect(input.instance().value, "Your input and state must have two-way binding; i.e. any change in the state's `name` value should update the value of the `#name-input`").toEqual(newName)
    })

    it('The `value` inside of `#age-input` should change when `age` is changed in state', () => {
        const wrapper = mount(<Exercise1 />)
        const input = wrapper.find('#age-input')
        const newAge = '42'

        wrapper.setState({ age: newAge })
        expect(input.instance().value, "Your input and state must have two-way binding; i.e. any change in the state's `age` value should update the value of the `#age-input`").toEqual(newAge)
    })

    it('Should alert when button is clicked', () => {
        const wrapper = mount(<Exercise1 />);
        const buttons = wrapper.find("button")
        expect(buttons, "There should only be one button in the Exercise1 Component").toHaveLength(1)

        global.alert = jest.fn();
        wrapper.find('button').simulate('click');
        expect(global.alert).toHaveBeenCalled();
    });
})