import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

import LeaderBoard from '../../src/components/LeaderBoard';
import Player from '../../src/components/Player';

configure({ adapter: new Adapter() });

// LeaderBoard component test
describe('exercise3', () => {
  let wrapper;

  beforeAll(() => {
    let state = {
      players: [
        { id: 1, name: 'Jona', score: 100 },
        { id: 2, name: 'Danny', score: 98 },
        { id: 3, name: 'Julia', score: 103 },
      ],
    };

    try {
      wrapper = mount(<LeaderBoard players={state.players} />);
    } catch (e) {
      expect(
        false,
        'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
      ).toBeTruthy();
    }
  });

  // Validate that Player component is being used
  it("The LeaderBoard component should render the Player component for every player in the App's players state array", () => {
    let playerComponent, hasError;
    try {
      playerComponent = wrapper.find('.leaderboard').find(Player);
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
        playerComponent.exists(),
        'Could not find an Player component rendered by the LeaderBoard component. Make sure the LeaderBoard is rendering a Player component for every player in the App\'s players state array.'
      ).toBeTruthy();
    }
  });

  // Validate that the players array is rendered in the right order (sorted)
  it("The LeaderBoard component should render the players array (passed from the App's state) sorted by their scores", () => {
    let firstPlayerDetails, secondPlayerDetails, thirdPlayerDetails, hasError;

    try {
      firstPlayerDetails = wrapper.find('.leaderboard').find('tbody').children().at(1).html();
      secondPlayerDetails = wrapper.find('.leaderboard').find('tbody').children().at(2).html();
      thirdPlayerDetails = wrapper.find('.leaderboard').find('tbody').children().at(3).html();
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
        firstPlayerDetails,
        `When given a players' array of [
          { id: 1, name: 'Jona', score: 100 },
          { id: 2, name: 'Danny', score: 98 },
          { id: 3, name: 'Julia', score: 103 }
        ], the second <tr> in <tbody> should contain - <td>Julia</td><td>103</td> - because Julia has the highest score (the first <tr> is for the Name and Score headers). Instead we got - ${firstPlayerDetails} for the first Player. Make sure to use a sorter function and to render the player's details in the right order (name first and score second) without any attributes for the <td> tags.`
      ).toContain('<td>Julia</td><td>103</td>');

      expect(
        secondPlayerDetails,
        `When given a players' array of [
          { id: 1, name: 'Jona', score: 100 },
          { id: 2, name: 'Danny', score: 98 },
          { id: 3, name: 'Julia', score: 103 }
        ], the third <tr> in <tbody> should contain - <td>Jona</td><td>100</td> - because Jona has the second highest score. Instead we got - ${secondPlayerDetails} for the second Player. Make sure to use a sorter function and to render the player's details in the right order (name first and score second) without any attributes for the <td> tags.`
      ).toContain('<td>Jona</td><td>100</td>');

      expect(
        thirdPlayerDetails,
        `When given a players' array of [
          { id: 1, name: 'Jona', score: 100 },
          { id: 2, name: 'Danny', score: 98 },
          { id: 3, name: 'Julia', score: 103 }
        ], the fourth <tr> in <tbody> should contain - <td>Danny</td><td>98</td> - because Danny has the lowest score. Instead we got - ${thirdPlayerDetails} for the third Player. Make sure to use a sorter function and to render the player's details in the right order (name first and score second) without any attributes for the <td> tags.`
      ).toContain('<td>Danny</td><td>98</td>');
    }
  });
});
