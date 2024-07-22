import React from "react";
import CocoBot from "./sample";
import "./App.css";
import { ThemeProvider } from "styled-components";
//import SendButton from "../components/ChatComponents/SendButton";

function App() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150,
  };

  const theme = {
    background: "#white",
    headerBgColor: "green",
    headerFontSize: "20px",
    botBubbleColor: "#707DDD",
    headerFontColor: "white",
    botFontColor: "black",
    userBubbleColor: "light grey",
    userFontColor: "black",
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="App">
      <div style={style}>
        <div
          className="Date"
          style={{
            textAlign: "center",
            color: "grey",
            marginTop: 50,
            fontSize: 12,
          }}
        >
          <p>{getCurrentDate()}</p>
        </div>
        <ThemeProvider theme={theme}>
          <CocoBot />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
