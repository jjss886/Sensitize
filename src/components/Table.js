import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Table extends Component {
  state = {
    name: "",
    height: "",
    age: ""
  };

  handleInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleAdd = () => {
    this.props.updateData([...this.props.data, this.state]);
    this.setState({ name: "", height: "", age: "" });
  };

  handleRemove = evt => {
    const targetName = evt.target.name;
    const newData = this.props.data.filter(x => x.name !== targetName);
    this.props.updateData(newData);
  };

  renderRows() {
    const { data, activeName } = this.props;

    return data.map(student => {
      const background =
        student.name === activeName ? "rgba(125,210,235,0.8)" : "white";

      return (
        <Row
          key={student.name}
          className="studentRow"
          // style={{ marginTop: "10px", backgroundColor: background }}
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

export default Table;
