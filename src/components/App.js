import React, { Component } from "react";

// IMPORT COMPONENTS
import AppBar from "./AppBar";
import AppScatter from "./AppScatter";
import Sidebar from "./Sidebar";
import { TestUpload } from "../upload";
import { json } from "d3";

// ADDITIONAL INTERNAL IMPORTS
import logo from "../images/logo.svg";

class App extends Component {
  // ----------------------- TEMP MAYBE ----------------------- //
  state = {
    data: [],
    activeName: null
  };

  componentDidMount() {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then(data => {
        this.setState({ data });
      })
      .catch(err => console.error("ERROR -", err));
  }

  updateData = data => this.setState({ data });

  updateName = activeName => this.setState({ activeName });
  // ----------------------- TEMP MAYBE ----------------------- //

  render() {
    return (
      <div className="App">
        <nav className="navBarFull">
          <h1 className="navBarHeader">SENSITIZE</h1>
        </nav>

        <div className="belowNavBarFullDiv">
          <Sidebar />

          <div className="contentPageFullDiv">
            <img src={logo} className="appLogo" alt="logo" />
            <p>JAMES SHEN</p>

            <TestUpload updateData={this.updateData} />

            <AppScatter
              state={this.state}
              updateData={this.updateData}
              updateName={this.updateName}
            />

            <AppBar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
