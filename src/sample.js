import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { LineGraph } from './LineGraph';
import { BarGraph } from './BarGraph';
import { PieGraph } from './PieGraph';

//Data for line Graph
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 2 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
];

//Data for bar Graph
const bardata = [
  { year: "2014", value: 100 },
  { year: "2015", value: 200 },
  { year: "2016", value: 300 },
  { year: "2017", value: 400 },
  { year: "2018", value: 500 },
  { year: "2019", value: 600 },
  { year: "2020", value: 700 },
];

//Data for pie Graph
const piedata = [
  { label: 'Apple', value: 30 },
  { label: 'Orange', value: 50 },
  { label: 'Banana', value: 20 },
];



// Component to render steps for conversation
class CocoBot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      highlightYear: '2017'
    };
    this.updateHighlightYear = this.updateHighlightYear.bind(this);
  }

  updateHighlightYear(year) {
      this.setState({ highlightYear: year });
  }

  
  render() {
    const { highlightYear } = this.state; 
    console.log(highlightYear)
    return (
      <ChatBot handleEnd={this.handleEnd}
        steps={[
          {
            id: '1',
            message: "Hello there! I'm Cocobot, designed to help you understand graphs.",
            trigger: 'graphs',
          },
          {
            id:'graphs',
            options: [
            { value: 'Line Graph', label: 'Line Graph', trigger: 'line' },
            { value: 'Bar Graph', label: 'Bar Graph', trigger: 'bar' },
            { value: 'Pie Graph', label:'Pie Graph', trigger: 'pie' },
          ],
          },
          {
            id:'line',
            message:'Line graphs: These are used to show trends in data over time, such as changes in patient outcomes or disease prevalence.',
            trigger:'line-example',
          },
          {
            id:'line-example',
            component: <LineGraph data={data} />,
            trigger:'update',
          },
          {
            id:'bar',
            message:'Bar graphs: These are used to compare different categories or groups, such as comparing the incidence of a disease in different age groups or geographic regions.',
            trigger:'bar-example',
          },
          {
            id:'bar-example',
            component: <BarGraph data={bardata} />,
            trigger:'highlight',
          },
          {
            id:'highlight',
            message:'Do you want to highlight the graph?',
            trigger: 'options'
          },
          {
            id:'options',
            options: [
              { value: 'Yes', label: 'Yes', trigger: 'highlight-question' },
              { value: 'No', label: 'No', trigger: 'update' }
            ],
          },
          {
            id:'highlight-question',
            message:'Which year onwards do you want to highlight?',
            trigger:'highlight-answer',
          },
          {
            id:'highlight-answer',
            user: true,
            // trigger:'highlighted'
            trigger: ({value}) => {
              this.updateHighlightYear(value);
              return 'highlighted';
            },
          },
          {
            id:'highlighted',
            component: <BarGraph data={bardata} highlightYear={this.state.highlightYear}/>,
            trigger:'update',
          },
          {
            id:'pie',
            message:'Pie charts: These are used to show how different categories or groups contribute to a whole, such as the proportion of different diseases in a patient population. ',
            trigger:'pie-example',
          },
          {
            id:'pie-example',
            component :<PieGraph data={piedata} />,
            trigger:'update',
          },
          {
            id: 'update',
            message: 'Would you like to learn more about graphs?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'graphs'},
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'end-message',
            message: 'Thanks! It was a lovely session!',
            end: true,
          }
        ]}
      />
    );
  }
}

CocoBot.propTypes = {
  steps: PropTypes.object,
};

CocoBot.defaultProps = {
  steps: undefined,
};

export default CocoBot;