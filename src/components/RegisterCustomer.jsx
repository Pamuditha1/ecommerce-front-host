import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import registerCustomer from "../services/registerCustomer";

function RegisterCustomer() {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      password: "",
      repeatpassword: "",
      district: "",
      province: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 10 characters")
        .required("Name is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      contact: Yup.string()
        .matches(phoneRegex, "Invalid Phone Number.")
        .required("Contact No Required"),
      address: Yup.string().required("Address is Required"),
      password: Yup.string()
        .min(5, "Minimum 5 Characters")
        .required("Password is Required"),
      repeatpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's Not Match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      let newOb = {
        ...values,
      };
      const jwt = await registerCustomer(newOb);
      localStorage.setItem("customer-token", jwt);
    },
  });

  return (
    <div>
      <center>
        <Link to="/user/login">
          <button type="button" className="btn btn-light">
            Already Registered? Login
          </button>
        </Link>
      </center>
      <form
        onSubmit={formik.handleSubmit}
        className="container mt-5"
        autoComplete="off"
      >
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="name" className="col-5">
                  Customer Name
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="name"
                  name="name"
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.name}</p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control col-11 ml-3"
                  type="email"
                  id="email"
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="contact" className="col-5">
                  Contact No
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contact}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="contact"
                  name="contact"
                />
                {formik.errors.contact && formik.touched.contact && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contact}
                  </p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="address" className="col-5">
                  Address
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="address"
                  name="address"
                />
                {formik.errors.address && formik.touched.address && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="repeatpassword" className="col-5">
                  Repeat Password
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.repeatpassword}
                  className="form-control col-11 ml-3"
                  maxlength="10"
                  minLength="6"
                  type="password"
                  id="repeatpassword"
                  name="repeatpassword"
                />
                {formik.errors.repeatpassword &&
                  formik.touched.repeatpassword && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.repeatpassword}
                    </p>
                  )}
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button type="submit" className="btn btn-success">
                    Register
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterCustomer;
