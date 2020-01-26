import React, { Component } from "react";
import { connect } from "react-redux";
import ScatterPlotD3 from "../d3/ScatterPlotD3";

class ChartWrapperScatter extends Component {
  componentDidMount() {
    this.setState({
      scatterChart: new ScatterPlotD3(
        this.refs.scatterChart,
        this.props.liveData.slice(1)
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.liveData.length !== prevProps.liveData.length) {
      this.state.scatterChart.update(this.props.liveData.slice(1));
    }
  }

  render() {
    return (
      <div ref="scatterChart" className="scatterChartArea">
        <h4>HOLA PLACEHOLDER</h4>
      </div>
    );
  }
}

const mapState = state => {
  return {
    liveData: state.liveData
  };
};

export default connect(mapState)(ChartWrapperScatter);
