import React, { Component } from "react";
import { connect } from "react-redux";
import { setType } from "../store";
import { DataUpload } from "./upload";

class Sidebar extends Component {
  componentDidMount() {
    this.props.setType("URL");
  }

  handleModeChange = evt => {
    const mode = evt.target.value;
    this.props.setType(mode);
  };

  strategyLayout = mode => {
    if (!mode) return <span>Loading Data !</span>;

    if (mode === "CSV Upload") {
      return <DataUpload />;
    } else if (mode === "URL") {
      return <input type="text"></input>;
    } else if (mode === "Algo") {
      return (
        <select>
          <option>Game of Life</option>
        </select>
      );
    }
  };

  render() {
    return (
      <div className="sideBarFullDiv">
        <p>Sidebar</p>
        <select className="sideBarSelect" onChange={this.handleModeChange}>
          <option>URL</option>
          <option>CSV Upload</option>
          <option>Algo</option>
        </select>

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
