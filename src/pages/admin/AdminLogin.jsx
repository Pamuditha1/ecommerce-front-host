import React, { useState } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { userLogin } from "../../services/admin";

function AdminLogin(props) {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [invalidLogin, setinvalidLogin] = useState(false);

  const onchange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const result = await userLogin(loginData);
    if (result) {
      localStorage.setItem("admin-token", result.token);
      localStorage.setItem("type", result.type);
      props.history.push("/admin/orders");
    } else {
      setinvalidLogin(true);
    }
  };

  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const formStyle = {
    backgroundColor: "rgb(0, 0, 0, 0.7)",
    padding: "50px 30px 50px 30px",
    color: "white",
    borderRadius: "20px",
  };

  return (
    <div className="row" style={style}>
      {invalidLogin && (
        <center>
          <div class="alert alert-warning" role="alert">
            Please check you email and password.{" "}
          </div>
        </center>
      )}

      <div className="col-3"></div>
      <form className="container mt-5 mb-5 col-6" style={formStyle}>
        <center>
          <FontAwesomeIcon icon={faUserCircle} size="10x" />
        </center>

        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={onchange}
                  value={loginData.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={onchange}
                  value={loginData.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-success"
                  >
                    Login
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="col-3"></div>
    </div>
  );
}

export default AdminLogin;
