import React from 'react';
import ReactDOM from 'react-dom';
import Exercise2 from '../../src/components/Exercise2/Exercise2';
import List from '../../src/components/Exercise2/List'
import Conversation from '../../src/components/Exercise2/Conversation'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise2 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should display either the List or Conversation component based on the value of "displayConversation in your component state"', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: null}, () => {
            expect(wrapper.find(List), "The List component should be displayed when displayConversation is null")
                .toHaveLength(1)
            expect(wrapper.find(Conversation), "The Conversation component should NOT be displayed when the value of displayConversation is null")
                .toHaveLength(0)
        })
        wrapper.setState({displayConversation: 'Dad'}, () => {
            expect(wrapper.find(Conversation), "The Conversation component should be displayed when the value of displayConversation is not null")
                .toHaveLength(1)
            expect(wrapper.find(List), "The List component should NOT be displayed when displayConversation is not null")
                .toHaveLength(0)
        })
    });
})