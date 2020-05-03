import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Inputs from '../../src/components/Inputs';

configure({ adapter: new Adapter() });
window.alert = () => { };

// Inputs component test
describe('exercise2', () => {
  let wrapper, mockAddPlayer;

  beforeEach(() => {
    mockAddPlayer = jest.fn();
    try {
      wrapper = shallow(<Inputs addPlayer={mockAddPlayer} />);
    } catch (e) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    }
  });

  // *** handleChange() tests ***
  // handleChange() with name property
  it('The handleChange method should call setState with the name property', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'Jona',
      },
    };
    const expected = {
      name: 'Jona',
      score: null,
    };

    let hasError;
    try {
      wrapper.instance().handleChange(mockEvent);
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      expect(
        wrapper.state(),
        `handleChange() did not change the state with the correct name property. When entering 'Jona' in the name input field: the state should be - {name: 'Jona', score: null}, but instead got - {name: '${
          wrapper.state().name
        }', score: ${
          wrapper.state().score
        }}. Remember to - initiate the name and score propeties to null and to have the name attribute set to 'name' in the name's input field`
      ).toEqual(expected);
    }
  });

  // handleChange() with score property
  it('handleChange should call setState with the score property', () => {
    const mockEvent = {
      target: {
        name: 'score',
        value: '100',
      },
    };
    const expected = {
      name: null,
      score: '100',
    };

    let hasError;
    try {
      wrapper.instance().handleChange(mockEvent);
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      expect(
        wrapper.state(),
        `handleChange() did not change the state with the correct score property. When entering 100 in the score input field: the state should be - {name: null, score: '100'}, but instead got - {name: ${
          wrapper.state().name
        }, score: '${
          wrapper.state().score
        }'}. Remember to - initiate the name and score propeties to null and to have the name attribute set to 'score' in the score's input field`
      ).toEqual(expected);
    }
  });

  // *** inputs onChange and button onClick tests ***
  // name input
  it('The onChange attribute on the name input should invoke the handleChange method (with the correct arguments) when the value of the name input changes', () => {
    let spy, mockEvent, nameIdTag, hasError;
    try {
      spy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      mockEvent = {
        target: {
          name: 'name',
          value: 'Jona',
        },
      };
      nameIdTag = wrapper.find('#name-input');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      if (nameIdTag.length != 0) {
        nameIdTag.simulate('change', mockEvent);

        expect(
          spy,
          `The onChange didn't invoke the handleChange method when entering text in the name's input field`
        ).toHaveBeenCalledWith(mockEvent);
      } else {
        expect(
          false,
          "Could not find a tag with id of 'name-input'. Make sure you give the name's input an id of 'name-input'"
        ).toBeTruthy();
      }
    }
  });

  // score input
  it('The onChange attribute on the score input should invoke the handleChange method (with the correct arguments) when the value of the score input changes', () => {
    let spy,mockEvent, scoreIdTag, hasError;
    try {
      spy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      mockEvent = {
        target: {
          name: 'score',
          value: '100',
        },
      };
      scoreIdTag = wrapper.find('#score-input');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      if (scoreIdTag.length != 0) {
        scoreIdTag.simulate('change', mockEvent);
        expect(
          spy,
          `The onChange didn't invoke the handleChange method when entering text in the score's input field`
        ).toHaveBeenCalledWith(mockEvent);
      } else {
        expect(
          false,
          "Could not find a tag with id of 'score-input'. Make sure that you give the score's input an id of 'score-input'"
        ).toBeTruthy();
      }
    }
  });

  // button onClick
  it('The onClick attribute should invoke the addPlayer method when the button is clicked', () => {
    let spy, mockEvent, submitIdTag, hasError;
    try {
      spy = jest.spyOn(wrapper.instance(), 'addPlayer');
      wrapper.instance().forceUpdate();
      mockEvent = {
        target: {
          name: 'score',
          value: '100',
        },
      };
      submitIdTag = wrapper.find('#submit-btn');
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      if (submitIdTag.length != 0) {
        submitIdTag.simulate('click', mockEvent);
        expect(
          spy,
          `The onClick didn't invoke the addPlayer method when clicking the button. Make sure that the onClick attribute was provided with addPlayer`
        ).toHaveBeenCalledWith(mockEvent);
      } else {
        expect(
          false,
          "Could not find a tag with the id of 'submit-btn'. Make sure that you give the submit button an id of 'submit-btn'"
        ).toBeTruthy();
      }
    }
  });

  // *** addPlayer() tests ***
  // addPlayer() with valid inputs
  it("When entering valid inputs - the Inputs' addPlayer() method should alert the user and invoke App's addPlayer() method with the correct arguments", () => {
    let hasError;
    try {
      wrapper.setState({
        name: 'Jona',
        score: '100',
      });
      window.alert = jest.fn();
      jest.spyOn(window, 'alert').mockImplementation(() => {});

      wrapper.instance().addPlayer();
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      expect(
        window.alert,
        `When the state is set to - {name: "Jona", score: "100"}, and the submit button is clicked, there was not an alert with the message - 'Jona was added with a score of 100'. Make sure you alert the user with the exact message provided.`
      ).toBeCalledWith(`Jona was added with a score of 100`);

      expect(
        mockAddPlayer,
        `App's addPlayer method was not invoked with the correct name and score from the Input's state. Make sure you parseInt score before invoking App's addPlayer() method using props`
      ).toHaveBeenCalledWith('Jona', 100);
    }
  });

  // addPlayer test with invalid inputs
  it("When entering invalid inputs - the Inputs' addPlayer() method should alert the user that the inputs are invalid and not invoke the App's addPlayer method", () => {
    let hasError;
    try {
      wrapper.setState({
        name: '',
        score: '100',
      });
      window.alert = jest.fn();
      jest.spyOn(window, 'alert').mockImplementation(() => {});

      wrapper.instance().addPlayer();
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    } else {
      expect(
        window.alert,
        `When state is set to - {name: "", score: "100"}, and the submit button is clicked, there was not an alert with the message - 'Invalid Name and/or Score'. Make sure to use the validateInputs() method correctly and alert the user with the exact message provided.`
      ).toBeCalledWith(`Invalid Name and/or Score`);

      expect(
        mockAddPlayer,
        `When state is set to - {name: "", score: "100"}, the App's addPlayer method was invoked (even though the input is invalid). Make sure to use the validateInputs() method correctly - when that method returns false you should not invoke the App's addPlayer method`
      ).not.toHaveBeenCalled();
    }
  });
});
