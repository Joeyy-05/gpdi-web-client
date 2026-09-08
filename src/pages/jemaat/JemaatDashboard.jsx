import React, { useState, useEffect } from "react";
import { getAllSurat, getAllNotifikasi } from "../../services/adminService";
import { useAuth } from "../../context/useAuth";

const JemaatDashboard = () => {
  const { user } = useAuth();
  const [suratList, setSuratList] = useState([]);
  const [notifikasiList, setNotifikasiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJemaatData = async () => {
      setIsLoading(true);
      try {
        // Mengambil data surat dan notifikasi secara bersamaan
        const [resSurat, resNotif] = await Promise.all([
          getAllSurat(),
          getAllNotifikasi(),
        ]);

        // Hanya tampilkan surat yang statusnya is_active = true
        const activeSurats = (resSurat?.data || []).filter((s) => s.is_active);
        setSuratList(activeSurats);

        setNotifikasiList(resNotif?.data || []);
      } catch (error) {
        console.error("Gagal memuat data jemaat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJemaatData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 animate-fade-in-up">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Syalom, {user?.name || "Jemaat"}
          </h1>
          <p className="text-slate-500 mt-1">
            Selamat datang di Portal Pelayanan Jemaat GPdI.
          </p>
        </div>
        <div className="hidden sm:block h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-2xl">
          {user?.name ? user.name.charAt(0).toUpperCase() : "J"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI: REQUEST SURAT */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Layanan Administrasi Surat
          </h2>

          {isLoading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          ) : suratList.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-slate-100 text-center text-slate-500 shadow-sm">
              Belum ada layanan surat yang aktif saat ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suratList.map((surat) => (
                <div
                  key={surat.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition group"
                >
                  <h3 className="font-bold text-slate-800 mb-2">
                    {surat.nama_surat}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    Ajukan permohonan {surat.nama_surat} langsung melalui
                    WhatsApp Admin Gereja.
                  </p>
                  <a
                    href={surat.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Ajukan Sekarang
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KOLOM KANAN: NOTIFIKASI */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
            Pemberitahuan
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {isLoading ? (
              <div className="p-6 text-center text-sm text-slate-500 animate-pulse">
                Memeriksa notifikasi...
              </div>
            ) : notifikasiList.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                Belum ada pemberitahuan baru.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {notifikasiList.map((notif) => (
                  <li
                    key={notif.id}
                    className={`p-4 hover:bg-slate-50 transition ${!notif.is_read ? "bg-blue-50/50" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-slate-800">
                        {notif.judul}
                      </span>
                      {!notif.is_read && (
                        <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{notif.isi}</p>
                    <p className="text-[10px] text-slate-400 mt-2">
                      {new Date(notif.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JemaatDashboard;
