import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { isAuthenticated, currentUser } = useAuth();

    if (isAuthenticated) {
        const defaultPath = currentUser.role === 'admin' ? '/dashboard/home' : '/user/dashboard';
        return <Navigate to={defaultPath} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;