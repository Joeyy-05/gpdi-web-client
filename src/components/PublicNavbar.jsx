import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
    const navigate  = useNavigate();
    const location  = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // Tandai link yang sedang aktif
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { to: '/',         label: 'Beranda'      },
        { to: '/profil',   label: 'Profil'       },
        { to: '/pelayanan',label: 'Pelayanan'    },
        { to: '/jadwal',   label: 'Jadwal'       },
        { to: '/galeri',   label: 'Galeri'       },
        { to: '/kontak',   label: 'Hubungi Kami' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-md font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* ── Logo ───────────────────────────────────────── */}
                    <div
                        className="flex-shrink-0 flex items-center cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                            G
                        </div>
                        <span className="font-bold text-xl text-slate-800 tracking-tight">
                            GPdI Sibulele
                        </span>
                    </div>

                    {/* ── Nav Links (desktop) ─────────────────────────── */}
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-medium transition text-sm ${
                                    isActive(link.to)
                                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* ── Tombol Masuk ────────────────────────────────── */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition text-sm"
                        >
                            Masuk
                        </button>
                    </div>

                    {/* ── Hamburger (mobile) ──────────────────────────── */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ─────────────────────────────────────────── */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className={`block py-2 px-3 rounded text-sm font-medium transition ${
                                isActive(link.to)
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => { navigate('/login'); setMenuOpen(false); }}
                        className="w-full mt-2 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded text-sm hover:bg-blue-50 transition"
                    >
                        Masuk
                    </button>
                </div>
            )}
        </nav>
    );
};

export default PublicNavbar;