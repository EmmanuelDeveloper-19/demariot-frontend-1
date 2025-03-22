// src/layout/Dashboard.js
import React from "react";
import { SidebarProvider } from "../components/SidebarContext";  // Asegúrate de que este archivo exista
import Layout from "../layout/Layout"; // Importa el Layout aquí

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div c>
        <Layout />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
