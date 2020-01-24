import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { json } from "d3";

// IMPORT COMPONENTS
import logo from "../images/logo.svg";
import ChartWrapperScatter from "./ChartWrapperScatter";

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

  renderChart() {
    if (!this.state.data.length) return "Loading Data !";
    return <ChartWrapperScatter data={this.state.data} />;
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
            <Row>
              <Col md={6} xs={12}>
                {this.renderChart()}
              </Col>
            </Row>

            <Row>
              <Col md={6} xs={12}></Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AppScatter;
