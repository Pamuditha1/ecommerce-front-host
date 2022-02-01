import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import AdminHeader from "./components/AdminHeader";
import Sidebar from "./components/Sidebar";

import Orders from "./pages/admin/Orders";
import AddProduct from "./pages/admin/AddProduct";
import ViewProducts from "./pages/admin/ViewProducts";
import UpdateProduct from "./components/UpdateProduct";
import Customers from "./pages/admin/Customers";
import Inventory from "./pages/admin/Inventory";
import Sales from "./pages/admin/Sales";
import AddSupplier from "./pages/admin/AddSupplier";
import Categories from "./pages/admin/Categories";
import Reports from "./pages/admin/Reports";
import RegisterUser from "./pages/admin/RegisterUser";

import AdminLogin from "./pages/admin/AdminLogin";

function ControlPannel(props) {
  return (
    <>
      {localStorage.getItem("admin-token") ? (
        <>
          <AdminHeader />
          <div className="row">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10">
              <Switch>
                <Route exact path="/admin/orders" component={Orders} />
                <Route path="/admin/item/add" component={AddProduct} />
                <Route path="/admin/items" component={ViewProducts} />
                <Route
                  path="/admin/item/update/:id"
                  component={UpdateProduct}
                />
                <Route path="/admin/customers" component={Customers} />
                <Route path="/admin/inventory" component={Inventory} />
                <Route path="/admin/sales" component={Sales} />
                <Route path="/admin/add-supplier" component={AddSupplier} />
                <Route exact path="/admin/category" component={Categories} />
                <Route path="/admin/reports" component={Reports} />
                <Route path="/admin/register" component={RegisterUser} />
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
          {props.location.pathname !== "/admin" && (
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
