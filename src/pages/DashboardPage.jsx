import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard GPdI</h1>
            <p>Selamat datang, {user?.name}!</p>
            <p>Role Anda: <strong>{user?.role}</strong></p>
            <button onClick={logout} style={{ padding: '8px 15px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Keluar</button>
        </div>
    );
};

export default DashboardPage;