import React, { Component } from "react";
import D3Chart from "./D3Chart";

class ChartWrapper extends Component {
  constructor() {
    super();
    this.state = {
      chart: "Men"
    };
    this.handleChartChange = this.handleChartChange.bind(this);
  }

  componentDidMount() {
    new D3Chart(this.refs.chart, this.state.chart);
  }

  componentDidUpdate(prevProps) {
    if (this.state.chart !== prevProps.chart) {
      new D3Chart(this.refs.chart, this.state.chart);
    }
  }

  handleChartChange(evt) {
    const chart = evt.target.value;
    this.setState({ chart });
  }

  render() {
    return (
      <div className="chartWrapperDiv">
        <select
          className="testSelect"
          value={this.state.chart}
          onChange={this.handleChartChange}
        >
          <option>Men</option>
          <option>Ages</option>
        </select>
        <div ref="chart"></div>
      </div>
    );
  }
}
export default ChartWrapper;
