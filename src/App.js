import React from 'react';
import Sample from './sample';
import './App.css';

function App() {
const style = {
width: "50%",
margin: "0 auto",
marginTop: 150
};
return (
<div className="App">
<div style={style}>
<Sample />
</div>
</div>
);
}

export default App;