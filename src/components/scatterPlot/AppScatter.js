import React, { Component } from "react";
import { connect } from "react-redux";

// IMPORT COMPONENTS
import ChartWrapperScatter from "./ChartWrapperScatter";
import ScatterTable from "./ScatterTable";

class AppScatter extends Component {
  renderData(liveData, status) {
    if (!liveData || !liveData.length)
      return !status ? (
        <h3 className="loadDataText">Load Some Data First!</h3>
      ) : null;
    return !status ? <ChartWrapperScatter /> : <ScatterTable />;
  }

  render() {
    return (
      <div className="appScatterDiv">
        <div
          ref="chartScreenshot"
          className="containerScatterDiv chartScreenshot"
        >
          {this.renderData(this.props.liveData, false)}
          {this.renderData(this.props.liveData, true)}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    liveData: state.liveData
  };
};

export default connect(mapState)(AppScatter);
