import React, { Component } from "react";
import { connect } from "react-redux";
import { setMode, setLiveData, setLiveKey } from "../../store";
import { DataUpload, URLUpload } from "../upload";
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
      return <URLUpload />;
    } else if (mode === "Algo") {
      return (
        <select className="algoModeSelect">
          <option>Game of Life</option>
        </select>
      );
    }
  };

  showUpdatedFiles = (fullData, liveKey) => {
    if (!fullData) return null;
    const keys = Object.keys(fullData)
        .slice(-10)
        .reverse(),
      len = 20,
      headerText =
        keys.length === 0
          ? `Currently No Uploads`
          : keys.length === 1
          ? `Last Upload`
          : `Last ${keys.length} Uploads`;

    return (
      <div className="postUploadFullDiv">
        <div className="postUploadInsideDiv">
          <span className="postUploadHeader">{headerText}</span>
          <ol className="postUploadUL">
            {keys.map(key => {
              const fontColor =
                key === liveKey ? "rgba(18,100,210,0.9)" : "black";

              return (
                <li
                  className="postUploadList linkText"
                  key={key}
                  onClick={() => {
                    this.props.setLiveData(fullData[key]);
                    this.props.setLiveKey(key);
                  }}
                  style={{ color: fontColor }}
                >
                  {fullData[key][0].fileName.length > len
                    ? `${fullData[key][0].fileName.slice(0, len)}...`
                    : fullData[key][0].fileName}
                </li>
              );
            })}
          </ol>
        </div>
        <hr className="lineBreak" />
      </div>
    );
  };

  render() {
    return (
      <div className="sideBarFullDiv">
        {this.props.liveData && this.props.liveData.length ? (
          <EmailComponent />
        ) : null}

        {this.props.fullData
          ? this.showUpdatedFiles(this.props.fullData, this.props.liveKey)
          : null}

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
    liveData: state.liveData,
    liveKey: state.liveKey,
    fullData: state.fullData
  };
};

const mapDispatch = dispatch => {
  return {
    setMode: mode => dispatch(setMode(mode)),
    setLiveData: data => dispatch(setLiveData(data)),
    setLiveKey: key => dispatch(setLiveKey(key))
  };
};

export default connect(mapState, mapDispatch)(Sidebar);
