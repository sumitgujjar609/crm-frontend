

import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoutes({ children, allowedRoles }) {
    const { isAuthorized, role, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
