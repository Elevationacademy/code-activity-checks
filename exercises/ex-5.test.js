import React from 'react';
import ReactDOM from 'react-dom';
import Exercise2 from '../../src/components/Exercise2/Exercise2';
import Contact from '../../src/components/Exercise2/Contact'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise5", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise2 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should define a "displayConvo" method that updates the state value of displayConversation', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.instance().displayConvo("Dad")
        expect(wrapper.state().displayConversation, 'The displayConvo method should update the state value of displayConversation to a given name')
            .toBe("Dad")
    });
    it('Each Contact should update the state of displayConversation to be the name of that contact', () => {
        const wrapper = mount(<Exercise2/>)
        wrapper.setState({displayConversation: null}, async (done) => {
            await wrapper.find(Contact).first().simulate('click')
            expect(wrapper.state().displayConversation, 'clicking on a contact should invoke the displayConvo method')
                .not.toBeNull()
            done()
        })
    })
})