import React from 'react';
import ReactDOM from 'react-dom';
import Exercise1 from '../../src/components/Exercise1/Exercise1';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';
import { builtinModules } from 'module';

configure({ adapter: new Adapter() });

describe("exercise1", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise1 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should define a method shiftImageBack on your Exercise1 component', () => {
        const wrapper = mount(<Exercise1/>)
        expect(typeof wrapper.instance().shiftImageBack, "You should define a method shiftImageBack on your Exercise1 component")
            .toBe('function')
    });
    it('You should define a method shiftImageForward on your Exercise1 component', () => {
        const wrapper = mount(<Exercise1/>)
        expect(typeof wrapper.instance().shiftImageForward, "You should define a method shiftImageForward on your Exercise1 component")
            .toBe('function')
    });
    it("You should render a back button with the class '.back' and a forward button with the class '.forward'", () => {
        const wrapper = mount(<Exercise1/>)
        let firstButton = wrapper.find('button').at(0)
        let secondButton = wrapper.find('button').at(1)
        expect(firstButton, "You should render two buttons: a back button and a forward button")
            .toHaveLength(1)
        expect(secondButton, "You should render two buttons: a back button and a forward button")
            .toHaveLength(1)
    })

    it("The forward and back buttons should update the state's current image accordingly", () => {
        const wrapper = mount(<Exercise1/>)
        expect(wrapper.find('button').length, "You should render two buttons: a back button and a forward button")
            .toBe(2)
        let firstButton = wrapper.find('button').at(0)
        let secondButton = wrapper.find('button').at(1)
        expect(firstButton.props().onClick, 'each button should have an onClick function')
            .toBeDefined()
        expect(secondButton.props().onClick, 'each button should have an onClick function')
            .toBeDefined()

        wrapper.setState({currentImg: 1}, async (done) => {
            await firstButton.simulate('click')
            await console.log(wrapper.state().currentImg)
            expect(wrapper.state().currentImg, 'Clicking the forward button should increase the states currentImg by 1')
                .not.toBe(1)
            await secondButton.simulate('click')
            console.log(wrapper.state().currentImg)
            expect(wrapper.state().currentImg, 'Clicking the back button should decrease the states currentImage by 1')
                .toBe(1)
            done()
        })
    })
    it("The image rendered should be the image in the 'currentImg' position of the 'images' array", () => {
        const wrapper = mount(<Exercise1/>)
        wrapper.setState({currentImg: 1}, () => {
            expect(wrapper.find('img'), 'You should have a single img tag to render the picture in')
                .toHaveLength(1)
            let imgUrl = wrapper.find('img').props().src
            expect(imgUrl, 'The image rendered should be the image in the currentImg position of the images array')
                .toBe(wrapper.state().images[wrapper.state().currentImg])
        })
    })

})