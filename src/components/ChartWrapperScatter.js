import React, { Component } from "react";
import ScatterPlotD3 from "../d3/ScatterPlotD3";

class ChartWrapperScatter extends Component {
  componentDidMount() {
    this.setState({
      scatterChart: new ScatterPlotD3(this.refs.scatterChart, this.props.data)
    });
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentDidUpdate(prevProps) {
    if (this.props.data.length !== prevProps.data.length) {
      this.state.scatterChart.update(this.props.data);
    }
  }

  render() {
    return <div ref="scatterChart" className="chartArea"></div>;
  }
}

export default ChartWrapperScatter;
