import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../../src/App';
import Home from '../../src/components/Home';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';
import { MemoryRouter } from 'react-router-dom';


configure({ adapter: new Adapter() });

describe("exercise1", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Wizards link should route to wizards directory', () => {
        const wrapper = render(<MemoryRouter><Home /></MemoryRouter>);
        expect(String(wrapper.find("#wizards").find("a")),
            "The #wizard element should have a Link inside of it that leads to /directory/wizards")
            .toContain('/directory/wizards');
    });

    it('Bestiary link should route to bestiary directory', () => {
        const wrapper = render(<MemoryRouter><Home /></MemoryRouter>);
        expect(String(wrapper.find("#bestiary").find("a")),
            "The #bestiary element should have a Link inside of it that leads to /directory/bestiary")
            .toContain('/directory/bestiary');
    });
})
