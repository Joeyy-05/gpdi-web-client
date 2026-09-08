import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // Jika belum login, tendang kembali ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/ibadah-rayon" replace />;
  }

  // Jika sudah login, izinkan akses ke komponen anak (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
