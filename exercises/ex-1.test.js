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
      it("The first div should have an id of Tesla and contain the text, 'Tesla makes 140 every year'", () => {
        const EXPECTED_TEXT1 = "Tesla";
        const EXPECTED_TEXT2 = "140";

        const wrapper = mount(<App />)
        let teslaDiv = wrapper.find('#Tesla')
        expect(teslaDiv.exists(), "There should be a div with an id of 'Tesla'. Did you forget a `return` in your array method?").toBeTruthy()
        let teslaText = teslaDiv.text().trim().toLowerCase();
        expect(teslaText.toLowerCase(), `The text should contain '${EXPECTED_TEXT1}'. Instead we found '${teslaText}'`).toContain(EXPECTED_TEXT1.toLowerCase());
        expect(teslaText.toLowerCase(), `The text should contain '${EXPECTED_TEXT2}'. Instead we found '${teslaText}'`).toContain(EXPECTED_TEXT2.toLowerCase());

      });
      it("The second div should have an id of Microsoft and contain the text, 'Microsoft makes 300 every year'", () => {
        const EXPECTED_TEXT1 = "Microsoft";
        const EXPECTED_TEXT2 = "300";

        const wrapper = mount(<App />);
        let microsoftDiv = wrapper.find('#Microsoft')
        expect(microsoftDiv.exists(), "There should be a div with an id of 'Microsoft'").toBeTruthy()
        let microsoftText = microsoftDiv.text().trim().toLowerCase();
        expect(microsoftText.toLowerCase(), `The text should contain '${EXPECTED_TEXT1}'. Instead we found ${microsoftText}`).toContain(EXPECTED_TEXT1.toLowerCase());
        expect(microsoftText.toLowerCase(), `The text should contain '${EXPECTED_TEXT2}'. Instead we found ${microsoftText}`).toContain(EXPECTED_TEXT2.toLowerCase());
      });

      it("The third div should have an id of Google and contain the text, 'Google makes 600 every year'", () => {
        const EXPECTED_TEXT1 = "Google";
        const EXPECTED_TEXT2 = "600";

        const wrapper = mount(<App />);
        let googleDiv = wrapper.find('#Google')
        expect(googleDiv.exists(), "There should be a div with an id of 'Google'").toBeTruthy()
        let googleText = googleDiv.text().trim().toLowerCase();
        expect(googleText, `The text should contain '${EXPECTED_TEXT1}'. Instead we found ${googleText}`).toContain(EXPECTED_TEXT1.toLowerCase());
        expect(googleText, `The text should contain '${EXPECTED_TEXT2}'. Instead we found ${googleText}`).toContain(EXPECTED_TEXT2.toLowerCase());
    });
})






