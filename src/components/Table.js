import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { pullLiveKey, addDataPoint } from "../store";

class Table extends Component {
  state = {
    name: "",
    height: "",
    age: ""
  };

  componentDidMount() {
    this.props.pullLiveKey();
  }

  handleInputChange = evt => {
    const val =
      evt.target.name !== "name" ? Number(evt.target.value) : evt.target.value;
    this.setState({
      [evt.target.name]: val
    });
  };

  handleAdd = () => {
    this.props.addDataPoint(
      this.props.liveKey,
      this.props.liveData,
      this.state
    );
    this.setState({ name: "", height: "", age: "" });
  };

  handleRemove = evt => {
    const targetName = evt.target.name;
    const newData = this.props.liveData.filter(x => x.name !== targetName);
    console.log("removing -", newData);
  };

  renderRows() {
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
          <Col xs={3}>{student.height}</Col>
          <Col xs={3}>{student.age}</Col>
          <Col>
            <Button
              variant={"danger"}
              type={"button"}
              style={{ width: "100%" }}
              name={student.name}
              onClick={this.handleRemove}
            >
              Remove
            </Button>
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={3}>
            <Form.Control
              placeholder={"Name"}
              name={"name"}
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Col>

          <Col xs={3}>
            <Form.Control
              placeholder={"Height"}
              name={"height"}
              value={this.state.height}
              onChange={this.handleInputChange}
            />
          </Col>

          <Col xs={3}>
            <Form.Control
              placeholder={"Age"}
              name={"age"}
              value={this.state.age}
              onChange={this.handleInputChange}
            />
          </Col>

          <Col>
            <Button
              variant={"primary"}
              type={"button"}
              style={{ width: "100%" }}
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </Col>
        </Row>
        {this.renderRows()}
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
      dispatch(addDataPoint(key, curData, newData))
  };
};

export default connect(mapState, mapDispatch)(Table);
