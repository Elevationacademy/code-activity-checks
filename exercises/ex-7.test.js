import React from 'react';
import ReactDOM from 'react-dom';
import Exercise2 from '../../src/components/Exercise2/Exercise2';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';
import List from '../../src/components/Exercise2/List';
import Conversation from '../../src/components/Exercise2/Conversation';

configure({ adapter: new Adapter() });

describe("exercise7", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise2 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should render a back button on your Conversation component', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: "Dad"}, () => {
            let conversation = wrapper.find(Conversation)
            expect(conversation, 'You should have a conversation component when the displayConversation state property is not null')
                .toBeDefined()
            expect(conversation.find('button'), 'You should render a single button in your Conversation component')
                .toHaveLength(1)

        })
    })
    it('Clicking the back button should reset the state of displayConverstion to null', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: "Dad"}, async (done) => {
            let button = wrapper.find("button")
            await button.simulate("click")
            let displayConversation = wrapper.state().displayConversation
            
            expect(displayConversation, `Clicking the back button should set the state of the displayConversation property to null. After clicking the back button, your displayConversation property is ${displayConversation}`)
                .toBeNull()
            expect(wrapper.find(List), 'Clicking the back button should rerender the List component')
                .toHaveLength(1)
            done()
        })
    })
})