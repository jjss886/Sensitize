import React, { Component } from "react";
import { connect } from "react-redux";
import { setMode } from "../store";
import { DataUpload } from "./upload";
import EmailComponent from "./EmailComponent";

class Sidebar extends Component {
  componentDidMount() {
    this.props.setMode("CSV");
  }

  handleModeChange = evt => {
    const mode = evt.target.value;
    this.props.setMode(mode);
  };

  strategyLayout = mode => {
    if (!mode) return <span>Loading Data !</span>;

    if (mode === "CSV") {
      return <DataUpload />;
    } else if (mode === "URL") {
      return (
        <input
          type="text"
          className="urlTextInput"
          placeholder="URL Here"
          onFocus={e => (e.target.placeholder = "")}
          onBlur={e => (e.target.placeholder = "URL Here")}
        ></input>
      );
    } else if (mode === "Algo") {
      return (
        <select className="algoModeSelect">
          <option>Game of Life</option>
        </select>
      );
    }
  };

  render() {
    return (
      <div className="sideBarFullDiv">
        {this.props.liveData && this.props.liveData.length ? (
          <EmailComponent />
        ) : null}

        <p className="sideBarHeaderText">Choose Your Dataset</p>

        <div className="modeSelectDiv">
          <span className="modeLabel">Mode: </span>
          <select
            className="modeSideBarSelect"
            onChange={this.handleModeChange}
          >
            <option>CSV</option>
            <option>URL</option>
            <option>Algo</option>
          </select>
        </div>

        {this.strategyLayout(this.props.mode)}
      </div>
    );
  }
}

const mapState = state => {
  return {
    mode: state.mode,
    liveData: state.liveData
  };
};

const mapDispatch = dispatch => {
  return { setMode: mode => dispatch(setMode(mode)) };
};

export default connect(mapState, mapDispatch)(Sidebar);
