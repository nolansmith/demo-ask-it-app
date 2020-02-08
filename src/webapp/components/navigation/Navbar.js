import React from "react";
// const NavbarLinks = React.lazy(() => {
//   import(/* webpackChunkName: "NavbarLinks" */ "./NavbarLinks");
// });
// const NavbarLogo = React.lazy(() => {
//   import(/* webpackChunkName: "NavbarLogo" */ "./NavbarLogo");
// });

import NavbarLinks from './NavbarLinks';
import NavbarLogo from './NavbarLogo'

export default function Navbar() {
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
     
        <NavbarLogo />
        <NavbarLinks />
   
    </div>
  );
}
