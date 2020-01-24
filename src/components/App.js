import React, { Component } from "react";

// IMPORT COMPONENTS
import AppBar from "./AppBar";
import AppScatter from "./AppScatter";

// ADDITIONAL INTERNAL IMPORTS
import logo from "../images/logo.svg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navBarFull">
          <h1 className="navBarHeader">SENSITIZE</h1>
        </nav>

        <div className="belowNavBarFullDiv">
          <img src={logo} className="appLogo" alt="logo" />
          <p>JAMES SHEN ROOLZ</p>
          <AppBar />
          <AppScatter />
        </div>
      </div>
    );
  }
}

export default App;
