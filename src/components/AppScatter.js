import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// IMPORT COMPONENTS
import ChartWrapperScatter from "./ChartWrapperScatter";
import Table from "./Table";

class AppScatter extends Component {
  renderData(status) {
    if (!this.props.liveData.length)
      return !status ? (
        <h3 className="loadDataText">Load Some Data First!</h3>
      ) : null;
    return !status ? <ChartWrapperScatter /> : <Table />;
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

const mapState = state => {
  return {
    liveData: state.liveData
  };
};

export default connect(mapState)(AppScatter);
