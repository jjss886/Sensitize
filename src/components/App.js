import React, { Component } from "react";
import { json } from "d3";

// IMPORT COMPONENTS
import AppBar from "./AppBar";
import AppScatter from "./AppScatter";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import { DataUpload } from "./upload";

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
        <NavBar />

        <div className="belowNavBarFullDiv">
          <Sidebar updateData={this.updateData} />

          <div className="contentPageFullDiv">
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
