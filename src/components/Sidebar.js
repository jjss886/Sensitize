import React, { Component } from "react";
import { connect } from "react-redux";
import { setType } from "../store";
import { DataUpload } from "./upload";

class Sidebar extends Component {
  componentDidMount() {
    this.props.setType("CSV");
  }

  handleModeChange = evt => {
    const mode = evt.target.value;
    this.props.setType(mode);
  };

  strategyLayout = mode => {
    if (!mode) return <span>Loading Data !</span>;

    if (mode === "CSV") {
      return <DataUpload updateData={this.props.updateData} />;
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
        <p>Choose Your Dataset</p>

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
    mode: state.mode
  };
};

const mapDispatch = dispatch => {
  return { setType: mode => dispatch(setType(mode)) };
};

export default connect(mapState, mapDispatch)(Sidebar);
