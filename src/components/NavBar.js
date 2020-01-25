import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../images/logo.svg";

class NavBar extends Component {
  render() {
    return (
      <nav className="navBarFull">
        <img src={logo} className="appLogo" alt="logo" />
        <h1 className="navBarHeader">SENSITIZE</h1>
      </nav>
    );
  }
}

export default connect(null)(NavBar);
