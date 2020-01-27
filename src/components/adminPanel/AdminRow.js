import React, { Component } from "react";
import { connect } from "react-redux";
import { removeDataSet } from "../../store";

class AdminRow extends Component {
  removeDataCollection = liveKey => {
    this.props.removeDataSet(liveKey);
  };

  render() {
    const { id, liveKey, data } = this.props;

    return (
      <div className="adminRowFullDiv">
        <span className="adminRow adminIdRow">{id}.</span>

        <span className="adminRow adminNameRow">
          <strong>Name: </strong>
          {data[0].fileName}
        </span>

        <span className="adminRow">
          <strong>Key: </strong>
          {liveKey.slice(1)}
        </span>

        <span className="adminRow">
          <strong>Attributes: </strong>
          {Object.keys(data[1]).join(", ")}
        </span>

        <span className="adminRow adminSizeRow">
          <strong>Data Points: </strong>
          {Object.keys(data).length - 1}
        </span>

        <button
          type="button"
          className="adminRemoveBtn"
          onClick={() => this.removeDataCollection(liveKey)}
        >
          Remove
        </button>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    removeDataSet: key => dispatch(removeDataSet(key))
  };
};

export default connect(null, mapDispatch)(AdminRow);
