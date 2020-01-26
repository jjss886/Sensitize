import React, { Component } from "react";
import { connect } from "react-redux";

// IMPORT COMPONENTS
import ChartWrapperScatter from "./ChartWrapperScatter";
import Table from "./Table";

class AppScatter extends Component {
  renderData(status) {
    if (!this.props.liveData.length)
      return !status ? (
        <h3 className="loadDataText">Load Some Data First!</h3>
      ) : null;
    return !status ? <ChartWrapperScatter /> : <Table />;
  }

  render() {
    return (
      <div className="appScatterDiv">
        <div className="containerScatterDiv">
          {this.renderData(false)}
          {this.renderData(true)}
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
