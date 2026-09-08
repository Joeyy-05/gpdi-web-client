import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { getAllUsers } from "../../services/userService";
import { getAllWorship, getAllActivity } from "../../services/eventService";

const DashboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    jadwal: 0,
    kegiatan: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [usersRes, worshipRes, activityRes] = await Promise.all([
          getAllUsers().catch(() => []),
          getAllWorship().catch(() => ({ data: [] })),
          getAllActivity().catch(() => ({ data: [] })),
        ]);

        const usersList = usersRes?.data || usersRes || [];
        const worshipList = worshipRes?.data || worshipRes || [];
        const activityList = activityRes?.data || activityRes || [];

        setStats({
          users: usersList.length,
          jadwal: worshipList.length,
          kegiatan: activityList.length,
        });
      } catch (error) {
        console.error("Kesalahan saat memuat data dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Bagian Header Dashboard */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Dashboard Utama
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Selamat datang kembali,{" "}
          <span className="font-semibold text-blue-600">
            {user?.name || "Administrator"}
          </span>
          . Berikut adalah ringkasan sistem hari ini.
        </p>
      </div>

      {/* Deretan Kartu Ringkasan (Quick Stats) - Diubah menjadi 3 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu 1: Total Akun User */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mr-4 border border-blue-100">
            👥
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">
              Total Akun User
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {isLoading ? (
                <span className="animate-pulse text-slate-300">...</span>
              ) : (
                stats.users
              )}
            </p>
          </div>
        </div>

        {/* Kartu 2: Jadwal Aktif */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl mr-4 border border-amber-100">
            📅
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">
              Jadwal Ibadah Terdaftar
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {isLoading ? (
                <span className="animate-pulse text-slate-300">...</span>
              ) : (
                stats.jadwal
              )}
            </p>
          </div>
        </div>

        {/* Kartu 3: Total Kegiatan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-xl mr-4 border border-purple-100">
            📋
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Kegiatan</p>
            <p className="text-2xl font-bold text-slate-800">
              {isLoading ? (
                <span className="animate-pulse text-slate-300">...</span>
              ) : (
                stats.kegiatan
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Area Bawah (Call to Action) */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">
          Pusat Kendali Admin
        </h3>
        <p className="text-slate-500 max-w-md">
          Gunakan menu navigasi di sebelah kiri untuk mulai mengelola data
          jemaat, jadwal ibadah, serta konten publikasi gereja. Seluruh
          perubahan akan otomatis disinkronisasi ke aplikasi jemaat.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
