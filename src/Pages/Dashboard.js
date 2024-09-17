import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="p-4">         
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
