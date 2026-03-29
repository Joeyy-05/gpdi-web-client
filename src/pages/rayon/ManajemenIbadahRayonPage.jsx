import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RAYON_DATA } from '../../data/dummyUsers';

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
const ManajemenIbadahRayonPage = () => {
  const { user } = useAuth();
  const [notifDetail, setNotifDetail] = useState(null);

  // Ambil data rayon sesuai user yang login
  const rayon = RAYON_DATA.find((r) => r.id === user?.rayon_id) || RAYON_DATA[0];

  const jadwal = rayon.jadwal_aktif;

  // Tanggal hari ini otomatis
  const hariIni = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">

      {/* ══ JUDUL ══════════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <h1
          className="text-3xl font-bold text-slate-900"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Jadwal Ibadah Rayon
        </h1>
        <p className="text-slate-600 mt-1 text-sm">Informasi jadwal ibadah rayon terbaru</p>
        <p className="text-slate-600 text-sm">
          Tanggal: <span className="font-medium">{hariIni} (Otomatis)</span>
        </p>
      </div>

      {/* ══ KARTU: INFORMASI RAYON ═════════════════════════════════════════ */}
      <div className="bg-gray-100 border border-gray-200 rounded p-6 mb-5">
        <h2 className="font-bold text-slate-900 text-base mb-4">Informasi Rayon Anda</h2>

        <div className="space-y-1.5 mb-4">
          <p className="text-sm text-slate-800">
            <span className="font-bold">Nama Rayon:</span>{' '}
            <span>{rayon.nama}</span>
          </p>
          <p className="text-sm text-slate-800">
            <span className="font-bold">Ketua Rayon:</span>{' '}
            <span>{rayon.ketua}</span>
          </p>
          <p className="text-sm text-slate-800">
            <span className="font-bold">Wilayah:</span>{' '}
            <span>{rayon.wilayah}</span>
          </p>
        </div>

        <p className="text-slate-500 text-sm italic">
          "Informasi jadwal diperbarui secara real-time oleh Ketua Rayon."
        </p>
      </div>

      {/* ══ KARTU: JADWAL IBADAH AKTIF ════════════════════════════════════ */}
      <div className="bg-gray-100 border border-gray-200 rounded p-6 mb-5">
        <h2 className="font-bold text-slate-900 text-base mb-4">Jadwal Ibadah Aktif</h2>

        <div className="space-y-2 mb-5">
          <p className="text-sm text-slate-800">
            <span className="font-bold">Tanggal Ibadah:</span>{' '}
            <span>{jadwal.tanggal}</span>
          </p>
          <p className="text-sm text-slate-800">
            <span className="font-bold">Waktu:</span>{' '}
            <span>{jadwal.waktu}</span>
          </p>
          <p className="text-sm text-slate-800">
            <span className="font-bold">Lokasi:</span>{' '}
            <span>{jadwal.lokasi}</span>
          </p>
          <p className="text-sm text-slate-800">
            <span className="font-bold">Pelayan Firman:</span>{' '}
            <span>{jadwal.pelayan_firman}</span>
          </p>
          <p className="text-sm text-slate-800">
            <span className="font-bold">Penanggung Jawab:</span>{' '}
            <span>{jadwal.penanggung_jawab}</span>
          </p>
        </div>

        {/* Badge Status */}
        <p className="text-sm font-bold">
          Status:{' '}
          <span className={`${
            jadwal.status === 'Aktif'      ? 'text-green-600' :
            jadwal.status === 'Dibatalkan' ? 'text-red-600'   : 'text-slate-600'
          }`}>
            {jadwal.status}
          </span>
        </p>
      </div>

      {/* ══ RIWAYAT JADWAL SEBELUMNYA ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2
          className="text-xl font-bold text-slate-900 mb-4"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Riwayat Jadwal Sebelumnya
        </h2>

        <div className="border border-slate-300 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-slate-300 bg-white">
              <tr>
                {['Tanggal', 'Lokasi', 'Pelayan Firman', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-2.5 font-bold text-slate-800 text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rayon.riwayat.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-slate-700 whitespace-nowrap">{row.tanggal}</td>
                  <td className="px-4 py-2.5 text-slate-700">{row.lokasi}</td>
                  <td className="px-4 py-2.5 text-slate-700 whitespace-nowrap">{row.pelayan}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      row.status === 'Selesai'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ NOTIFIKASI PERUBAHAN JADWAL ════════════════════════════════════ */}
      <div className="bg-gray-100 border border-gray-200 rounded p-6">
        <h2 className="font-bold text-slate-900 text-base mb-5">
          Notifikasi Perubahan Jadwal Terbaru
        </h2>

        <div className="space-y-4">
          {rayon.notifikasi.map((notif, idx) => (
            <div key={idx} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-800">{notif.pesan}</p>
                <p className="text-xs text-slate-400 mt-0.5">{notif.waktu}</p>
              </div>
              <button
                onClick={() => setNotifDetail(notif)}
                className="flex-shrink-0 px-4 py-2 bg-[#0a1172] hover:bg-blue-900 text-white text-sm font-semibold rounded transition"
              >
                Lihat Detail
              </button>
            </div>
          ))}

          {/* Catatan sistem */}
          <div className="pt-3 border-t border-gray-200 mt-2">
            <p className="text-sm text-slate-600 italic">
              "Notifikasi dikirim otomatis ketika Ketua Rayon melakukan perubahan jadwal."
            </p>
          </div>
        </div>
      </div>

      {/* ══ MODAL DETAIL NOTIFIKASI ════════════════════════════════════════ */}
      {notifDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setNotifDetail(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0a1172] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Detail Notifikasi</h3>
              <button onClick={() => setNotifDetail(null)} className="text-white/70 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-slate-800 text-sm">{notifDetail.pesan}</p>
              <p className="text-xs text-slate-400">{notifDetail.waktu}</p>

              <div className="bg-slate-50 rounded p-4 border border-slate-200 mt-3">
                <p className="text-sm font-semibold text-slate-700 mb-2">Informasi Jadwal:</p>
                <p className="text-sm text-slate-600">Tanggal: {jadwal.tanggal}</p>
                <p className="text-sm text-slate-600">Waktu: {jadwal.waktu}</p>
                <p className="text-sm text-slate-600">Lokasi: {jadwal.lokasi}</p>
              </div>
            </div>
            <div className="px-6 pb-5 flex justify-end">
              <button onClick={() => setNotifDetail(null)}
                className="px-5 py-2 text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-100 rounded transition">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenIbadahRayonPage;