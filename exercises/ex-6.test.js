import React from 'react';
import ReactDOM from 'react-dom';
import Exercise2 from '../../src/components/Exercise2/Exercise2';
import Conversation from '../../src/components/Exercise2/Conversation'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise6", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise2 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('Your Conversation component should render a div for each message', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: "Dad"}, () => {
            let convoDivs = wrapper.find(Conversation).children()
            expect(convoDivs.children().find("div"), 'you should print each message in a separate div in your conversation Component. There should only be as many divs as there are messages')
                .toHaveLength(4)
        })
    })
    it('You should print Me when the sender is "self" and the persons name when the sender is "other"', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: "Dad"}, () => {
            expect(wrapper.find(Conversation).html(), 
                'When the displayConversation property is set to Dad, you should see messages from "Dad" when the "sender" is "other"')
                .toContain("Dad")
            expect(wrapper.find(Conversation).html(),
                'You should always see messages sent from "Me" when the "sender" of the message is self')
                .toContain("Me")
            let dadMessageIndex = wrapper.find(Conversation).html().indexOf("Dad")
            let meMessageIndex = wrapper.find(Conversation).html().indexOf("Me")
            expect(dadMessageIndex,
                "When the displayConversation is set to 'Dad', the first message should be from 'Dad'")
                .toBeLessThan(meMessageIndex)
        })
        wrapper.setState({displayConversation: "Laura"}, () => {
            expect(wrapper.find(Conversation).html(), 
                'When the displayConversation property is set to Laura, you should see messages from "Laura" when the "sender" is "other"')
                .toContain("Laura")
            expect(wrapper.find(Conversation).html(),
                'You should always see messages sent from "Me" when the "sender" of the message is self')
                .toContain("Me")
            let dadMessageIndex = wrapper.find(Conversation).html().indexOf("Laura")
            let meMessageIndex = wrapper.find(Conversation).html().indexOf("Me")
            expect(dadMessageIndex,
                "When the displayConversation is set to 'Laura', the first message should be from 'Me'")
                .toBeGreaterThan(meMessageIndex)
        })
    })
})

