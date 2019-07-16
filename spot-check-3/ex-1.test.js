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

})