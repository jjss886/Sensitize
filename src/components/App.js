import React, { Component } from "react";
import { connect } from "react-redux";
import { setLiveData, getFullData } from "../store";

// IMPORT COMPONENTS
import Sidebar from "./sidebar/Sidebar";
import NavBar from "./NavBar";
import Routes from "../routes";

class App extends Component {
  componentDidMount() {
    this.props.getFullData();
  }

  componentDidUpdate(prevProps) {
    const { liveData, fullData } = this.props,
      fullDataKeys = Object.keys(fullData);

    if ((!liveData || !Object.keys(liveData).length) && fullDataKeys.length) {
      const lastKey = fullDataKeys[fullDataKeys.length - 1];
      this.props.setLiveData(fullData[lastKey]);
    }
    if (liveData !== prevProps.liveData) this.props.setLiveData(liveData);
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <div className="belowNavBarFullDiv">
          <Sidebar />

          <div className="contentPageFullDiv">
            <h1>1. Upload! --> 2. Analyze! --> 3. Send!</h1>
            <Routes chartType={this.props.chartType} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    liveData: state.liveData,
    fullData: state.fullData,
    chartType: state.chartType
  };
};

const mapDispatch = dispatch => {
  return {
    setLiveData: data => dispatch(setLiveData(data)),
    getFullData: () => dispatch(getFullData())
  };
};

export default connect(mapState, mapDispatch)(App);
