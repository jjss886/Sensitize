import React, { Component } from "react";
import { connect } from "react-redux";

// IMPORT COMPONENTS
import ChartWrapperFishEye from "./ChartWrapperFishEye";

class AppFishEye extends Component {
  renderData(liveData) {
    if (!liveData || !liveData.length)
      return <h3 className="loadDataText">Load Some Data First!</h3>;
    return <ChartWrapperFishEye />;
  }

  render() {
    return (
      <div className="appFishEyeDiv">
        <div className="containerFishEyeDiv chartScreenshot">
          {this.renderData(this.props.liveData)}
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

export default connect(mapState)(AppFishEye);
