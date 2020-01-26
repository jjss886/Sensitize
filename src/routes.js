import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

// COMPONENTS
import AppScatter from "./components/AppScatter";
import AppBar from "./components/AppBar";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          render={props => (
            <div className="routeChartFullDiv">
              <AppScatter />
              <AppBar />
            </div>
          )}
        />
        <Route path="/adminPanel" />
      </Switch>
    );
  }
}

export default withRouter(connect()(Routes));
