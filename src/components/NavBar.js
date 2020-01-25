import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../images/logo.svg";

class NavBar extends Component {
  render() {
    return (
      <nav className="navBarFull">
        <h1 className="navBarHeader">SENSITIZE</h1>
        <img src={logo} className="appLogo" alt="logo" />
      </nav>
    );
  }
}

export default connect(null)(NavBar);
