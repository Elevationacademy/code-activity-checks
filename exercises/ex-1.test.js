
import { configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ShoppingList } from '../../src/stores/ShoppingList';

configure({ adapter: new Adapter() });

let groceryList
describe("exercise1", () => {
    beforeAll(() => {
        groceryList = new ShoppingList()
    })
    it ('store should have an addItem function that adds a new Item to the stores list property', () => {
        const addItem = groceryList.addItem
        expect(addItem, "store should have an addItem function").toBeDefined()
        addItem("test")
        const test = groceryList.list.find(i => i.name === "test")
        expect(test, "the addItem function should add a new Item to the store's list property").toBeTruthy()
    })
    it ('addItem function should be a MobX action', () => {
        const addItem = groceryList.addItem
        expect(addItem, "store should have an addItem function").toBeDefined()
        expect(addItem.isMobxAction, "the addItem function should be a Mobx action").toBeTruthy()
    })
})