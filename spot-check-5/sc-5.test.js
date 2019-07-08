import React from 'react';
import ReactDOM from 'react-dom';
import SpotCheck5 from '../../src/components/SpotCheck5/SpotCheck5';
import Task from '../../src/components/SpotCheck5/Task'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';

configure({ adapter: new Adapter() });


describe("spotcheck5", () => {
    it('Application should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SpotCheck5 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('The task data should be in your component state', () => {
      const wrapper = mount(<SpotCheck5/>)
      expect(wrapper.state().tasks, "tasks should be defined in your SpotCheck5 state")
        .toBeDefined()
      expect(wrapper.state().tasks.length, "You should have an array of tasks in your SpotCheck5 component state")
        .toBeGreaterThan(0)
      });
    it('Tasks should be rendered with the Task component, and only if they are not completed', () => {
        const wrapper = mount(<SpotCheck5/>)
        wrapper.setState({tasks: [
            { text: "Take out trash", complete: false },
            { text: "Trash talk Carrie", complete: true },
            { text: "Carry boxes upstairs", complete: false }
          ]}, () => {
            expect(wrapper.find(Task).length, 'Tasks should be rendered with the Task component')
                .toBeGreaterThan(0)
            expect(wrapper.find(Task), 'Only incomplete tasks should be rendered')
                .toHaveLength(2)
          })
    })
    it('Clicking the complete button should update the state of that task from false to true', () => {
        const wrapper = mount(<SpotCheck5/>)
        wrapper.setState({tasks: [
            { text: "Take out trash", complete: false },
            { text: "Trash talk Carrie", complete: true },
            { text: "Carry boxes upstairs", complete: false }
          ]}, async (done) => {
            await wrapper.find('button').first().simulate('click')
            expect(wrapper.state().tasks[0].complete, 'Clicking the complete button of a task should update the state of the task from false to true')
                .toBe(true)
            expect(wrapper.find(Task), 'Once a task is completed it should no longer be rendered')
                .toHaveLength(1)
            done()
          })
    })

})