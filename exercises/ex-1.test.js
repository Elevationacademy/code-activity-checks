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

    it('should have 3 Links in the App component', () => {
      expect(
        links.length,
        `There aren't 3 Links in the App component, instead it has ${links.length} Links`
      ).toBe(3);
    });

    it('should have a Link to - /home', () => {
      expect(
        linksStr,
        `Could not find a Link to /home. Please check your Links and try again`
      ).toContain('/home');
    });

    it('should have a Links to - /inputs', () => {
      expect(
        linksStr,
        `Could not find a Link to /inputs. Please check your Links and try again`
      ).toContain('/inputs');
    });

    it('should have a Links to - /leaderboard', () => {
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

  it('You should render the Home component for the /home route', () => {
    expect(
      pathMap['/home'],
      'Could not find a Home component for the /home route, make sure your /home Route is rendering the Home component.'
    ).toBe(Home);
  });
  it('You should render the Inputs component for the /inputs route', () => {
    expect(
      pathMap['/inputs'],
      'Could not find an Inputs component for the /inputs route, make sure your /inputs Route is rendering the Inputs component.'
    ).toBe(Inputs);
  });
  it('You should render the LeaderBoard component for the /leaderboard route', () => {
    expect(
      pathMap['/leaderboard'],
      'Could not find a LeaderBoard component for the /leaderboard route, make sure your /leaderboard Route is rendering the LeaderBoard component.'
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
      'There was a problem while trying to invoke the addPlayer method'
    ).toBeTruthy();
  } else {

    it('addPlayer method should increase counter by 1', () => {
      expect(
        wrapper.instance().counter,
        `Expected for the counter property to be 1 after initializing it to 0 and invoking addPlayer() method, but instead got ${wrapper.instance().counter}`
      ).toBe(1);
    });

    it('addPlayer method should add a player object to players array in state', () => {
      expect(
        wrapper.state().players.length,
        `Expected for a players array length of 1 after initializing it to [] (empty array) and invoking addPlayer() method, but instead got ${wrapper.state().players.length}`
      ).toBe(1);
    });

    it('addPlayer method should add a player object with a given name, score and id attributes', () => {
      expect(
        wrapper.state().players[0],
        `Expected the players array to contain an object of - {id: 1, name: 'John', score: 90} after initializing the counter to 0 and invoking the addPlayer method with 'John' and 90 as name and score. Instead got the following players array - ${JSON.stringify(wrapper.state().players)}`
      ).toEqual({id: 1, name: 'John', score: 90});
    });
  }
});
