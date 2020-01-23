import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import logo from "../images/logo.svg";
import "../ast/app.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" className="navBarFull">
          <Navbar.Brand>SENSITIZE</Navbar.Brand>
        </Navbar>

        <div className="belowNavBarFullDiv">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>JAMES SHEN ROOLZ</p>
            <Container>
              <ChartWrapper />
            </Container>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
