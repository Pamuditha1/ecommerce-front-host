import React from "react";
import logo from "../images/Logo.png";

const headerStyle = {
  boxShadow: "0px 10px 10px black",
  fontWeight: "bold",
  borderRadius: "40px",
};
const logoStyle = {
  boxShadow: "3px 2px 10px black",
  borderRadius: "40px",
};

function Header() {
  return (
    <div id="header" style={headerStyle}>
      <img
        alt="Logo"
        src={logo}
        style={logoStyle}
        id="logo"
        height="100px"
        width="100px"
      />
      <div id="siteName">
        <h1 id="brand">Men'sCollection</h1>
        <h4 id="tagline" style={{ color: "grey" }}>
          - wear your dream -
        </h4>
      </div>
    </div>
  );
}

export default Header;
