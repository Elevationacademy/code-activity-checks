import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Player from '../../src/components/Player';

configure({ adapter: new Adapter() });

// Player component test
describe('exercise4', () => {
  it('The Player component should have 2 td tags inside the tr tag: the first one with the player\'s name and the second with the player\'s score (both passed from LeaderBoard as props)', () => {
    const p = { id: 1, name: 'Jona', score: '100' };
    let wrapper;
    try {
      wrapper = shallow(<Player key={p.id} name={p.name} score={p.score} />);
    } catch (e) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    }

    let name, score, hasError;
    try {
      name = wrapper.props().children[0];
      score = wrapper.props().children[1];
    } catch (e) {
      hasError = true;
    }

    if (hasError) {
      expect(
        false,
        'Could not find any properties for the Player component. Make sure you render the required <td> tags with the name and score of the player'
      ).toBeTruthy();
    } else {
      expect(
        name,
        `When rendering a player with the name 'Jona', the first child tag should be - <td>Jona</td>. Make sure that the first td tag inside the tr tag is the player's name, and that you're passing the name property from LeaderBoard to Player using props`
      ).toEqual(<td>Jona</td>);
      expect(
        score,
        `When rendering a player with the score 100, the second child tag should be - <td>100</td>. Make sure that the second td tag inside the tr tag is the player's score, and that you're passing the score property from LeaderBoard to Player using props`
      ).toEqual(<td>100</td>);
    }
  });
});
