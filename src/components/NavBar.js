import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

class NavBar extends Component {
  render() {
    return (
      <nav className="navBarFull">
        <div className="navBarOne">
          <img src={logo} className="appLogo" alt="logo" />
          <h1 className="navBarHeader">SENSITIZE</h1>
        </div>

        <div className="navBarTwo">
          <Link to="/" className="navBarText linkText">
            Home
          </Link>

          <Link to="/adminPanel" className="navBarText linkText">
            Admin Panel
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
