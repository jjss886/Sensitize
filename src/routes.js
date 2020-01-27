import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

// COMPONENTS
import AppScatter from "./components/scatterPlot/AppScatter";
import AppBar from "./components/barChart/AppBar";
import AdminPanel from "./components/adminPanel/AdminPanel";

class Routes extends Component {
  render() {
    const { chartType } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (chartType === "Scatter Plot") {
              return (
                <div className="routeChartFullDiv">
                  <AppScatter />
                </div>
              );
            } else if (chartType === "Bar Chart") {
              return (
                <div className="routeChartFullDiv">
                  <AppBar />
                </div>
              );
            }
          }}
        />
        <Route exact path="/adminPanel" component={AdminPanel} />
      </Switch>
    );
  }
}

export default withRouter(connect()(Routes));
