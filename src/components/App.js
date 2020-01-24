import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// IMPORT COMPONENTS
import logo from "../images/logo.svg";
import ChartWrapper from "./ChartWrapper";
import GenderDropdown from "./GenderDropdown";

class App extends Component {
  state = {
    gender: "men"
  };

  genderSelected = gender => this.setState({ gender });

  render() {
    return (
      <div className="App">
        <Navbar bg="light" className="navBarFull">
          <Navbar.Brand>SENSITIZE</Navbar.Brand>
        </Navbar>

        <div className="belowNavBarFullDiv">
          <img src={logo} className="appLogo" alt="logo" />
          <p>JAMES SHEN ROOLZ</p>

          <Container>
            <Row>
              <Col xs={12}>
                <GenderDropdown genderSelected={this.genderSelected} />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <ChartWrapper gender={this.state.gender} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
