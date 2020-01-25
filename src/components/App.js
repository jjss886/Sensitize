import React, { Component } from "react";
import { connect } from "react-redux";
import { json } from "d3";

// IMPORT COMPONENTS
import AppBar from "./AppBar";
import AppScatter from "./AppScatter";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

class App extends Component {
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

  componentDidUpdate(prevProps) {
    if (this.props.liveData !== prevProps.liveData) {
      this.setState({ data: this.props.liveData });
    }
  }

  updateData = data => this.setState({ data });

  updateName = activeName => this.setState({ activeName });

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

const mapState = state => {
  return { liveData: state.liveData };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(App);
