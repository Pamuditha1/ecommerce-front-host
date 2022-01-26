import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import jwtDecode from "jwt-decode";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["T-Shirt", "Shirt", "Trouser", "Shorts"];

  const toggle = () => setIsOpen(!isOpen);

  const [username, setusername] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const usern = jwtDecode(jwt).name.split(" ")[0];

      setusername(usern);
    } catch (err) {
      console.log(err);
    }
  }, [username]);

  const logout = () => {
    localStorage.removeItem("token");
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
  };

  const navStyle = {
    borderRadius: "30px",
    marginBottom: "20px",
    backgroundColor: "#f8e36e",
    boxShadow: "0px 10px 10px black",
  };

  return (
    <div>
      <Navbar expand="md" style={navStyle}>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/" style={linkStyle}>
                Home
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={linkStyle}>
                Categories
              </DropdownToggle>
              <DropdownMenu right>
                {categories.map((c) => {
                  return (
                    <Link to={`/user/category/${c}`} style={linkStyle}>
                      <DropdownItem>{c}</DropdownItem>
                    </Link>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Nav className="ml-5">
              <NavItem className="ml-3">
                {!localStorage.getItem("token") ? (
                  <UncontrolledDropdown nav inNavbar style={linkStyle}>
                    <DropdownToggle nav caret style={linkStyle}>
                      <FontAwesomeIcon
                        icon={faUser}
                        size="2x"
                        style={linkStyle}
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link to="/user/login" style={linkStyle}>
                          Sign In
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/user/register" style={linkStyle}>
                          Sign Up
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <p style={{ color: "black" }} className="pt-2">
                    {username}{" "}
                    <Link to="/">
                      <small style={{ color: "black" }} onClick={logout}>
                        Logout
                      </small>
                    </Link>
                  </p>
                )}
              </NavItem>
              <NavItem className="float-right" style={linkStyle}>
                <Link to="/user/cart" style={linkStyle}>
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size="2x"
                      style={{ color: "black" }}
                    />
                    <Badge color="danger">
                      {JSON.parse(localStorage.getItem("cart"))
                        ? JSON.parse(localStorage.getItem("cart")).length
                        : 0}
                    </Badge>{" "}
                  </a>
                </Link>
              </NavItem>
            </Nav>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
