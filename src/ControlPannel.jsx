import React, { useEffect } from "react";
import { Switch } from "react-router-dom";

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

import PrivateRoute from "./components/PrivateRoute";
import AdminContainer from "./components/AdminContainer";

function ControlPannel(props) {
  useEffect(() => {
    document.title = "Admin | Men's Collection";
  }, []);
  return (
    <>
      <AdminContainer>
        <Switch>
          <PrivateRoute
            component={Orders}
            path="/admin/orders"
            types={["Admin", "Employee"]}
          />
          <PrivateRoute
            component={AddProduct}
            path="/admin/item/add"
            types={["Admin"]}
          />
          <PrivateRoute
            component={ViewProducts}
            path="/admin/items"
            types={["Admin", "Employee"]}
          />
          <PrivateRoute
            component={UpdateProduct}
            path="/admin/item/update/:id"
            types={["Admin", "Employee"]}
          />
          <PrivateRoute
            component={Customers}
            path="/admin/customers"
            types={["Admin", "Employee"]}
          />
          <PrivateRoute
            component={Inventory}
            path="/admin/inventory"
            types={["Admin", "Employee"]}
          />
          <PrivateRoute
            component={Sales}
            path="/admin/sales"
            types={["Admin"]}
          />
          <PrivateRoute
            component={AddSupplier}
            path="/admin/add-supplier"
            types={["Admin"]}
          />
          <PrivateRoute
            component={Categories}
            path="/admin/category"
            types={["Admin"]}
          />
          <PrivateRoute
            component={Reports}
            path="/admin/reports"
            types={["Admin"]}
          />
          <PrivateRoute
            component={RegisterUser}
            path="/admin/register"
            types={["Admin"]}
          />
        </Switch>
      </AdminContainer>
    </>
  );
}

export default ControlPannel;
