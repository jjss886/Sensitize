import React, { Component } from "react";
import { connect } from "react-redux";
import { json } from "d3";
import { setLiveData } from "../store";

// IMPORT COMPONENTS
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import Routes from "../routes";

// eslint-disable-next-line
const url = "https://udemy-react-d3.firebaseio.com/children.json";

class App extends Component {
  state = {
    data: [],
    activeName: null
  };

  componentDidMount() {
    console.log("mounting -", this.props);
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then(data => {
        this.setState({ data });
        this.props.setLiveData(data);
      })
      .catch(err => console.error("WAH ERROR -", err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.liveData !== prevProps.liveData) {
      this.props.setLiveData(this.props.liveData);
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <div className="belowNavBarFullDiv">
          <Sidebar />

          <div className="contentPageFullDiv">
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return { liveData: state.liveData, fullData: state.fullData };
};

const mapDispatch = dispatch => {
  return {
    setLiveData: data => dispatch(setLiveData(data))
  };
};

export default connect(mapState, mapDispatch)(App);
