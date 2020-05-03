import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import { Route } from 'react-router-dom';

import { App } from '../../src/App';
import Home from '../../src/components/Home';
import Inputs from '../../src/components/Inputs';
import LeaderBoard from '../../src/components/LeaderBoard';

configure({ adapter: new Adapter() });

// App component test
describe('exercise1', () => {
  let pathMap = {};
  let wrapper;

  try {
    wrapper = mount(<App />);
  } catch (e) {
    expect(
      false,
      'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
    ).toBeTruthy();
  }

  // Link tests
  let links, hasError;
  try {
    links = wrapper.find('a');
  } catch (e) {
    hasError = true;
  }

  if (hasError) {
    expect(
      false,
      'Hmm, seems the code you submitted is crashing. Please check things like syntax and try again.'
    ).toBeTruthy();
  } else {
    let linksStr = '';
    for (let i = 0; i < links.length; i++) {
      linksStr += links.at(i).instance().href;
    }

    it('The App component should render 3 Links', () => {
      expect(
        links.length,
        `There aren't 3 Links in the App component, instead it renders ${links.length} Links`
      ).toBe(3);
    });

    it('The App component should render a Link to - /home', () => {
      expect(
        linksStr,
        `Could not find a Link to /home. Please check your Links and try again`
      ).toContain('/home');
    });

    it('The App component should render a Link to - /inputs', () => {
      expect(
        linksStr,
        `Could not find a Link to /inputs. Please check your Links and try again`
      ).toContain('/inputs');
    });

    it('The App component should render a Link to - /leaderboard', () => {
      expect(
        linksStr,
        `Could not find a Link to /leaderboard. Please check your Links and try again`
      ).toContain('/leaderboard');
    });
  }

  // Routes tests
  beforeAll(() => {
    pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      if (routeProps.component) {
        pathMap[routeProps.path] = routeProps.component;
      } else if (routeProps.render) {
        pathMap[routeProps.path] = routeProps.render({}).type;
      }
      return pathMap;
    }, {});
  });

  it('You should render the Home component when accessing the /home route', () => {
    expect(
      pathMap['/home'],
      'Could not find a Home component when accessing the /home route, make sure your /home Route is rendering the Home component.'
    ).toBe(Home);
  });
  it('You should render the Inputs component when accessing the /inputs route', () => {
    expect(
      pathMap['/inputs'],
      'Could not find an Inputs component when accessing the /inputs route, make sure your /inputs Route is rendering the Inputs component.'
    ).toBe(Inputs);
  });
  it('You should render the LeaderBoard component when accessing the /leaderboard route', () => {
    expect(
      pathMap['/leaderboard'],
      'Could not find a LeaderBoard component when accessing the /leaderboard route, make sure your /leaderboard Route is rendering the LeaderBoard component.'
    ).toBe(LeaderBoard);
  });

  // addPlayer() method Tests
  wrapper.state().players = []
  wrapper.instance().counter = 0

  try {
    wrapper.instance().addPlayer('John', 90)
  } catch (e) {
    hasError = true;
  }

  if (hasError) {
    expect(
      false,
      'There was a problem while trying to invoke the addPlayer method. Check things like syntax and try again.'
    ).toBeTruthy();
  } else {

    it('The addPlayer method should increase the App component\'s counter property by 1', () => {
      expect(
        wrapper.instance().counter,
        `After reassigning the App's counter property to 0 and invoking the addPlayer() method, expected the counter property to be 1, but instead got ${wrapper.instance().counter}`
      ).toBe(1);
    });

    it('The addPlayer method should add a player object to players array in state the App\s state', () => {
      expect(
        wrapper.state().players.length,
        `After reassigning the players array in state to [] (an empty array) and invoking the addPlayer() method, expected for the players array to have length of 1, but instead got ${wrapper.state().players.length}`
      ).toBe(1);
    });

    it('The addPlayer method should add a player object with a given name, score and id attributes', () => {
      expect(
        wrapper.state().players[0],
        `After reassigning the App's counter property to 0 and invoking the addPlayer method with 'John' and 90 as name and score, expected the players array to contain the following object - {id: 1, name: 'John', score: 90}. Instead the players array was - ${JSON.stringify(wrapper.state().players)}`
      ).toEqual({ id: 1, name: 'John', score: 90 });
    });
  }
});
