import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
// import { LineGraph } from "./LineGraph";
// import { BarGraph } from "./BarGraph";
// import { PieGraph } from "./PieGraph";
import myImage from "./Pictures/Demo.png";
import line from "./Pictures/Line.png";
import tilt_down from "./Pictures/Tilt-down.png";
import tilt_up from "./Pictures/Tilt-up.png";
import trend from "./Pictures/Trend.png";
import x from "./Pictures/X-axis.png";
import y from "./Pictures/Y-axis.png";
import circle from "./Pictures/Circle.png";
// Data for line Graph
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 2 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
];

// Data for bar Graph
const bardata = [
  { year: "2014", value: 100 },
  { year: "2015", value: 200 },
  { year: "2016", value: 300 },
  { year: "2017", value: 400 },
  { year: "2018", value: 500 },
  { year: "2019", value: 600 },
  { year: "2020", value: 700 },
];

// Data for pie Graph
const piedata = [
  { label: "Apple", value: 30 },
  { label: "Orange", value: 50 },
  { label: "Banana", value: 20 },
];

// Component to save responses to database
class SaveData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: "",
    };
  }

  componentWillMount() {
    this.handleSaveData();
  }

  // Calls the REST API to save data
  handleSaveData() {
    const { steps } = this.props;
    if (steps && steps.name && steps.age) {
      const { name, age } = steps;

      fetch("http://localhost:3000/savedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          age: age.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      console.error("Steps, name, or age is undefined");
    }
  }
  render() {
    return null;
  }
}

SaveData.propTypes = {
  steps: PropTypes.object,
};

SaveData.defaultProps = {
  steps: undefined,
};

// Component to render steps for conversation
class CocoBot extends Component {
  render() {
    return (
      <ChatBot
        headerTitle=""
        steps={[
          {
            id: "1",
            message:
              "Hello, I’m COCO. I’ll walk you through a progress graph (shown below) so you can better understand how your symptom changed over time. ",
            trigger: "2",
            delay: 3000,
          },
          {
            id: "2",
            component: (
              <img
                src={myImage}
                alt="model"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "3",
            delay: 3000,
          },

          {
            id: "3",
            message: "What do you want to learn more about?",
            trigger: "elements",
            dalay: 3000,
          },

          {
            id: "elements",
            options: [
              {
                value: "X-axis",
                label: "X-axis",
                trigger: "x-example",
                dalya: 3000,
              },
              {
                value: "Y-axis",
                label: "Y-axis",
                trigger: "y-example",
                delay: 3000,
              },
              {
                value: "Circle",
                label: "Circle",
                trigger: "circle-example",
                delay: 3000,
              },
              { value: "Line", label: "Line", trigger: "line-example" },
              {
                value: "Line trend",
                label: "Line trend",
                trigger: "line trend-example",
                dalay: 3000,
              },
              {
                value: "Quit",
                label: "Quit",
                trigger: "end-message",
                delay: 3000,
              },
            ],
          },
          {
            id: "x-example",
            component: (
              <img
                src={x}
                alt="model_x"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "x-axis",
          },
          {
            id: "x-axis",
            message:
              "The horizontal x-axis shows the session number and the date when you completed them.",
            trigger: "4",
          },

          {
            id: "4",
            message:
              "Note that if you complete a session later than the planned date, the dates might not be evenly spread, even though the dots that present them appear to be.",
            trigger: "3",
          },
          {
            id: "y-example",
            component: (
              <img
                src={y}
                alt="model_y"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "y-axis",
          },
          {
            id: "y-axis",
            message:
              "The vertical y-axis shows the symptom severity level (for example, anxiety) from 1 =  ‘least severe’  to 5 = ‘most severe’.",
            trigger: "3",
          },
          {
            id: "line-example",
            component: (
              <img
                src={line}
                alt="model_line"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "line",
            delay: 3000,
          },
          {
            id: "line",
            message:
              "The lines between circles show the trend of symptom severity level (for example, anxiety) after each session.",
            trigger: "5",
          },

          {
            id: "5",
            message:
              "Different line colors show whether the solution was used for the period. For example, between S3 and S4, the purple line is used to indicate that a solution was used in this period.",
            trigger: "3",
          },
          {
            id: "line trend-example",
            component: (
              <img
                src={trend}
                alt="model_trend"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "line trend",
            dalay: 3000,
          },
          {
            id: "line trend",
            message:
              "Generally, the line tilting down shows you are experiencing lower symptom severity level, therefore better health.",
            trigger: "stop1",
          },
          {
            id: "stop1",
            options: [
              {
                value: "OK",
                label: "OK",
                trigger: "tilting down",
                dalya: 3000,
              },
            ],
          },
          {
            id: "tilting down",
            component: (
              <img
                src={tilt_down}
                alt="model_tilt_down"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "6",
            delay: 3000,
          },

          {
            id: "6",
            message:
              "For example, in the first session (S1), you rated your anxiety level as 4, and in the second session (S2), you rated your anxiety level as 3. Therefore, the line between the first and second session tilts down, showing a decreasing trend in your anxiety level. ",
            trigger: "stop2",
          },
          {
            id: "stop2",
            options: [
              {
                value: "OK",
                label: "OK",
                trigger: "tilting up",
                dalya: 3000,
              },
            ],
          },
          {
            id: "tilting up",
            component: (
              <img
                src={tilt_up}
                alt="model_tilt_up"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "7",
            delay: 3000,
          },
          {
            id: "7",
            message:
              "On the other hand, the line tilting upwards shows an increasing anxiety level and worse health.",
            trigger: "3",
          },
          {
            id: "circle-example",
            component: (
              <img
                src={circle}
                alt="model_circle"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            ),
            trigger: "circle",
            delay: 3000,
          },
          {
            id: "circle",
            message: "Each dot represents a therapy session you had with COCO.",
            trigger: "3",
          },

          {
            id: "end-message",
            message: "Thanks! It was a lovely session!",
            trigger: "save-data",
          },
          {
            id: "save-data",
            component: <SaveData />,
            end: true,
          },
        ]}
      />
    );
  }
}

export default CocoBot;
