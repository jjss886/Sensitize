import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { json } from "d3";

// IMPORT COMPONENTS
import logo from "../images/logo.svg";
import ChartWrapperScatter from "./ChartWrapperScatter";
import Table from "./Table";

class AppScatter extends Component {
  state = {
    data: [],
    activeName: null
  };

  componentDidMount() {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then(data => {
        this.setState({ data });
      })
      .catch(err => console.error("ERROR -", err));
  }

  updateData = data => this.setState({ data });

  updateName = activeName => this.setState({ activeName });

  renderData(status) {
    if (!this.state.data.length) return "Loading Data !";
    return !status ? (
      <ChartWrapperScatter
        data={this.state.data}
        updateName={this.updateName}
      />
    ) : (
      <Table
        data={this.state.data}
        updateData={this.updateData}
        activeName={this.state.activeName}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="light" className="navBarFull">
          <Navbar.Brand>SENSITIZE</Navbar.Brand>
        </Navbar>

        <div className="belowNavBarFullDiv">
          <img src={logo} className="appLogo" alt="logo" />
          <p>JAMES SHEN ROOLZ</p>

          <Container className="containerDiv">
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

          {/* <div className="containerDiv">
            <div className="row row1">
              <div className="col col1">{this.renderData(false)}</div>
            </div>

            <div className="row row2">
              <div className="col col2">{this.renderData(true)}</div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default AppScatter;
