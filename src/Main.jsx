import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./css/pageStyle.css";

import ControlPannel from "./ControlPannel";
import CustomerView from "./CustomerView";
import AdminLogin from "./pages/admin/AdminLogin";
import ReactGA from "react-ga";

function Main() {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <Switch>
        <Route exact path="/admin" component={AdminLogin} />
        <Route path="/admin" component={ControlPannel} />
        <Route path="/user" component={CustomerView} />
        <Route exact path="/" component={CustomerView} />
      </Switch>
    </div>
  );
}

export default Main;
