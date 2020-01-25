import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// IMPORT COMPONENTS
import ChartWrapperScatter from "./ChartWrapperScatter";
import Table from "./Table";

class AppScatter extends Component {
  state = {
    data: [],
    activeName: null
  };

  renderData(status) {
    const { data, activeName } = this.props.state;
    if (!data.length) return "Loading Data !";
    return !status ? (
      <ChartWrapperScatter data={data} updateName={this.props.updateName} />
    ) : (
      <Table
        data={data}
        updateData={this.props.updateData}
        activeName={activeName}
      />
    );
  }

  render() {
    return (
      <div className="appScatterDiv">
        <Container className="containerScatterDiv">
          <Row className="row row1">
            <Col md={11} xs={12}>
              {this.renderData(false)}
            </Col>
          </Row>

          <Row className="row row2">
            <Col md={11} xs={12}>
              {this.renderData(true)}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AppScatter;
