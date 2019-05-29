import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe("exercise3", () => {
    it('dummy test', () => {
        expect(1).toEqual(1);
    })
})






