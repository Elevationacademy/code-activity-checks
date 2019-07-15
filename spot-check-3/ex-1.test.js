import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import { mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ShoppingList} from '../../src/stores/ShoppingList'
import Item from '../../src/components/Item';

configure({ adapter: new Adapter() });

let gorceryList
describe("spotcheck3", () => {
    beforeAll( () => {
        gorceryList = new ShoppingList()
        gorceryList.list.push({name: "test", completed: false})
    })
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App store ={gorceryList} />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
    // it ('store should have a checkItem function that updates a given items completed property', () => {
    //     const checkItem = gorceryList.checkItem
    //     checkItem("test")
    //     const test = gorceryList.list.find(i => i.name === "test")
    //     expect(test.completed, 'checkItem should change the completed value of a specified item')
    //         .toBeTruthy()
    // })
    // it ('checkItem function should be a MobX action', () => {
    //     const checkItem = gorceryList.checkItem
    //     expect(checkItem.isMobxAction, "checkItem function should be a MobX action")
    //         .toBeTruthy()
    // })
    // it ('Your input should have an onClick which invokes the checkItem function', () => {
    //     const wrapper = mount(<App store ={gorceryList}/>)
    //     expect(wrapper.find(Item).length, "each Item should be rendered though the Item Component in your app")
    //         .toBeGreaterThan(0)
    //     let selected = wrapper.find(Item).first().find('div').props().className
    //     expect(selected, 'the parent div returned from your item should have a className property')
    //         .toBeTruthy()
    //     console.log(selected)
    //     wrapper.find(Item).first().find('input').first().simulate('click')
    //     expect(wrapper.find(Item).first().find('div').props().className,
    //         "clicking a list input should invoke the checkItem function, and change the completed status of the item, which should change the parent div of your Item component")
    //         .not.toBe(selected)
    // })

})