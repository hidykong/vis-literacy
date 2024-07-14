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

  return (
    <div className="App">
      <div style={style}>
        <ThemeProvider theme={theme}>
          <CocoBot />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
