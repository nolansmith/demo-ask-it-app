import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { FaUserSecret as Logo } from "react-icons/fa";
import LogStatus from "../auth/LogStatus";

class Header extends Component {
  render() {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          height: "85px",
          width: "100%",
          margin: "0 auto",
        
          padding: "0 0",
          backgroundColor: "#1f2179",
          position: "fixed",
          top: 0,
          left: 0,
         
          zIndex: "99"
        }}
        className="d-none d-md-flex"
      >
        <div style={{ marginLeft: "25px" }} id="site_title">
          <h3 className="header-text text-white">
            <Link to="/" className="text-white">
              AskIt <Logo />
            </Link>
          </h3>
        </div>
        <div id="site_logo" style={{ width: "33%" }} />
        <div className="d-flex" style={{ marginRight: "25px" }} id="site_login">
          <ul id="header-ul" className="nav">
            <li className="nav-item">
              <Link
                activeClassName="aw-nav-link-active"
                exact
                to="/"
                className=" nav-link text-white"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClassName="aw-nav-link-active"
                to="/latest"
                className=" nav-link text-white"
              >
                Latest
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClassName="aw-nav-link-active"
                to="/questions"
                className=" nav-link text-white"
              >
                Answer
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClassName="aw-nav-link-active"
                to="/ask"
                className=" nav-link text-white"
              >
                Ask
              </Link>
            </li>
            <li className="nav-item">
              <LogStatus />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
