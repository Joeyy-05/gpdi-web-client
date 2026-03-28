import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Link aktif: /jadwal dan /jadwal/:slug keduanya highlight "Jadwal Ibadah"
  const isActive = (path) => location.pathname.startsWith(path);

  const navLinks = [
    { to: '/',          label: 'Beranda'       },
    { to: '/profil',    label: 'Profil Gereja' },
    { to: '/jadwal',    label: 'Jadwal Ibadah' },
    { to: '/pelayanan', label: 'Pelayanan'     },
    { to: '/galeri',    label: 'Galeri Kegiatan'},
    { to: '/pengumuman',label: 'Pengumuman'    },
    { to: '/kontak',    label: 'Kontak'        },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0e2e] shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ───────────────────────────────────────────────── */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2 text-xs">
              G
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">
              Gereja Pantekosta di Indonesia
            </span>
          </div>

          {/* ── Nav Links (desktop) ─────────────────────────────────── */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => {
              // Untuk Beranda: exact match; untuk yang lain: startsWith
              const active =
                link.to === '/'
                  ? location.pathname === '/'
                  : isActive(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition ${
                    active
                      ? 'text-white font-bold underline underline-offset-4'
                      : 'text-gray-300 hover:text-white font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Tombol Login ────────────────────────────────────────── */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition"
            >
              LOGIN
            </button>
          </div>

          {/* ── Hamburger (mobile) ──────────────────────────────────── */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition"
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

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0e2e] border-t border-slate-700 px-4 pb-4 space-y-1">
          {navLinks.map((link) => {
            const active =
              link.to === '/'
                ? location.pathname === '/'
                : isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 text-sm font-medium transition rounded ${
                  active
                    ? 'bg-blue-900 text-white font-bold'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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