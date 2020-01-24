import React, { Component } from "react";
import ScatterPlotD3 from "../d3/ScatterPlotD3";

class ChartWrapperScatter extends Component {
  componentDidMount() {
    this.setState({
      chart: new ScatterPlotD3(this.refs.scatterChart, this.props.data)
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  // componentWillReceiveProps(nextProps) {
  //   this.state.chart.update(nextProps);
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.gender !== prevProps.gender) {
  //     this.state.chart.update(this.props.gender);
  //   }
  // }

  render() {
    return <div ref="scatterChart" className="chartArea"></div>;
  }
}

export default ChartWrapperScatter;
