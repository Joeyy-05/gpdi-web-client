import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Impor logo jika ada di folder assets
// import logoGPdI from '../assets/logo_gpdi.png';

const PublicNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-md font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        {/* Ganti div ini dengan <img src={logoGPdI} alt="Logo GPdI" className="h-12 w-auto mr-3"/> nantinya */}
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">G</div>
                        <span className="font-bold text-xl text-slate-800 tracking-tight">GPdI Sibulele</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold transition">Beranda</Link>
                        <Link to="/profil" className="text-gray-600 hover:text-blue-600 font-medium transition">Profil</Link>
                        <Link to="/pelayanan" className="text-gray-600 hover:text-blue-600 font-medium transition">Pelayanan</Link>
                        <Link to="/jadwal" className="text-gray-600 hover:text-blue-600 font-medium transition">Jadwal</Link>
                        <Link to="/galeri" className="text-gray-600 hover:text-blue-600 font-medium transition">Galeri</Link>
                        <Link to="/kontak" className="text-gray-600 hover:text-blue-600 font-medium transition">Hubungi Kami</Link>
                    </div>

                    {/* Login Button */}
                    <div className="hidden md:flex items-center">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                        >
                            Masuk
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;