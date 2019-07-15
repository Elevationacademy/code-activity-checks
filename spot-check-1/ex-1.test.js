import Adapter from 'enzyme-adapter-react-16';
import {ShoppingList} from '../../src/stores/ShoppingList'
import { isObservable } from 'mobx' 
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

let groceryList
describe("spotcheck1", () => {
    beforeAll(()=> {
        groceryList = new ShoppingList()
    })
    it ('groceryList class store should have an observable property "list"', () => {
        const store = groceryList;
        expect(store, "You should have exported a class groceryList (make sure not to delete code you were given)")
            .toBeDefined()
        expect(isObservable(store.list), "the list property should be observable")
            .toBeTruthy()
    })
})