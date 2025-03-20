import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({ user }) {
    const Token = localStorage.getItem('token');
    if (!Token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default PrivateRoute;