import React from "react";
import { NavLink as Link } from "react-router-dom";
import { FaUserSecret as Logo } from "react-icons/fa";

export default function NavbarLogo() {
  return (
    <div style={{ marginLeft: "25px" }} id="navbar_logo_area">
      <h3 className="header-text text-white">
        <Link to="/" className="text-white">
          AskIt <Logo />
        </Link>
      </h3>
    </div>
  );
}
