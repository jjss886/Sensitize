import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

// COMPONENTS
import AppScatter from "./components/AppScatter";
import AppBar from "./components/AppBar";
import AdminPanel from "./components/adminPanel/AdminPanel";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <div className="routeChartFullDiv">
              <AppScatter />
              <AppBar />
            </div>
          )}
        />
        <Route exact path="/adminPanel" component={AdminPanel} />
      </Switch>
    );
  }
}

export default withRouter(connect()(Routes));
