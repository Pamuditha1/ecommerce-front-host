import React from "react";
import { CustomersTable } from "../../components/tables/customers/customersTable";

function Customers() {
  const tableStyle = {
    marginLeft: "-70px",
    marginRight: "-70px",
  };
  return (
    <div style={tableStyle}>
      <h6
        style={{ backgroundColor: "blueviolet" }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        Customers
      </h6>
      <CustomersTable />
    </div>
  );
}

export default Customers;
