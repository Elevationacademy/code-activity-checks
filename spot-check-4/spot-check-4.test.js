import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import Wardrobe from '../../src/components/Wardrobe';
import Article from '../../src/components/Article';
import App from '../../src/App';

configure({ adapter: new Adapter() });

describe("spotcheck4", () => {
  it('Application should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('You must render an Article instance for each wardrobe object ', () => {
    const wrapper = mount(<App />);
    let spotcheck4 = wrapper.find('#spotcheck-4').children().find(Article)
    expect(spotcheck4, 'There should be 5 Article instances').toHaveLength(5)

    let expected1 = 'red shirt'
    let actual1 = spotcheck4.first().text()
    expect(actual1, `The first Article should have the text '${expected1}, instead found ${actual1}'`).toContain(expected1)

    let expected2 = 'blue shirt'
    let actual2 = spotcheck4.at(1).text()
    expect(actual2, `The second Article should have the text '${expected2}', instead found ${actual2}`).toContain(expected2)

    let expected3 = 'blue pants'
    let actual3 = spotcheck4.at(2).text()
    expect(actual3, `The third Article should have the text '${expected3}', instead found ${actual3}`).toContain(expected3)

    let expected4 = 'sapphire accessory'
    let actual4 = spotcheck4.at(3).text()
    expect(actual4, `The fourth Article should have the text '${expected4}', instead found ${actual4}`).toContain(expected4)

    let expected5 = 'lilac accessory'
    let actual5 = spotcheck4.at(4).text()
    expect(actual5, `The fifth Article should have the text '${expected5}', instead found ${actual5}`).toContain(expected5)
  });

  it('The App component should render the Wardrobe component', () => {
    const wrapper = mount(<App />);
    let wardrobeComponent = wrapper.find("#spotcheck-4").find(Wardrobe);
    expect(wardrobeComponent.exists(), 'could not find Wardrobe component').toBeTruthy()
  })

  it('The Wardrobe component should render the Article component with props', () => {
    const wrapper = mount(<Wardrobe />);
    let articleComponent = wrapper.find(Article);
    expect(articleComponent.exists(), 'Wardrobe must render some Article components').toBeTruthy()

    let expectProps1 = { type: "shirt", color: "red", size: "Medium" }
    let expectProps2 = { type: "shirt", color: "blue", size: "Medium" }
    let expectProps3 = { type: "pants", color: "blue", size: "Medium" }
    let actualProps1 = articleComponent.first().props()
    let actualProps2 = articleComponent.at(1).props()
    let actualProps3 = articleComponent.at(2).props()

    expect(
      JSON.stringify(actualProps1),
      `Props were not passed accurately, expected props to be ${JSON.stringify(expectProps1)}, instead found ${JSON.stringify(actualProps1)} `)
      .toContain(JSON.stringify(expectProps1))

    expect(
      JSON.stringify(actualProps2),
      `Props were not passed accurately, expected props to be ${JSON.stringify(expectProps2)}, instead found ${JSON.stringify(actualProps2)} `)
      .toContain(JSON.stringify(expectProps2))

    expect(
      JSON.stringify(actualProps3),
      `Props were not passed accurately, expected props to be ${JSON.stringify(expectProps3)}, instead found ${JSON.stringify(actualProps3)} `)
      .toContain(JSON.stringify(expectProps3))
  })
})


