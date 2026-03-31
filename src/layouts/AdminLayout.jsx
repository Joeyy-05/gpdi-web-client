import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Fungsi untuk menandai menu yang sedang aktif
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* SIDEBAR */}
            <aside className={`bg-slate-900 text-white flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
                <div className="h-20 flex items-center justify-center border-b border-slate-800">
                    <span className="text-xl font-bold tracking-wider whitespace-nowrap">GPdI ADMIN</span>
                </div>
                
                <nav className="flex-1 overflow-y-auto py-6">
                    <p className="px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu Utama</p>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/dashboard" className={`block px-6 py-3 hover:bg-slate-800 transition whitespace-nowrap ${location.pathname === '/dashboard' ? 'bg-blue-600 border-l-4 border-blue-400 text-white' : 'text-slate-300'}`}>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/jemaat" className={`block px-6 py-3 hover:bg-slate-800 transition whitespace-nowrap ${isActive('/dashboard/jemaat') ? 'bg-blue-600 border-l-4 border-blue-400 text-white' : 'text-slate-300'}`}>Manajemen Jemaat</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/konten" className={`block px-6 py-3 hover:bg-slate-800 transition whitespace-nowrap ${isActive('/dashboard/konten') ? 'bg-blue-600 border-l-4 border-blue-400 text-white' : 'text-slate-300'}`}>Konten & Publikasi</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/jadwal" className={`block px-6 py-3 hover:bg-slate-800 transition whitespace-nowrap ${isActive('/dashboard/jadwal') ? 'bg-blue-600 border-l-4 border-blue-400 text-white' : 'text-slate-300'}`}>Jadwal & Rayon</Link>
                        </li>
                        {/* Menu Administrasi & Utilitas telah dihapus sesuai permintaan */}
                    </ul>
                </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* TOP HEADER */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                    <div className="flex items-center">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                            className="text-slate-500 hover:text-slate-700 focus:outline-none p-2 rounded-md hover:bg-slate-100 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-5">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">{user?.name || 'Administrator'}</p>
                            <p className="text-xs text-slate-500 capitalize">{user?.role ? user.role.replace('_', ' ') : 'Admin'}</p>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <button 
                            onClick={handleLogout} 
                            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition"
                        >
                            Keluar
                        </button>
                    </div>
                </header>

                {/* PAGE CONTENT (Dinamic Area) */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
                    {/* Outlet adalah tempat di mana halaman spesifik akan di-render */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;