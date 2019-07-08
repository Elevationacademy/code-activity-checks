import React from 'react';
import ReactDOM from 'react-dom';
import SpotCheck4 from '../../src/components/SpotCheck4/SpotCheck4';
import Quote from '../../src/components/SpotCheck4/Quote'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });


describe("spotcheck4", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SpotCheck4 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('You should write a likeQuote function which increase the likes of the quote with the given id', () => {
      const wrapper = mount(<SpotCheck4/>)
        let initialQuote1 = wrapper.state().quotes[1].likes
        let initialQuote0 = wrapper.state().quotes[0].likes
        wrapper.instance().likeQuote("50xx11")
        let updatedState = wrapper.state().quotes
        expect(updatedState[1].likes, "The likeQuote method should increase the likes of quote with the given id")
            .toBe(initialQuote1+1)
        expect(updatedState[0].likes, "The likes of quotes that do not have the given id should stay the same")
            .toBe(initialQuote0)
    });
    it('You should be passing down a quote and likeQuote prop to your Quote component', () => {
        const wrapper = mount(<SpotCheck4/>)
        let quoteProps = JSON.stringify(wrapper.find(Quote).first().props())
        console.log(quoteProps)
        expect(quoteProps, "Each quote component should have props")
            .toBeDefined()
        expect(quoteProps, "You should pass a prop with the quote object down to your Quote component")
            .toContain("butter")
    })
    it("Each quote should have a span with the class 'add' which, when clicked, invokes the likeQuote method with the quote's ID", () => {
        const wrapper = mount(<SpotCheck4/>)
        expect(wrapper.find(Quote), `You should be rendering each separate quote using the Quote component. 
                                    We expected 3 quotes, you printed ${wrapper.find(Quote).length}`)
            .toHaveLength(3)
        expect(wrapper.find(Quote).first().props(), `Each Quote component should be passed props`)
            .toBeDefined()
        let quoteLength = wrapper.find(Quote).length 
        for (let i =0; i<quoteLength; i++) {
            let initialLikes = wrapper.state().quotes[i].likes
            wrapper.find('.add').at(i).simulate('click')
            let actualQuote = wrapper.state().quotes[i].likes
            let expectedQuote = initialLikes+1
            expect(actualQuote, `Expected the first quote to have ${expectedQuote} likes, instead had ${actualQuote} likes`)
                .toBe(expectedQuote)
        }
    })
})






