import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { getFullData, pullLiveKey } from "./store";

// COMPONENTS
import AppScatter from "./components/AppScatter";
import AppBar from "./components/AppBar";

class Routes extends Component {
  componentDidMount() {
    this.props.getFullData();
    this.props.pullLiveKey();
  }

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

const mapDispatch = dispatch => {
  return {
    getFullData: () => dispatch(getFullData()),
    pullLiveKey: () => dispatch(pullLiveKey())
  };
};

export default withRouter(connect(null, mapDispatch)(Routes));
