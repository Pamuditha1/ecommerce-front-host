import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../css/pageStyle.css";
import ControlPannel from "./ControlPannel";
import CustomerView from "./CustomerView";

function Main() {
  return (
    <div className="container">
      <ToastContainer />
      <Switch>
        <Route path="/admin" component={ControlPannel} />
        <Route path="/user" component={CustomerView} />
        <Route exact path="/" component={CustomerView} />
      </Switch>
    </div>
  );
}

export default Main;
