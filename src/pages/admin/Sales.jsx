import React from "react";

import { SalesTable } from "../../components/tables/sales/salesTable";

function Sales() {
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
        Sales
      </h6>
      <SalesTable />
    </div>
  );
}

export default Sales;
