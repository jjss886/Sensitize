import React, { Component } from "react";
import { connect } from "react-redux";
import ScatterPlotD3 from "../d3/ScatterPlotD3";

class ChartWrapperScatter extends Component {
  componentDidMount() {
    this.setState({
      scatterChart: new ScatterPlotD3(
        this.refs.scatterChart,
        this.props.liveData,
        this.props.updateName
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.liveData.length !== prevProps.liveData.length) {
      this.state.scatterChart.update(this.props.liveData);
    }
  }

  render() {
    return <div ref="scatterChart" className="scatterChartArea"></div>;
  }
}

const mapState = state => {
  return {
    liveData: state.liveData
  };
};

export default connect(mapState)(ChartWrapperScatter);
