import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Table extends Component {
  // componentDidMount() {}

  render() {
    const { data } = this.props;

    return (
      <div>
        <Row>
          <Col xs={3}>
            <Form.Control />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Table;
