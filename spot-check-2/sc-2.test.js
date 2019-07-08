import React from 'react';
import ReactDOM from 'react-dom';
import { SpotCheck2, About, Home } from '../../src/components/SpotCheck2/SpotCheck2';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("spotcheck2", () => {
    it('Application should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<SpotCheck2 />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('You should define a toggle function on your component, which changes the state of showHome', () => {
      const wrapper = mount(<SpotCheck2/>)
        expect(typeof wrapper.instance().toggle, `You should define a method called 'toggle' on your component`)
          .toBe("function")
        let initial = wrapper.state().showHome
        wrapper.instance().toggle()
        expect(wrapper.state().showHome, 'The toggle function should change the state of showHome from true to false or false to true')
          .toBe(!initial)
    });

    it('You should render either the Home or About component based on the showHome state property', () => {
      const wrapper = mount(<SpotCheck2/>)
      wrapper.setState({showHome: true}, () => {
        expect(wrapper.find(Home), 'The Home component should be rendered if the showHome state property is true')
          .toHaveLength(1)
        expect(wrapper.find(About), "The About component should not be rendered if the showHome state property is true")
          .toHaveLength(0)
      })
      wrapper.setState({showHome : false}, () => {
        expect(wrapper.find(Home), 'The Home component should not be rendered if the showHome state property is false')
          .toHaveLength(0)
        expect(wrapper.find(About), "The About component should be rendered if the showHome state property is false")
          .toHaveLength(1)
      })
    })
    it('The toggle button should invoke the toggle method and change the state of showHome', () => {
      const wrapper = mount (<SpotCheck2/>)
      let initialState = wrapper.state().showHome
      wrapper.find('button').first().simulate('click')
      let newState = wrapper.state().showHome
      expect(newState, 'The toggle button should invoke the toggle method and update the state of "showHome')
        .toBe(!initialState)
    })
})






