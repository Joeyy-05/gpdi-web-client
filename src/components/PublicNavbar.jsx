import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Aktif jika path dimulai dengan prefix link
  // Khusus Beranda: exact match
  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const navLinks = [
    { to: '/',          label: 'Beranda'        },
    { to: '/profil',    label: 'Profil Gereja'  },
    { to: '/jadwal',    label: 'Jadwal Ibadah'  },
    { to: '/pelayanan', label: 'Pelayanan'      },
    { to: '/galeri',    label: 'Galeri Kegiatan'},
    { to: '/pengumuman',label: 'Pengumuman'     },
    { to: '/kontak',    label: 'Kontak'         },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0e2e] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => navigate('/')}
          >
            {/* Ganti dengan <img> logo nantinya */}
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2 text-xs flex-shrink-0">
              G
            </div>
            <span className="font-semibold text-white text-sm tracking-tight whitespace-nowrap">
              Gereja Pantekosta di Indonesia
            </span>
          </div>

          {/* ── Nav Links (desktop) ──────────────────────────────────── */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm whitespace-nowrap transition-colors ${
                  isActive(link.to)
                    ? 'text-white font-bold'
                    : 'text-gray-300 hover:text-white font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Tombol Login ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition whitespace-nowrap"
            >
              LOGIN
            </button>
          </div>

          {/* ── Hamburger (mobile) ───────────────────────────────────── */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white transition"
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

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a0e2e] border-t border-slate-700 px-4 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 px-3 text-sm font-medium transition rounded ${
                isActive(link.to)
                  ? 'bg-blue-900 text-white font-bold'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { navigate('/login'); setMenuOpen(false); }}
            className="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-sm transition"
          >
            LOGIN
          </button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;