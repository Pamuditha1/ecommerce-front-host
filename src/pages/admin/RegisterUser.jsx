import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { registerUser } from "../../services/admin";

function RegisterUser() {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const nicRegex = /^([0-9]{9}[X|V]|[0-9]{12})$/;
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      contactNo: "",
      contactNo2: "",
      nic: "",
      address: "",
      type: "",
      password: "",
      repeatpassword: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 10 characters")
        .required("Username is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      contactNo: Yup.string()
        .matches(phoneRegex, "Invalid Phone Number")
        .required("Contact No Required"),
      contactNo2: Yup.string()
        .matches(phoneRegex, "Invalid Phone Number")
        .required("Contact No Required"),
      nic: Yup.string()
        .matches(nicRegex, "Invalid NIC number")
        .required("National Identity Card Number is Required"),
      address: Yup.string().required("Address is Required"),
      type: Yup.string().required("User Role is Required"),
      password: Yup.string()
        .min(5, "Minimum 5 Characters")
        .required("Password is Required"),
      repeatpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's Not Match")
        .required("Password is Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const status = await registerUser(values);
      if (status === 200) resetForm();
    },
  });

  const roles = ["Choose Role", "Employee", "Admin"];

  return (
    <div>
      <h6
        style={{
          backgroundColor: "#3b485c",
          boxShadow: "0px 5px 5px black",
        }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        Register User
      </h6>
      <form
        onSubmit={formik.handleSubmit}
        className="container mt-5"
        autoComplete="off"
      >
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="username" className="col-5">
                  User Name
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="username"
                  name="username"
                />
                {formik.errors.username && formik.touched.username && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.username}
                  </p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="nic" className="col-5">
                  NIC
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.nic}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="nic"
                  name="nic"
                />
                {formik.errors.nic && formik.touched.nic && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.nic}</p>
                )}
              </div>

              <div className="form-group col-6">
                <label htmlFor="contactNo" className="col-5">
                  Contact No (Mobile)
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactNo}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="contactNo"
                  name="contactNo"
                />
                {formik.errors.contactNo && formik.touched.contactNo && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contactNo}
                  </p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="contactNo2" className="col-5">
                  Contact No (Fixed)
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactNo2}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="contactNo2"
                  name="contactNo2"
                />
                {formik.errors.contactNo2 && formik.touched.contactNo2 && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contactNo2}
                  </p>
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
                  type="text"
                  id="email"
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.email}</p>
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
                <label htmlFor="type" className="col-5">
                  User Role
                </label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  id="type"
                  name="type"
                  className="form-control col-11 ml-3"
                  required
                >
                  {roles.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                        style={{ textAlign: "center" }}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.type && formik.touched.type && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.type}</p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control col-10 ml-3"
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
              <div className="form-group col-6">
                <label htmlFor="repeatpassword" className="col-5">
                  Repeat Password
                </label>
                <input
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.repeatpassword}
                  className="form-control col-10 ml-3"
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
                  <button type="submit" className="btn btn-outline-light">
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

export default RegisterUser;
