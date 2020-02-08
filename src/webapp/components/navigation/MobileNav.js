import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { FaUserSecret as Logo } from "react-icons/fa";
import LogStatus from "../auth/LogStatus";

function MobileNav(props) {

  return (
    <nav
      style={{
        width: "100%",
        zIndex: "99",
        backgroundColor: "#1f2179",
        position: "fixed",
        top: 0,
        left: 0,
        height: "85px"
      }}
      id="mobile-nav-menu"
      className="d-xs-flex d-md-none navbar navbar-dark"
    >
      <h1 className="text-white">
        AskIt
        <Link to="/" className="text-white">
          <Logo />
        </Link>
      </h1>
      <button
        className="navbar-toggler third-button"
        id="mobile-collapser"
        type="button"
        data-toggle="collapse"
        data-target="#mobile-nav-header"
        aria-controls="mobile-nav-header"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        style={{ backgroundColor: "#1f2179" }}
        className="collapse navbar-collapse"
        id="mobile-nav-header"
      >
        <ul id="mobile-nav-ul" className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className=" nav-link text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/latest" className=" nav-link text-white">
              Latest
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/questions" className=" nav-link text-white">
              Answer
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ask" className=" nav-link text-white">
              Ask
            </Link>
          </li>
          <li className="nav-item">
            <LogStatus />
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default MobileNav;
