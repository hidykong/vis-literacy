import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CocoBot from './sample';
import reportWebVitals from './reportWebVitals';

// Render the CocoBot
ReactDOM.render(
  <React.StrictMode>
    <CocoBot />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
