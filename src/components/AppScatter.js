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
    data: []
  };

  componentDidMount() {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then(data => {
        this.setState({ data });
      })
      .catch(err => console.log("ERROR -", err));
  }

  renderData(status) {
    if (!this.state.data.length) return "Loading Data !";
    if (!status) return <ChartWrapperScatter data={this.state.data} />;
    else return <Table data={this.state.data} />;
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
              <Col md={6} xs={12}>
                {this.renderData(false)}
              </Col>
            </Row>

            <Row className="row row2">
              <Col md={6} xs={12}>
                {/* <Table data={this.state.data} /> */}
                {this.renderData(true)}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AppScatter;
