import React, { Component } from "react";
import { connect } from "react-redux";
import { setMode, setLiveData, setLiveKey, setChartType } from "../../store";
import { DataUpload, URLUpload } from "../upload";
import EmailComponent from "./EmailComponent";

class Sidebar extends Component {
  componentDidMount() {
    this.props.setMode("CSV");
    this.props.setChartType("Scatter Plot");
  }

  handleModeChange = evt => {
    const mode = evt.target.value;
    this.props.setMode(mode);
  };

  handleChartChange = evt => {
    const chartType = evt.target.value;
    this.props.setChartType(chartType);
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
    const { liveData, fullData, mode, liveKey } = this.props;
    return (
      <div className="sideBarFullDiv">
        {liveData && liveData.length ? <EmailComponent /> : null}

        {fullData ? this.showUpdatedFiles(fullData, liveKey) : null}

        <p className="sideBarHeaderText">Choose Your Setup</p>

        <div className="modeSelectDiv">
          <span className="modeLabel">Style: </span>
          <select
            className="modeSideBarSelect"
            onChange={this.handleChartChange}
          >
            <option>Scatter Plot</option>
            <option>Bar Chart</option>
            <option>FishEye</option>
          </select>
        </div>

        <div className="modeSelectDiv">
          <span className="modeLabel">Load: </span>
          <select
            className="modeSideBarSelect"
            onChange={this.handleModeChange}
          >
            <option>CSV</option>
            <option>URL</option>
            <option>Algo</option>
          </select>
        </div>

        {this.strategyLayout(mode)}
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
    setLiveKey: key => dispatch(setLiveKey(key)),
    setChartType: chartType => dispatch(setChartType(chartType))
  };
};

export default connect(mapState, mapDispatch)(Sidebar);
