import React, { Component } from "react";
import BarChartD3 from "../d3/BarChartD3";

class ChartWrapperBar extends Component {
  componentDidMount() {
    this.setState({ chart: new BarChartD3(this.refs.chart) });
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.state.chart.update(nextProps.gender);
  // }

  componentDidUpdate(prevProps) {
    if (this.props.gender !== prevProps.gender) {
      this.state.chart.update(this.props.gender);
    }
  }

  render() {
    return <div ref="chart" className="chartArea"></div>;
  }
}

export default ChartWrapperBar;
