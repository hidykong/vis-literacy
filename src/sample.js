import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { LineGraph } from './LineGraph';
import { BarGraph } from './BarGraph';
import { PieGraph } from './PieGraph';
import { TreeMap } from "./TreeMap";
import { BubbleMap } from "./BubbleMap"
import { ScatterPlot } from './ScatterPlot';

//Data for line Graph
const linedata = [
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 2 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
];

//Data for bar Graph
const bardata = [
  { age: 10, stressLevel: 6 },
  { age: 20, stressLevel: 4 },
  { age: 30, stressLevel: 7 },
  { age: 40, stressLevel: 5 },
  { age: 50, stressLevel: 8 },
  { age: 60, stressLevel: 3 }
];


//Data for pie Graph
const piedata = [
  { label: 'Apple', value: 30 },
  { label: 'Orange', value: 50 },
  { label: 'Banana', value: 20 },
];


//Data for  TreeMap
  const treedata = {
    name: "root",
    children: [
      { name: "USA", value: 35,
        children: [
          {name:"Washington", value: 10},
          {name:"California", value: 10},
          {name:"Oregon", value: 15},
        ]
      },
      { name: "India", value: 25,
        children: [
          {name:"Kerala", value: 5},
          {name:"Punjab", value: 10},
          {name:"Goa", value: 10},
        ]
      },

      { name: "China", value: 15,
        children: [
          {name:"Shanghai.", value: 8},
          {name:"Tianjin", value: 2},
          {name:"Beijing", value: 5},
        ]
      },
      { name: "Japan" , value: 10,
        children: [
          {name:"Tokyo", value: 5},
          {name:"Osaka", value: 3},
          {name:"Nagoya", value: 2},
        ]    
      },
      { name: "Canada", value: 15,
        children: [
          {name:"Toronto", value: 5},
          {name:"Calgary", value: 3},
          {name:"Vancouver", value:7},
        ]
      },
    ],
  };

//Data for BubbleMap
  const bubbledata = {
    name: "root",
    children: [
      { name: "USA", value: 35 },
      { name: "India", value: 25 },
      { name: "China", value: 15 },
      { name: "Japan", value: 10 },
      { name: "Canada", value: 15}
    ],
  };

// Data for ScatterPlot
  const scatterdata = [
    { age: 10, stressLevel: 5 },
    { age: 20, stressLevel: 15 },
    { age: 30, stressLevel: 18 },
    { age: 40, stressLevel: 20 },
    { age: 45, stressLevel: 18 },
    { age: 15, stressLevel: 15 }
  ];




//Custom component to manage request and rendering of other components
class ComponentManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialStep: 0
    }
  }

  componentWillUpdate(prevProps) {
    const {steps} = this.props;
    const { tutorialOptions } = steps;

    if( tutorialOptions && prevProps.steps.tutorialOptions !== tutorialOptions) {
      if( tutorialOptions.value === 'Previous') {
        let currentStep = this.state.tutorialStep - 1;
        if (currentStep < 0) {
          currentStep = 0;
        }
        this.setState({tutorialStep: currentStep});
      }
      else if( tutorialOptions.value === 'Next') {
        let currentStep = this.state.tutorialStep + 1
        if (currentStep < 5) { // 3 step tutorial
          this.setState({tutorialStep: currentStep})
        }
      }
    }
  }
  
  render() {
    const { steps } = this.props;
    const { graphs } = steps;
    const { tutorialStep } = this.state;

    if(graphs && graphs.value === 'Line')
    {
      return <LineGraph data={linedata} />
    }
    else if(graphs && graphs.value === 'BubbleMap')
    {
      return <BubbleMap data={bubbledata} />
    }
    else if(graphs && graphs.value === 'ScatterPlot')
    {
      return <ScatterPlot data={scatterdata} />
    }
    else if(graphs && graphs.value ==='TreeMap')
    {
      if(tutorialStep === 0)
      {
        const message = "Considering only USA stress level"
        const data = {...treedata, children: treedata.children.slice(0, tutorialStep+1) };
        return <TreeMap data={data} message={message} displayFullMap={false}/>
      }
      else if(tutorialStep === 1)
      {
        const message = "USA and India stress level "
        const data = {...treedata, children: treedata.children.slice(0, tutorialStep+1) };
        return <TreeMap data={data} message={message} displayFullMap={false}/>
      }
      else if(tutorialStep === 2)
      {
        const message = "USA and other 2 countries stress level"
        let data = {...treedata, children: treedata.children.slice(0, tutorialStep+1) };
        return <TreeMap data={data} message={message} displayFullMap={false}/>
      }
      else if(tutorialStep === 3)
      {
        const message = "USA and other 3 countrie stress level"
        let data = {...treedata, children: treedata.children.slice(0, tutorialStep+1) };
        return <TreeMap data={data} message={message} displayFullMap={false}/>
      }
      else
      {
        return <TreeMap data={treedata} displayFullMap={true}/>
      }
    }
    else if(graphs &&  graphs.value === 'Bar')
    {
      if(tutorialStep === 0)
      {
        return <BarGraph data={bardata} highlightXAxis={true} highlightYAxis={false} fullGraph={false}/>
      }
      else if(tutorialStep === 1)
      {
        return <BarGraph data={bardata} highlightXAxis={false} highlightYAxis={true} fullGraph={false}/>
      }
      else if(tutorialStep === 2)
      {
        return <BarGraph data={bardata} highlightXAxis={false} highlightYAxis={false} fullGraph={true}/>
      }
      else
      {
        return <BarGraph data={bardata} />
      }
    }
    else if(graphs && graphs.value === 'Pie')
    {
      return <PieGraph data={piedata} />
    }
    else
    {
      return <BarGraph data={bardata} highlightXAxis={false} highlightYAxis={false} fullGraph={true}/>
    }
  }
}

ComponentManager.propTypes = {
  steps: PropTypes.object,
};

ComponentManager.defaultProps = {
  steps: undefined,
};


// Component to render steps for conversation
class CocoBot extends Component {

  render() {

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
            { value: 'Line', label: 'Line Graph', trigger: 'chosenGraph' },
            { value: 'TreeMap', label: 'TreeMap', trigger: 'chosenGraph' },
            { value: 'Bar', label: 'Bar Graph', trigger: 'chosenGraph' },
            { value: 'Pie', label:'Pie Graph', trigger: 'chosenGraph' },
            { value: 'BubbleMap', label:'BubbleMap', trigger: 'chosenGraph'},
            { value: 'ScatterPlot', label:'ScatterPlot', trigger: 'chosenGraph'},
          ],
          },
          {
            id:'chosenGraph',
            component: <ComponentManager />,
            trigger:'tutorialOptions',
          },
          
          {
            id: 'tutorialOptions',
            options:[
              { value: 'Previous', label: 'Previous', replace: true, trigger: 'tutorialOptions' },
              { value: 'Next', label: 'Next', replace: true, trigger: 'tutorialOptions' },
              { value: 'End', label: 'End', replace: true, trigger: 'update' },
            ],
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

export default CocoBot;