import React from 'react';
import App from '../../src/App';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ShoppingList } from '../../src/stores/ShoppingList';
import Item from '../../src/components/Item';

configure({ adapter: new Adapter() });

let groceryList
let alerter = () => "wonderland"
window["prompt"] = jest.fn(alerter)

describe("exercise 3", () => {
    beforeAll(() => {
        groceryList = new ShoppingList()
        groceryList.addItem("test")
    })
    it ('The store should have an editItem function that edits the location of a given item', () => {
        groceryList.editItem("test", "wonderland")
        const test = groceryList.list.find(i => i.name === "test")
        expect(test, "the editItem button should only edit the locaiton of an item")
            .toBeDefined()
        expect(test.location, "The store should have an editItem function that edits the location of a given item")
            .toBe("wonderland")
    })
    it ('editItem function should be a MobX action', () => {
        expect(groceryList.editItem.isMobxAction, "editItem function should be a MobX action")
            .toBeTruthy()
    })
    it('The edit button should be rendered per each list item and work on click', () => {
        const wrapper = mount(<App store = {groceryList}/>)
        expect(wrapper.find(Item).find('button').length, "The edit button should be rendered with each item")
            .toBeGreaterThan(0)
        let onClick = wrapper.find(Item).find('button').first().prop('onClick')
        expect(onClick, "The edit button should have an onClick property which prompts you for a new location")
            .toBeDefined()
    })
})