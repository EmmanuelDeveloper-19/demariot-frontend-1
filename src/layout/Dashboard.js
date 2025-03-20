import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* Pasamos el estado sidebarOpen y la función handleMenuToggle */}
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className={`main-area ${sidebarOpen ? 'expanded' : ''}`}>
        <Toolbar onMenuToggle={handleMenuToggle} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
