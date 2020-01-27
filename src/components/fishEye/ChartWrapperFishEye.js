import React, { Component } from "react";
import { connect } from "react-redux";
import FishEyeD3 from "../../d3/FishEyeD3";

class ChartWrapperFishEye extends Component {
  componentDidMount() {
    this.setState({
      fishEyeChart: new FishEyeD3(
        this.refs.fishEyeChart,
        this.props.liveData.slice(1)
      )
    });
  }

  componentDidUpdate() {}

  render() {
    return <div ref="fishEyeChart" className="fishEyeChartArea"></div>;
  }
}

const mapState = state => {
  return {
    liveData: state.liveData
  };
};

export default connect(mapState)(ChartWrapperFishEye);
