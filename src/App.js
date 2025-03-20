import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import PublicRoute from "./services/PublicRoute";
import DashboardLayout from "./layout/Dashboard";
import UserDashboard from "./layout/UserDashboard";
import AdminDashboard from "./layout/AdminDashboard";
import Login from "./auth/Login"; 
import RecoveryPassword from "./auth/recovery-password";
import Home from "./pages/home/home";
import Users from "./pages/users/listUser";
import AddUser from "./pages/users/addUser";
import ViewUser from "./pages/users/viewUser";
import UserProfile from "./pages/settings/userProfile";
import IoTWaterMonitor from "./pages/prototype/Prototype";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
        </Route>

        {/* Ruta por defecto redirige a login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🔐 Rutas protegidas para USUARIOS */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
        </Route>

        {/* 🔐 Rutas protegidas para ADMINISTRADORES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/addUser" element={<AddUser />} />
            <Route path="/dashboard/users/viewUser/:userId" element={<ViewUser />} />
          </Route>
        </Route>

        {/* 🔐 Rutas protegidas COMPARTIDAS (Admin y Usuario) */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/home" element={<Home />} />
            <Route path="/dashboard/settings" element={<UserProfile />} />
            <Route path="/dashboard/prototype" element={<IoTWaterMonitor />} />
          </Route>
        </Route>

        {/* Ruta para cualquier otra URL */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
