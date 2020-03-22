import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Inputs from '../../src/components/Inputs';

configure({ adapter: new Adapter() });
window.alert = () => {};
// Inputs component test
describe('exercise2', () => {
  let wrapper;
  let mockAddPlayer;

  beforeEach(() => {
    mockAddPlayer = jest.fn();
    wrapper = shallow(<Inputs addPlayer={mockAddPlayer} />);
  });

  // *** handleChange() tests ***
  // handleChange() with name property
  it('handleChange should call setState with name property', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'Jona'
      }
    };
    const expected = {
      name: 'Jona',
      score: null
    };
    wrapper.instance().handleChange(mockEvent);

    expect(
      wrapper.state(),
      `handleChange() did not change the state with the right name propety. When passing Jona in the name input field: the state should be - {name: 'Jona', score: null}, but instead got - {name: '${
        wrapper.state().name
      }', score: ${
        wrapper.state().score
      }}. Remember to - initiate the name and score propeties to null and to have name attribute of 'name' in the name's input field`
    ).toEqual(expected);
  });

  // handleChange() with score property
  it('handleChange should call setState with score property', () => {
    const mockEvent = {
      target: {
        name: 'score',
        value: '100'
      }
    };
    const expected = {
      name: null,
      score: '100'
    };
    wrapper.instance().handleChange(mockEvent);

    expect(
      wrapper.state(),
      `handleChange() did not change the state with the right score propety. When passing 100 in the score input field: the state should be - {name: null, score: '100'}, but instead got - {name: ${
        wrapper.state().name
      }, score: '${
        wrapper.state().score
      }'}. Remember to - initiate the name and score propeties to null and to have name attribute of 'score' in the score's input field`
    ).toEqual(expected);
  });

  // *** inputs onChange and button onClick tests ***
  // name input
  it('onChange should call handleChange on name change with the correct params', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = {
      target: {
        name: 'name',
        value: 'Jona'
      }
    };
    let nameIdTag = wrapper.find('#name-input')
    if (nameIdTag.length != 0) {
      nameIdTag.simulate('change', mockEvent);

      expect(
        spy,
        `onChange wasn't called in the name's input field with handleChange method`
        ).toHaveBeenCalledWith(mockEvent);
    } else {
      expect(false, "Could not find tag with id of 'name'. Make sure you give the name's input an id of 'name'").toBeTruthy()
      }
  });

  // score input
  it('onChange should call handleChange on score change with the correct params', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = {
      target: {
        name: 'score',
        value: '100'
      }
    };
    let scoreIdTag = wrapper.find('#score-input')
    if (scoreIdTag.length != 0) {
      scoreIdTag.simulate('change', mockEvent);
      expect(
        spy,
        `onChange wasn't called in the score's input field with handleChange method`
        ).toHaveBeenCalledWith(mockEvent);
      } else {
        expect(false, "Could not find tag with id of 'score'. Make sure that you give the score's input an id of 'score'").toBeTruthy()
        }
  });

  // button onClick
  it('onClick should call addPlayer when button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'addPlayer');
    wrapper.instance().forceUpdate();
    const mockEvent = {
      target: {
        name: 'score',
        value: '100'
      }
    };
    let submitIdTag = wrapper.find('#submit-btn')
    if (submitIdTag.length != 0) {
      submitIdTag.simulate('click', mockEvent);
      expect(
        spy,
        `onClick wasn't called with addPlayer method when clicking the button. Make sure that onClick attribute was given with addPlayer()`
        ).toHaveBeenCalledWith(mockEvent);
      } else {
        expect(false, "Could not find tag with id of 'submit'. Make sure that you give the submit button an id of 'submit'").toBeTruthy()
        }
    });

  // *** addPlayer() tests ***
  // addPlayer() with valid inputs
  it("With valid inputs - Inputs' addPlayer() should alert the user and call App's addPlayer() with the correct params", () => {
    wrapper.setState({
      name: 'Jona',
      score: '100'
    });
    window.alert = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    wrapper.instance().addPlayer();

    expect(
      window.alert,
      `When state is set to - {name: "Jona", score: "100"}, while submit button was clicked, there was not an alert with the message - 'Jona was added with a score of 100'. Make sure you alert the user with the exact text`
    ).toBeCalledWith(`Jona was added with a score of 100`);

    expect(
      mockAddPlayer,
      `App's addPlayer method was not called with the correct name and score from Input's state. Make sure you parseInt score before invoking App's addPlayer() using props`
    ).toHaveBeenCalledWith('Jona', 100);
  });

  // addPlayer test with invalid inputs
  it("With invalid input - Inputs' addPlayer() should alert the user when the inputs are invalid and not call on App's addPlayer method", () => {
    wrapper.setState({
      name: '',
      score: '100'
    });
    window.alert = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    wrapper.instance().addPlayer();

    expect(
      window.alert,
      `When state is set to - {name: "", score: "100"}, while submit button was clicked, there was not an alert with the message - 'Invalid Name and/or Score'. Make sure to use validateInputs() method correctly and alert the user with the exact text`
    ).toBeCalledWith(`Invalid Name and/or Score`);

    expect(
      mockAddPlayer,
      `When state is set to - {name: "", score: "100"}, App's addPlayer method was called (even though the input is invalid). Make sure to use validateInputs() method correctly, when given false from that method you should not invoke the App's addPlayer method`
    ).not.toHaveBeenCalled();
  });
});
