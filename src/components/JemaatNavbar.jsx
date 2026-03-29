import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JemaatNavbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isActive = (to) => location.pathname.startsWith(to);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Link berbeda berdasarkan role
  const navLinks = user?.role === 'ketua_rayon'
    ? [
        { to: '/rayon/renungan',          label: 'Renungan Harian'       },
        { to: '/rayon/manajemen-ibadah',  label: 'Manajemen Ibadah Rayon'},
        { to: '/rayon/request-surat',     label: 'Request Surat'         },
        { to: '/rayon/pengumuman',        label: 'Pengumuman'            },
      ]
    : [
        { to: '/jemaat/renungan',         label: 'Renungan Harian'  },
        { to: '/jemaat/jadwal',           label: 'Jadwal Rayon'     },
        { to: '/jemaat/request-surat',    label: 'Request Surat'    },
        { to: '/jemaat/pengumuman',       label: 'Pengumuman'       },
      ];

  // Dummy notifikasi
  const notifikasi = [
    { id: 1, pesan: 'Jadwal Ibadah Rayon telah diperbarui.',    waktu: '2 jam lalu', dibaca: false },
    { id: 2, pesan: 'Pengumuman baru dari Pendeta tersedia.',   waktu: '1 hari lalu', dibaca: true  },
    { id: 3, pesan: 'Ibadah Rayon minggu ini telah selesai.',   waktu: '7 hari lalu', dibaca: true  },
  ];
  const belumDibaca = notifikasi.filter((n) => !n.dibaca).length;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0e2e] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2 text-xs flex-shrink-0">G</div>
            <span className="font-semibold text-white text-sm tracking-tight whitespace-nowrap hidden sm:block">
              Gereja Pantekosta di Indonesia
            </span>
          </div>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                className={`text-sm whitespace-nowrap transition-colors ${
                  isActive(link.to) ? 'text-white font-bold' : 'text-gray-300 hover:text-white font-medium'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Kanan: Notif + User + Logout */}
          <div className="flex items-center gap-3">

            {/* Ikon Notifikasi */}
            <div className="relative">
              <button onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}
                className="relative p-1.5 text-gray-300 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {belumDibaca > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {belumDibaca}
                  </span>
                )}
              </button>

              {/* Dropdown Notifikasi */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-slate-800 text-sm">Notifikasi</p>
                  </div>
                  {notifikasi.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition ${!n.dibaca ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-slate-700">{n.pesan}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.waktu}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 text-center">
                    <button className="text-xs text-blue-600 hover:underline font-medium">Lihat semua</button>
                  </div>
                </div>
              )}
            </div>

            {/* Nama User */}
            <span className="text-gray-300 text-sm hidden md:block whitespace-nowrap">
              {user?.name?.split(' ').slice(0, 2).join(' ') || 'Nama User'}
            </span>

            {/* Avatar */}
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.avatar || user?.name?.charAt(0) || 'U'}
            </div>

            {/* Tombol Logout */}
            <button onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition whitespace-nowrap">
              LOGOUT
            </button>

            {/* Hamburger Mobile */}
            <button className="lg:hidden p-1.5 text-gray-300 hover:text-white"
              onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a0e2e] border-t border-slate-700 px-4 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className={`block py-2 px-3 text-sm font-medium rounded transition ${
                isActive(link.to) ? 'bg-blue-900 text-white font-bold' : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Overlay tutup dropdown */}
      {notifOpen && <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)}/>}
    </nav>
  );
};

export default JemaatNavbar;