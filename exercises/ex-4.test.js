import React from 'react';
import ReactDOM from 'react-dom';
import Exercise2 from '../../src/components/Exercise2/Exercise2';
import List from '../../src/components/Exercise2/List'
import Contact from '../../src/components/Exercise2/Contact'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise4", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise2 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should map each contact into a Contact component that displays the name of the contact', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: null}, () => {
            expect(wrapper.find(Contact).length, 'you should have contact components, mapped out from your contacts props')
                .toBeGreaterThan(0)
            expect(wrapper.find(List).props(), 'you should be passing props to your List components')
                .toBeDefined()
            let stringProps = JSON.stringify(wrapper.find(List).props())
            let contactText1 = wrapper.find(Contact).first().text()
            expect(stringProps, `expected the name of a contact to be displayed in one of your Contact components, instead you displayed ${contactText1}`)
                .toContain(contactText1)
        })
    });
})