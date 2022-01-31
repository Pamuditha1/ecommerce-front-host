import React from "react";
import AddProduct from "./AddProduct";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import AddSupplier from "./AddSupplier";
import AdminProducts from "./AdminProducts";
import Inventory from "./Inventory";
import Sales from "./Sales";
import Orders from "./Orders";
import AdminLogin from "./AdminLogin";
import RegisterUser from "./RegisterUser";
import Customers from "./Customers";
import Reports from "./Reports";
import UpdateProduct from "./UpdateProduct";
import Categories from "./Categories";

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
                <Route exact path="/admin/category" component={Categories} />
                <Route exact path="/admin/orders" component={Orders} />
                <Route path="/admin/item/add" component={AddProduct} />
                <Route
                  path="/admin/item/update/:id"
                  component={UpdateProduct}
                />
                <Route path="/admin/items" component={AdminProducts} />
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
