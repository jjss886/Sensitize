import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import logo from "./logo.svg";
import "./App.css";

// function App() {
class App extends Component {
  constructor() {
    super();
  }

  updateD3Color() {
    this.updateD3Color.select("p").style("background", "green");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>JAMES SHEN ROOLZ</p>
          <ChartWrapper />
        </header>
      </div>
    );
  }
}

export default App;
