import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import Article from '../../src/components/Article';
import Wardrobe2 from '../../src/components/Wardrobe2';

configure({ adapter: new Adapter() });

describe("spotcheck5", () => {
  it('Application should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('You must render a div on the page for every blue wardrobe object ', () => {
    const wrapper = mount(<App />);
    let spotcheck5 = wrapper.find('#spotcheck-5').children().find(Article)
    expect(spotcheck5, 'There should be two divs rendered on the page').toHaveLength(2)
    let expected1 = 'blue shirt'
    let actual1 = spotcheck5.first().text()
    let expected2 = 'blue pants'
    let actual2 = spotcheck5.at(1).text()
    expect(actual1, `The first div should have the text '${expected1}', instead found ${actual1}`).toContain(expected1)
    expect(actual2, `The second div should have the text '${expected2}', instead found ${actual2}`).toContain(expected2)
  });


  it('The App component should render the Wardrobe2 component', () => {
    const wrapper = mount(<App />);
    let wardrobeComponent = wrapper.find("#spotcheck-5").find(Wardrobe2);
    expect(wardrobeComponent.exists(), 'could not find Wardrobe component').toBeTruthy()
  })

  it('The Wardrobe2 component should render the Article component with props', () => {
    const wrapper = mount(<Wardrobe2 />);
    let articleComponent = wrapper.find(Article);
    expect(articleComponent.exists(), 'Wardrobe2 must render some Article components').toBeTruthy()

    let expectProps1 = { type: "shirt", color: "blue", size: "Medium" }
    let expectProps2 = { type: "pants", color: "blue", size: "Medium" }
    let actualProps1 = articleComponent.first().props()
    let actualProps2 = articleComponent.at(1).props()

    expect(
      JSON.stringify(actualProps1),
      `Props were not passed accurately, expected props to be ${JSON.stringify(expectProps1)}, instead found ${JSON.stringify(actualProps1)} `)
      .toContain(JSON.stringify(expectProps1))

    expect(
      JSON.stringify(actualProps2),
      `Props were not passed accurately, expected props to be ${JSON.stringify(expectProps2)}, instead found ${JSON.stringify(actualProps2)} `)
      .toContain(JSON.stringify(expectProps2))
  })
})
