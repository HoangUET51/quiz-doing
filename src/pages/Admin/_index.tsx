import React, { useState } from "react";
import "../../styles/Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/blocks/sideBar/sideBar";
import Toastify from "../../components/blocks/Toastify/Toastify";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content w-full">
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
      <Toastify />
    </div>
  );
};

export default Admin;
