import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { pullLiveKey, addDataPoint, removeDataPoint } from "../../store";

class ScatterTable extends Component {
  state = {
    name: "",
    xState: "",
    yState: ""
  };

  componentDidMount() {
    this.props.pullLiveKey();
  }

  handleInputChange = evt => {
    let val = evt.target.value;
    const name = evt.target.name;

    if (name !== "name" && isNaN(val)) {
      this.setState({
        [name]: ""
      });
      return alert("Must input numbers");
    }
    if (val !== "" && name !== "name") val = Number(val);
    this.setState({
      [name]: val
    });
  };

  handleAdd = (xKey, yKey) => {
    this.props.addDataPoint(this.props.liveKey, this.props.liveData, {
      name: this.state.name,
      [xKey]: this.state.xState,
      [yKey]: this.state.yState
    });
    this.setState({ name: "", xState: "", yState: "" });
  };

  handleRemove = evt => {
    const targetName = evt.target.name;
    const newData = this.props.liveData.filter(x => x.name !== targetName);
    this.props.removeDataPoint(this.props.liveKey, newData);
  };

  renderRows(xKey, yKey) {
    const { liveData, activeName } = this.props,
      adjData = "fileName" in liveData[0] ? liveData.slice(1) : liveData;

    return adjData.map(student => {
      const background =
        student.name === activeName ? "rgba(125,210,235,0.8)" : "white";

      return (
        <Row
          key={student.name}
          className="scatterStudentRow"
          style={{ backgroundColor: background }}
        >
          <Col xs={3}>{student.name}</Col>
          <Col xs={3}>{student[yKey]}</Col>
          <Col xs={3}>{student[xKey]}</Col>
          <Col className="colRemoveBtn">
            <button
              variant={"danger"}
              className="scatterRemoveBtn"
              type={"button"}
              name={student.name}
              onClick={this.handleRemove}
            >
              Remove
            </button>
          </Col>
        </Row>
      );
    });
  }

  render() {
    const keys = Object.keys(this.props.liveData[1]),
      noNameKeys = keys.filter(x => x !== "name"),
      [xKey, yKey] = noNameKeys,
      xAttr = xKey.slice(0, 1).toUpperCase() + xKey.slice(1),
      yAttr = yKey.slice(0, 1).toUpperCase() + yKey.slice(1);

    return (
      <div className="scatterTableFullDiv">
        <Row>
          <Col xs={3}>
            <Form.Control
              name={"name"}
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder={"Name"}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Name")}
            />
          </Col>

          <Col xs={3}>
            <Form.Control
              name={"yState"}
              type="number"
              value={this.state.yState}
              onChange={this.handleInputChange}
              placeholder={yAttr}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = `${yAttr}`)}
            />
          </Col>

          <Col xs={3}>
            <Form.Control
              name={"xState"}
              type="number"
              value={this.state.xState}
              onChange={this.handleInputChange}
              placeholder={xAttr}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = `${xAttr}`)}
            />
          </Col>

          <Col>
            <Button
              variant={"primary"}
              type={"button"}
              style={{ width: "100%" }}
              onClick={() => this.handleAdd(xKey, yKey)}
            >
              Add
            </Button>
          </Col>
        </Row>
        <div className="scatterItemTableDiv">{this.renderRows(xKey, yKey)}</div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    liveData: state.liveData,
    activeName: state.activeName,
    liveKey: state.liveKey
  };
};

const mapDispatch = dispatch => {
  return {
    pullLiveKey: () => dispatch(pullLiveKey()),
    addDataPoint: (key, curData, newData) =>
      dispatch(addDataPoint(key, curData, newData)),
    removeDataPoint: (key, newData) => dispatch(removeDataPoint(key, newData))
  };
};

export default connect(mapState, mapDispatch)(ScatterTable);
