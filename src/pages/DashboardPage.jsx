import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h1>Dashboard GPdI</h1>
                <div>
                    <Link to="/profile" style={{ marginRight: '15px', textDecoration: 'none', color: '#0056b3' }}>Pengaturan Profil</Link>
                    {user?.role === 'jemaat_aktif' && (
                        <Link to="/family" style={{ marginRight: '15px', textDecoration: 'none', color: '#0056b3' }}>Data Keluarga</Link>
                    )}
                    <button onClick={logout} style={{ padding: '6px 12px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Keluar</button>
                </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <p>Selamat datang, <strong>{user?.name || user?.email}</strong>!</p>
                <p>Akses Sistem: <strong>{user?.role}</strong></p>
                <p>Silakan gunakan menu di atas untuk mengelola data Anda.</p>
            </div>
        </div>
    );
};

export default DashboardPage;