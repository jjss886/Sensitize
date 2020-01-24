import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// IMPORT COMPONENTS
import ChartWrapperBar from "./ChartWrapperBar";
import GenderDropdown from "./GenderDropdown";

class AppBar extends Component {
  state = {
    gender: "men"
  };

  genderSelected = gender => this.setState({ gender });

  render() {
    return (
      <div className="appBarDiv">
        <Container className="containerBarDiv">
          <Row>
            <Col xs={12}>
              <GenderDropdown genderSelected={this.genderSelected} />
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <ChartWrapperBar gender={this.state.gender} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AppBar;
