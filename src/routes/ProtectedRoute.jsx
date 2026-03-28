import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    // Jika belum login, tendang kembali ke halaman login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Jika sudah login, izinkan akses ke komponen anak (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;