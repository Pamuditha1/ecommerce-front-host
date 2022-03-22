import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { registerSupplier } from "../../services/suppliers";

function AddSupplier() {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const nicRegex = /^([0-9]{9}[X|V]|[0-9]{12})$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact1: "",
      contact2: "",
      nic: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 10 characters")
        .required("Name is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      contact1: Yup.string()
        .matches(phoneRegex, "Invalid Phone Number")
        .required("Contact No is Required"),
      contact2: Yup.string()
        .matches(phoneRegex, "Invalid Phone Number")
        .required("Contact No is Required"),
      nic: Yup.string()
        .matches(nicRegex, "Invalid NIC number")
        .required("National Identity Card Number is Required."),
      address: Yup.string().required("Address is Required"),
    }),
    onSubmit: async (values) => {
      await registerSupplier(values);
    },
  });

  return (
    <div>
      <h6
        style={{ backgroundColor: "blueviolet" }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        Add Supplier
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
                <label htmlFor="name" className="col-5">
                  Supplier Name
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="name"
                  name="name"
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.name}</p>
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
                <label htmlFor="contact1" className="col-5">
                  Contact No (Mobile)
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contact1}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="contact1"
                  name="contact1"
                />
                {formik.errors.contact1 && formik.touched.contact1 && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contact1}
                  </p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="contact2" className="col-5">
                  Contact No (Official)
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contact2}
                  className="form-control col-10 ml-3"
                  type="text"
                  id="contact2"
                  name="contact2"
                />
                {formik.errors.contact2 && formik.touched.contact2 && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contact2}
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

export default AddSupplier;
