import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {} from "../store";

// IMPORT COMPONENTS
import ChartWrapperScatter from "./ChartWrapperScatter";
import Table from "./Table";

class AppScatter extends Component {
  renderData(status) {
    const { liveData, activeName } = this.props;
    if (!liveData.length) return "Loading Data !";
    return !status ? (
      <ChartWrapperScatter
      // liveData={liveData}
      // updateName={this.props.updateName}
      />
    ) : (
      <Table
      // liveData={liveData}
      // updateData={this.props.updateData}
      // activeName={activeName}
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

const mapState = state => {
  return {
    liveData: state.liveData,
    state: state
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(AppScatter);
