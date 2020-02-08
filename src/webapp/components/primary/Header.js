import React, { Component } from "react";
import Navbar from "../navigation/Navbar";
import MobileNav from '../navigation/MobileNav';
// const Navbar = React.lazy(() =>
//   import(/* webpackChunkName: "Navbar" */ "../navigation/Navbar")
// );
// const MobileNav = React.lazy(() =>
//   import(/* webpackChunkName: "MobileNav" */ "../navigation/MobileNav")
// );

function Header(props) {
  return (
    
     <>
      <Navbar />
      <MobileNav />
    </>
  );
}

export default Header;
