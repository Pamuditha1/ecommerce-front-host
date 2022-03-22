import React from "react";

import { InventoryTable } from "../../components/tables/inventory/InventoryTable";

function Inventory() {
  const tableStyle = {
    marginLeft: "-70px",
    marginRight: "-70px",
  };
  return (
    <div style={tableStyle}>
      <h6
        style={{
          backgroundColor: "#3b485c",
          boxShadow: "0px 5px 5px black",
        }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        Inventory
      </h6>

      <InventoryTable />
    </div>
  );
}

export default Inventory;
