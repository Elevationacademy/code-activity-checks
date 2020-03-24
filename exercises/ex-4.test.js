import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Player from '../../src/components/Player';

configure({ adapter: new Adapter() });

// Player component test
describe('exercise4', () => {
  it('Player should have 2 td tags inside the tr tag: the first one with the name attribute and second with the score attribute (both passed from LeaderBoard with props)', () => {
    try {
      const p = { id: 1, name: 'Jona', score: '100' };
      const wrapper = shallow(<Player key={p.id} name={p.name} score={p.score} />);
      expect(
        wrapper.props().children[0],
        `When passing name attribute with the value of 'Jona', the first child tag should be - <td>Jona</td>. Make sure that the first td tag inside tr tag is the player's name, and that you're passing the name property from LeaderBoard to Player, using props`
      ).toEqual(<td>Jona</td>);
      expect(
        wrapper.props().children[1],
        `When passing score attribute with the value of 100, the second child tag should be - <td>100</td>. Make sure that the second td tag inside tr tag is the player's score, and that you're passing the score property from LeaderBoard to Player, using props`
      ).toEqual(<td>100</td>);
    } catch (e) {
      expect(false, 'Player do not have 2 td tags inside the tr tag').toBeTruthy()
    }
  });
});
