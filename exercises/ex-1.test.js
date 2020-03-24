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
let pathMap = {};
describe('exercise1', () => {
  const wrapper = mount(<App />);

  // Link tests
  it('should have first Link to "/"', () => {
    try {
      expect(
        wrapper
          .find('a')
          .at(0)
          .instance()
          .href.slice(-1),
        'First Link is not to - /. Make sure you use a Link to - /'
      ).toBe('/');
    } catch (e) {
      expect(false, 'First Link is not to - /. Make sure you use a Link to - /').toBeTruthy();
    }
  });
  it('should have second Link to "/inputs"', () => {
    try {
      expect(
        wrapper
          .find('a')
          .at(1)
          .instance().href,
        'Second Link is not to - /inputs. Make sure you use a Link to - /inputs'
      ).toContain('/inputs');
    } catch (e) {
      expect(
        false,
        'Second Link is not to - /inputs. Make sure you use a Link to - /inputs'
      ).toBeTruthy();
    }
  });

  it('should have third Link to "/leaderboard"', () => {
    try {
      expect(
        wrapper
          .find('a')
          .at(2)
          .instance().href,
        'Third Link is not to - /leaderboard. Make sure you use a Link to - /leaderboard'
      ).toContain('/leaderboard');
    } catch (e) {
      expect(
        false,
        'Third Link is not to - /leaderboard. Make sure you use a Link to - /leaderboard'
      ).toBeTruthy();
    }
  });

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

  it('should show Home component for / router', () => {
    expect(pathMap['/'], 'Could not find a Home component for / router').toBe(Home);
  });
  it('should show Inputs component for /inputs router', () => {
    expect(pathMap['/inputs'], 'Could not find a Inputs component for /inputs router').toBe(Inputs);
  });
  it('should show LeaderBoard component for /leaderboard router', () => {
    expect(
      pathMap['/leaderboard'],
      'Could not find a LeaderBoard component for /leaderboard router'
    ).toBe(LeaderBoard);
  });
});
