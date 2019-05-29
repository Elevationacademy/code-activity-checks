import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise1", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
      });      
      it('The first div should say, Tesla makes 140 every year', () => {
          const EXPECTED_TEXT = "Tesla makes 140 every year";
          const wrapper = mount(<App />)
          let teslaDiv = wrapper.find('#Tesla')
          expect(teslaDiv.exists(), "There should be a div with an id of 'Tesla'. Did you forget a `return` in your array method?").toBeTruthy()
          let teslaText = teslaDiv.text().trim().toLowerCase();
          expect(teslaText.toLowerCase(), `The text should read '${EXPECTED_TEXT}'. Instead we found '${teslaText}'`).toBe(EXPECTED_TEXT.toLowerCase());
      });     
      it('The second div should say, Microsoft makes 300 every year', () => {
        const EXPECTED_TEXT = "Microsoft makes 300 every year";
        const wrapper = mount(<App />);          
        let microsoftDiv = wrapper.find('#Microsoft')
        expect(microsoftDiv.exists(), "There should be a div with an id of 'Microsoft'").toBeTruthy()
        let microsoftText = microsoftDiv.text().trim().toLowerCase();
        expect(microsoftText.toLowerCase(), `The text should read '${EXPECTED_TEXT}'. Instead we found ${microsoftText}`).toBe(EXPECTED_TEXT.toLowerCase());
      });
 
      it('The third div should say, Google makes 600 every year', () => {
        const EXPECTED_TEXT = "Google makes 600 every year";
        const wrapper = mount(<App />); 
        let googleDiv = wrapper.find('#Google')
        expect(googleDiv.exists(), "There should be a div with an id of 'Google'").toBeTruthy()
        let googleText = googleDiv.text().trim().toLowerCase();
        expect(googleText, `The text should read '${EXPECTED_TEXT}'. Instead we found ${googleText}`).toBe(EXPECTED_TEXT.toLowerCase());
    });
})






