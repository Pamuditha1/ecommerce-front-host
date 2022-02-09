import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ component: Component, types, ...rest }) => {
  let jwt;
  if (types.includes("Customer")) {
    jwt = localStorage.getItem("customer-token");
  } else {
    jwt = localStorage.getItem("admin-token");
  }

  let userType;
  if (jwt) {
    const token = jwtDecode(jwt);
    userType = token.type;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        types.includes(userType) ? (
          <Component {...props} />
        ) : (
          <Redirect to={types[0] === "Customer" ? "/" : "/admin"} />
        )
      }
    />
  );
};

export default PrivateRoute;
