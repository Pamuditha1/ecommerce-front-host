import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import { Redirect, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminHeader from "./AdminHeader";
import AdminViewProducts from "./AdminViewProducts";
import AddSupplier from "./AddSupplier";
import UpdateProduct from "./UpdateProduct";
import NewAdminProducts from "./NewAdminProducts";
import Inventory from "./Inventory";
import { SalesTable } from "./tables/sales/salesTable";
import Sales from "./Sales";
import Orders from "./Orders";
import AdminLogin from "./AdminLogin";
import RegisterUser from "./RegisterUser";
import Customers from "./Customers";
import Reports from "./Reports";

function ControlPannel(props) {
  const [userType, setuserType] = useState("");

  useEffect(() => {
    let t = localStorage.getItem("type");
    setuserType(t);
  }, []);
  console.log("Pannel Props", props.location.pathname);
  return (
    <>
      {localStorage.getItem("adminToken") ? (
        <>
          <AdminHeader />
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10">
              <Switch>
                <Route exact path="/admin/orders" component={Orders} />
                <Route path="/admin/additem" component={AddProduct} />
                <Route path="/admin/updateitem/:id" component={UpdateProduct} />
                <Route path="/admin/viewitems" component={NewAdminProducts} />
                <Route path="/admin/inventory" component={Inventory} />
                <Route path="/admin/customers" component={Customers} />

                <Route path="/admin/add-supplier" component={AddSupplier} />
                <Route path="/admin/sales" component={Sales} />
                <Route path="/admin/register" component={RegisterUser} />
                <Route path="/admin/reports" component={Reports} />
                <Route path="/admin" component={Orders} />

                <Route path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin" component={AdminLogin} />
              </Switch>
            </div>
          </div>
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/admin" component={AdminLogin} />
          </Switch>
          {props.location.pathname != "/admin" && (
            <div>
              No Access, Please Login
              <Link to="/admin">
                <button className="btn btn-outline-light">Log In</button>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ControlPannel;
