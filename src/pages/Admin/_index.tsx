import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/blocks/sideBar/sideBar";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container flex flex-row h-[100vh]">
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
    </div>
  );
};

export default Admin;
