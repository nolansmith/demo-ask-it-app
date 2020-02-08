import React from 'react';
import { NavLink as Link } from "react-router-dom";
import LogStatus from "../auth/LogStatus";

export default function NavbarLinks() {
  return (
    <div className="d-flex" style={{ marginRight: "25px" }} id="navbar_link_area">
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
  );
}
