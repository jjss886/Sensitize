import React, { Component } from "react";
import D3Chart from "../d3/D3Chart";

class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({ chart: new D3Chart(this.refs.chart) });
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
    return <div ref="chart"></div>;
  }
}

export default ChartWrapper;
