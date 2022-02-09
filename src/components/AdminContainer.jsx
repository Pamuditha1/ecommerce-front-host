import React from "react";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";

function AdminContainer({ children }) {
  return (
    <>
      <AdminHeader />
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">{children}</div>
      </div>
    </>
  );
}

export default AdminContainer;
