import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

import LeaderBoard from '../../src/components/LeaderBoard';
import Player from '../../src/components/Player';

configure({ adapter: new Adapter() });

// LeaderBoard component test
describe('exercise3', () => {
  let wrapper;

  beforeEach(() => {
    let state = {
      players: [
        { id: 1, name: 'Jona', score: 100 },
        { id: 2, name: 'Danny', score: 98 },
        { id: 3, name: 'Julia', score: 103 }
      ]
    };
    wrapper = mount(<LeaderBoard players={state.players} />);
  });

  // Validate that Player component is being used
  it("The LeaderBoard component should render the Player component for every player in the App's state's players array", () => {
    let playerComponent = wrapper.find('.leaderboard').find(Player);
    expect(
      playerComponent.exists(),
      'could not find an Player component rendered by the LeaderBoard component'
    ).toBeTruthy();
  });

  // Validate that the players array is rendered in the right order (sorted)
  it("The LeaderBoard component should render the players array (passed from App's state) sorted by their scores", () => {
    try {
      let firstPlayerDetails = wrapper
        .find('.leaderboard')
        .find('tbody')
        .children()
        .at(1)
        .html();
      expect(
        firstPlayerDetails,
        `When given a players' array of [
          { id: 1, name: 'Jona', score: 100 },
          { id: 2, name: 'Danny', score: 98 },
          { id: 3, name: 'Julia', score: 103 }
        ], the second <tr> in <tbody> should contain - <td>Julia</td><td>103</td> - because Julia has the highest score (the first <tr> is for the Name and Score headlines). Instead we got for the first Player - ${firstPlayerDetails}. Make sure to use a sorted function and to render the player's details in the right order (name first and score second) without any attributes for the <td> tags.`
      ).toContain('<td>Julia</td><td>103</td>');

      let secondPlayerDetails = wrapper
        .find('.leaderboard')
        .find('tbody')
        .children()
        .at(2)
        .html();
      expect(
        secondPlayerDetails,
        `When given a players' array of [
          { id: 1, name: 'Jona', score: 100 },
          { id: 2, name: 'Danny', score: 98 },
          { id: 3, name: 'Julia', score: 103 }
        ], the third <tr> in <tbody> should contain - <td>Jona</td><td>100</td> - because Jona has the second highest score. Instead we got for the second Player - ${secondPlayerDetails}. Make sure to use a sorted function and to render the player's details in the right order (name first and score second) without any attributes for the <td> tags.`
      ).toContain('<td>Jona</td><td>100</td>');

      let thirdPlayerDetails = wrapper
        .find('.leaderboard')
        .find('tbody')
        .children()
        .at(3)
        .html();
      expect(
        thirdPlayerDetails,
        `When given a players' array of [
          { id: 1, name: 'Jona', score: 100 },
          { id: 2, name: 'Danny', score: 98 },
          { id: 3, name: 'Julia', score: 103 }
        ], the second <tr> in <tbody> should contain - <td>Danny</td><td>98</td> - because Danny has the lowest score. Instead we got for the third Player - ${thirdPlayerDetails}. Make sure to use a sorted function and to render the player's details in the right order (name first and score second) without any attributes for the <td> tags.`
      ).toContain('<td>Danny</td><td>98</td>');
    } catch (e) {
      expect(
        false,
        "The LeaderBoard component is not rendering the players array (passed from App's state) sorted by their scores. Make sure you mapping the sortedPlayers array, return a Player component for each player with name and score"
      ).toBeTruthy();
    }
  });
});
