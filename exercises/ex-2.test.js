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

describe("exercise2", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('When the route is /directory/wizards, each wizard should have a Link to their specific /directory/wizards/name route', () => {
        const wrapper = render(
            <MemoryRouter initialEntries={['/directory/wizards']} >
                <App />
            </MemoryRouter>);

        const fentitiesContainer = wrapper.find("#fentities-container")
        const link = fentitiesContainer.find("a")

        expect(
            String(link),
            "Merlin should have a Link that that goes to /directory/wizards/Merlin (note the capital M)")
            .toContain('/directory/wizards/Merlin')
    });

    it("When the route is /directory/wizards/Merlin, the Fentity Component should be displayed with data about Merlin", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={['/directory/wizards/Merlin']} >
                <App />
            </MemoryRouter>);

        expect(
            String(wrapper.find('#creature-container').children()),
            "Couldn't find any mention of 'Merlin' on the page when the route was /directory/wizards/Merlin")
            .toContain("Merlin");
    });

    it("When the route is /directory/wizards/Gandalf, the Fentity Component should be displayed with data about Gandalf", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={['/directory/wizards/Gandalf']} >
                <App />
            </MemoryRouter>);

        expect(
            String(wrapper.find('#creature-container').children()),
            "Couldn't find any mention of 'Gandalf' on the page when the route was /directory/wizards/Gandalf")
            .toContain("Gandalf");
    });

    it("When the route is /directory/bestiary/Buckbeak, the Fentity Component should be displayed with data about Buckbeak", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={['/directory/bestiary/Buckbeak']} >
                <App />
            </MemoryRouter>);

        expect(
            String(wrapper.find('#creature-container').children()),
            "Couldn't find any mention of 'Buckbeak' on the page when the route was /directory/bestiary/Buckbeak")
            .toContain("Buckbeak");
    });
})
