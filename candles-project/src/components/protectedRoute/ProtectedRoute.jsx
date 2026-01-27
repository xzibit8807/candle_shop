import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // 🔒 admin-only route
    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
