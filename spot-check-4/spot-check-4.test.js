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

    let expectedColor1 = 'red'
    let expectedArticle1 = 'shirt'
    let actual1 = spotcheck4.first().text()
    expect(actual1, `The first Article should contain the text '${expectedColor1}'`).toContain(expectedColor1)
    expect(actual1, `The first Article should contain the text '${expectedArticle1}'`).toContain(expectedArticle1)


    let expectedColor2 = 'blue'
    let expectedArticle2 = 'shirt'
    let actual2 = spotcheck4.at(1).text()
    expect(actual2, `The second Article should contain the text '${expectedColor2}'`).toContain(expectedColor2)
    expect(actual2, `The second Article should contain the text '${expectedArticle2}'`).toContain(expectedArticle2)

    let expectedColor3 = 'blue'
    let expectedArticle3 = 'pants'
    let actual3 = spotcheck4.at(2).text()
    expect(actual3, `The third Article should contain the text '${expectedColor3}'`).toContain(expectedColor3)
    expect(actual3, `The third Article should contain the text '${expectedArticle3}'`).toContain(expectedArticle3)

    let expectedColor4 = 'sapphire'
    let expectedArticle4 = 'accessory'
    let actual4 = spotcheck4.at(3).text()
    expect(actual4, `The fourth Article should contain the text '${expectedColor4}'`).toContain(expectedColor4)
    expect(actual4, `The fourth Article should contain the text '${expectedArticle4}'`).toContain(expectedArticle4)

    let expectedColor5 = 'lilac'
    let expectedArticle5 = 'accessory'
    let actual5 = spotcheck4.at(4).text()
    expect(actual5, `The fifth Article should contain the text '${expectedColor5}'`).toContain(expectedColor5)
    expect(actual5, `The fifth Article should contain the text '${expectedArticle5}'`).toContain(expectedArticle5)
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


