import React, { Component } from "react";
import { connect } from "react-redux";
import ScatterPlotD3 from "../../d3/ScatterPlotD3";

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
    const { liveData } = this.props;
    if (this.checkLiveDataArray(liveData, prevProps.liveData))
      this.state.scatterChart.update(liveData.slice(1));
  }

  checkLiveDataArray(one, two) {
    for (let i = 0; i < Math.max(one.length, two.length); i++) {
      const oneObj = one[i],
        twoObj = two[i];
      if (!oneObj || !twoObj) return true;
      const oneKeys = Object.keys(oneObj),
        twoKeys = Object.keys(twoObj),
        oneVals = Object.values(oneObj),
        twoVals = Object.values(twoObj);
      if (oneKeys.length !== twoKeys.length) return true;
      for (let j = 0; j < oneKeys.length; j++) {
        const oneKey = oneKeys[j],
          twoKey = twoKeys[j],
          oneVal = oneVals[j],
          twoVal = twoVals[j];
        if (oneKey !== twoKey || oneVal !== twoVal) return true;
      }
    }
    return false;
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
