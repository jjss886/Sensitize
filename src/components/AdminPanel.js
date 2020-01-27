import React, { Component } from "react";
import { connect } from "react-redux";
import { getFullData } from "./../store";
import AdminRow from "./AdminRow";

class AdminPanel extends Component {
  componentDidMount() {
    this.props.getFullData();
  }

  renderDataRows = fullData => {
    const keys = Object.keys(fullData);
    if (!keys.length) return <h3>Empty Database</h3>;
    return keys.map((key, idx) => (
      <AdminRow key={key} id={idx + 1} liveKey={key} data={fullData[key]} />
    ));
  };

  render() {
    return (
      <div className="adminPageFullDiv">
        <h1>PAGE UNDER CONSTRUCTION</h1>
        {this.renderDataRows(this.props.fullData)}
      </div>
    );
  }
}

const mapState = state => {
  return {
    fullData: state.fullData
  };
};

const mapDispatch = dispatch => {
  return {
    getFullData: () => dispatch(getFullData())
  };
};

export default connect(mapState, mapDispatch)(AdminPanel);
