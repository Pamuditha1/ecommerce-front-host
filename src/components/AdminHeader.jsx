import React from "react";
import logo from "../images/Logo.png";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminHeader() {
  const logout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("type");
    window.location.reload();
  };

  const headerStyle = {
    boxShadow: "0px 10px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
    // backgroundColor: "#f4d219",
    backgroundColor: "#222831",
    marginTop: "10px",
  };
  const logoStyle = {
    boxShadow: "3px 2px 10px black",
    borderRadius: "40px",
  };

  return (
    <div id="adminheader" style={headerStyle}>
      <img
        alt="Logo"
        style={logoStyle}
        src={logo}
        id="logo"
        height="100px"
        width="100px"
      />
      <div id="siteName">
        <h3 id="adminbrand">Men'sCollection</h3>
        <h1 id="admintagline" style={{ color: "white" }}>
          <strong>
            <span style={{ opacity: 0.7 }}> Control Pannel</span>

            <button className="btn btn-outline-light ml-5" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} size="xs" />
              <small className="ml-1">Logout</small>
            </button>
          </strong>
        </h1>
      </div>
    </div>
  );
}

export default AdminHeader;
