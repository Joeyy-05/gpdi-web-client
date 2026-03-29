import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// allowedRoles: array of role strings, e.g. ['ketua_rayon', 'jemaat']
// Jika tidak diberikan, semua role yang sudah login boleh masuk
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // Belum login → ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Login tapi role tidak sesuai → arahkan ke halaman yang benar
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    if (user?.role === 'pendeta') return <Navigate to="/dashboard" replace />;
    if (user?.role === 'ketua_rayon') return <Navigate to="/rayon/manajemen-ibadah" replace />;
    return <Navigate to="/jemaat/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;