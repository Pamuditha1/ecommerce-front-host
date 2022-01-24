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
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["T-Shirt", "Shirt", "Trouser", "Shorts"];

  const toggle = () => setIsOpen(!isOpen);

  const navbarStyle = {
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
    zIndex: +10,
  };
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
  const headerStyle = {
    boxShadow: "0px 10px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
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
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <div className="row">
                <div className="col-8"> */}
            <NavItem>
              <NavLink href="/" style={linkStyle}>
                Home
              </NavLink>
            </NavItem>
            {/* <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem> */}
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
                {/* <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem> */}
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
                  <a className="nav-link">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size="2x"
                      style={{ color: "black" }}
                    />
                    <Badge color="danger">
                      {/* {props.count || props.cCount} */}
                      {JSON.parse(localStorage.getItem("cart"))
                        ? JSON.parse(localStorage.getItem("cart")).length
                        : 0}
                    </Badge>{" "}
                  </a>
                </Link>
              </NavItem>
            </Nav>
            {/* </div></div> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
    // <nav class="navbar navbar-expand-md navbar-light" style={{backgroundColor: 'white'}}>

    // {/* <a class="navbar-brand" href="#!">
    //     <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="30" alt="mdb logo" />
    // </a> */}

    // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav1"
    //     aria-controls="basicExampleNav1" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    // </button>
    // {/* <ol class="breadcrumb">
    //     <li class="breadcrumb-item"><a class="waves-effect" href="#!">Home</a></li>
    //     <li class="breadcrumb-item"><a class="waves-effect" href="#!">Templates</a></li>
    //     <li class="breadcrumb-item active"><a class="waves-effect" href="#!">E-commerce</a></li>
    // </ol> */}
    // <div class="collapse navbar-collapse" id="basicExampleNav1">
    //     <ul class="navbar-nav ml-auto">
    //     <li class="nav-item">
    //         <a href="#!" class="nav-link navbar-link-2 waves-effect">
    //         <span class="badge badge-pill red">1</span>
    //         <i class="fas fa-shopping-cart pl-0"></i>
    //         </a>
    //     </li>
    //     <li class="nav-item dropdown">
    //         <a class="nav-link dropdown-toggle waves-effect" id="navbarDropdownMenuLink3" data-toggle="dropdown"
    //         aria-haspopup="true" aria-expanded="true">
    //         <i class="united kingdom flag m-0"></i>
    //         </a>
    //         <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
    //         <a class="dropdown-item" href="#!">Action</a>
    //         <a class="dropdown-item" href="#!">Another action</a>
    //         <a class="dropdown-item" href="#!">Something else here</a>
    //         </div>
    //     </li>
    //     <li class="nav-item">
    //         <a href="#!" class="nav-link waves-effect">
    //         Shop
    //         </a>
    //     </li>
    //     <li class="nav-item">
    //         <a href="#!" class="nav-link waves-effect">
    //         Contact
    //         </a>
    //     </li>
    //     <li class="nav-item">
    //         <a href="#!" class="nav-link waves-effect">
    //         Sign in
    //         </a>
    //     </li>
    //     <li class="nav-item pl-2 mb-2 mb-md-0">
    //         <a href="#!" type="button"
    //         class="btn btn-outline-info btn-md btn-rounded btn-navbar waves-effect waves-light">Sign up</a>
    //     </li>
    //     </ul>

    // </div>

    // </nav>
    // <div>
    //     <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="Navbar" >

    //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //             <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <div className="collapse navbar-collapse" id="navbarNav">
    //             <div className="row">
    //                 <ul className="navbar-nav">
    //                     <div className="col-2">
    //                         <li className="nav-item active">
    //                             <Link to="/user">
    //                                 <a className="nav-link">Home</a>
    //                             </Link>
    //                         </li>
    //                     </div>
    //                     <div className="col-2">
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="AboutUs.html">About</a>
    //                         </li>
    //                     </div>
    //                     <div className="col-12">
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="ContactUs.html">Contact Us</a>
    //                         </li>
    //                     </div>
    //                     <div className="col-1">
    //                         <li className="nav-item" style={{right: '0px'}}>
    //                             {
    //                                 !localStorage.getItem('token') ?
    //                                 <Link to="/user/register">
    //                                 <a className="nav-link" ><FontAwesomeIcon icon={faUser} size="2x" /></a>
    //                             </Link>  : <p>{username}</p>
    //                             }
    //                             {/* {
    //                                 !localStorage.getItem('token') ?
    //                                 <Link to="/user/register">
    //                                     <a className="nav-link" ><FontAwesomeIcon icon={faUser} size="2x" /></a>
    //                                 </Link>  : <p>{username}</p>
    //                             } */}

    //                         </li>
    //                     </div>
    //                     <div className="col-1" >
    //                         <li className="nav-item" style={{right: '0px'}}>
    //                             <Link to="/user/cart">
    //                                 <a className="nav-link" ><FontAwesomeIcon icon={faShoppingCart} size="2x" /></a>
    //                             </Link>
    //                         </li>
    //                     </div>
    //                     <div className="col-2">
    //                         <Link to="/user/cart">
    //                             <Badge color="warning">{props.count || props.cCount}</Badge>
    //                         </Link>
    //                     </div>
    //                 </ul>
    //             </div>
    //         </div>
    //     </nav>
    // </div>
  );
}

export default NavBar;
