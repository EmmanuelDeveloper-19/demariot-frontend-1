import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { currentUser, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
        const defaultPath = currentUser.role === 'admin' ? '/dashboard/home' : '/user/dashboard';
        return <Navigate to={defaultPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;