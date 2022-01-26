import React from "react";
import AdminProducts from "./AdminProducts";

function AdminViewProducts() {
  return (
    <div>
      <h6
        style={{ backgroundColor: "blueviolet" }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        Items
      </h6>
      <AdminProducts />
    </div>
  );
}

export default AdminViewProducts;
