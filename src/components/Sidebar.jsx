import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faPlusCircle,
  faImages,
  faBoxes,
  faHandshake,
  faHandHoldingUsd,
  faBell,
  faUserPlus,
  faUserTag,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import "../css/sideBar.css";
import getOrdersCount from "../services/getOrdersCount";

function Sidebar() {
  const [clicked, setclicked] = useState("");
  const [numOfOrders, setnumOfOrders] = useState(0);
  const [userType, setuserType] = useState("");

  useEffect(() => {
    let t = localStorage.getItem("type");
    console.log("Type", t);
    setuserType(t);

    setInterval(async () => {
      let count = await getOrdersCount();
      setnumOfOrders(count);
    }, 10000);

    // let count = await getOrdersCount()
    // setnumOfOrders(count)
  }, []);

  const onClickStyle = {
    backgroundColor: "white",
    opacity: "0.7",
    color: "black",
    fontWeight: "bold",
  };
  const s = {};
  const onClick = (e) => {
    setclicked(e.target.id);
    console.log(clicked);
  };

  return (
    // {userType == "Admin"

    //   }
    <div className="sidenav">
      <Link to="/admin/orders">
        <p
          onClick={onClick}
          id="orders"
          style={clicked == "orders" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faBell} size="2x" />
          </span>
          Orders
          {numOfOrders > 0 && (
            <Badge className="ml-3" color="warning">
              {numOfOrders}
            </Badge>
          )}
        </p>
      </Link>
      <Link to="/admin/additem">
        <p
          onClick={onClick}
          id="add-item"
          style={clicked == "add-item" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
          </span>
          Add Item
        </p>
      </Link>
      <Link to="/admin/viewitems">
        <p
          onClick={onClick}
          id="view-item"
          style={clicked == "view-item" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faImages} size="2x" />
          </span>
          View Items
        </p>
      </Link>
      <Link to="/admin/customers">
        <p
          onClick={onClick}
          id="cus"
          style={clicked == "cus" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faUserTag} size="2x" />
          </span>
          Customers
        </p>
      </Link>

      <Link to="/admin/inventory">
        <p
          onClick={onClick}
          id="inven"
          style={clicked == "inven" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faBoxes} size="2x" />
          </span>
          Inventory
        </p>
      </Link>

      {userType == "Admin" && (
        <Link to="/admin/sales">
          <p
            onClick={onClick}
            id="sales"
            style={clicked == "sales" ? onClickStyle : s}
          >
            <span style={{ marginRight: 10 }}>
              <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" />
            </span>
            Sales
          </p>
        </Link>
      )}
      {userType == "Admin" && (
        <Link to="/admin/add-supplier">
          <p
            onClick={onClick}
            id="add-supp"
            style={clicked == "add-supp" ? onClickStyle : s}
          >
            <span style={{ marginRight: 10 }}>
              <FontAwesomeIcon icon={faHandshake} size="2x" />
            </span>
            Add Supplier
          </p>
        </Link>
      )}
      {userType == "Admin" && (
        <Link to="/admin/reports">
          <p
            onClick={onClick}
            id="reports"
            style={clicked == "reports" ? onClickStyle : s}
          >
            <span style={{ marginRight: 10 }}>
              <FontAwesomeIcon icon={faChartLine} size="2x" />
            </span>
            Reports
          </p>
        </Link>
      )}
      {userType == "Admin" && (
        <Link to="/admin/register">
          <p
            onClick={onClick}
            id="register"
            style={clicked == "register" ? onClickStyle : s}
          >
            <span style={{ marginRight: 10 }}>
              <FontAwesomeIcon icon={faUserPlus} size="2x" />
            </span>
            Register User
          </p>
        </Link>
      )}

    </div>
  );
}

export default Sidebar;
