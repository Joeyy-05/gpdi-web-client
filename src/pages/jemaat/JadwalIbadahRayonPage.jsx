import React, { useState, useEffect } from "react";
// Impor API Event (yang sudah ada)
import { getJadwalRayonJemaat } from "../../services/eventService";
// PERBAIKAN: Impor API User untuk mengambil data jemaat & ketua
import { getAllUsers } from "../../services/userService";

const JadwalIbadahRayonPage = () => {
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [rayonInfo, setRayonInfo] = useState(null);
  const [jadwalAktif, setJadwalAktif] = useState(null);
  const [riwayatJadwal, setRiwayatJadwal] = useState([]);
  const [notifikasiJadwal, setNotifikasiJadwal] = useState([]);
  
  // State baru khusus untuk menampung nama Ketua Rayon
  const [namaKetua, setNamaKetua] = useState("Mencari data ketua...");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMsg("");
      
      try {
        // 1. Ambil data Jadwal dan Rayon dari Event Service
        const response = await getJadwalRayonJemaat();
        const data = response.data || response;

        setRayonInfo(data.rayon || null);
        setJadwalAktif(data.jadwalAktif || null);
        setRiwayatJadwal(data.riwayat || []);
        setNotifikasiJadwal(data.notifikasi || []);

        // 2. SOLUSI 1: Jika user punya rayon, cari nama ketuanya dari User Service
        if (data.rayon && data.rayon.id) {
            try {
                const usersResponse = await getAllUsers();
                const usersList = usersResponse.data || usersResponse;
                
                // Cari user yang rolenya 'ketua_rayon' DAN id_rayon-nya cocok
                const ketua = usersList.find(u => 
                    u.role === 'ketua_rayon' && u.id_rayon === data.rayon.id
                );

                if (ketua) {
                    setNamaKetua(ketua.name);
                } else {
                    setNamaKetua("Belum ada Ketua Rayon");
                }
            } catch (userErr) {
                console.error("Gagal menarik data user:", userErr);
                setNamaKetua("Gagal memuat nama");
            }
        }

      } catch (error) {
        console.error("Gagal memuat jadwal rayon:", error);
        setErrorMsg(typeof error === 'string' ? error : "Terjadi kesalahan saat memuat data jadwal rayon.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-lg font-bold text-[#0D1282] animate-pulse">Memuat Jadwal Rayon...</p>
      </div>
    );
  }

  if (!rayonInfo && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md">
            <svg className="w-16 h-16 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Belum Terdaftar di Rayon</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Akun Anda saat ini belum dihubungkan ke Rayon mana pun. Silakan hubungi Admin atau Pendeta untuk mengatur penempatan Rayon Anda.
            </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .rayon-page-content { padding: 34px 28px 56px; font-family: "Montserrat", sans-serif; color: #111111; background: #FFFFFF; }
        .rayon-inner { width: 100%; max-width: 1240px; margin: 0 auto; }
        .page-title { font-size: 40px; line-height: 1.15; font-weight: 800; margin: 0 0 22px 0; letter-spacing: 0.3px; color: #0D1282; }
        .page-subtext { font-size: 17px; line-height: 1.65; font-weight: 500; margin: 0; }
        .section-box { background: #EEEDED; padding: 28px 34px; margin-top: 28px; border-radius: 12px; }
        .section-title { font-size: 22px; line-height: 1.3; font-weight: 800; margin: 0 0 16px 0; color: #0D1282; }
        .info-text { font-size: 17px; line-height: 1.7; font-weight: 500; margin: 0; }
        .info-text strong { font-weight: 800; }
        .info-text + .info-text { margin-top: 2px; }
        .muted-note { margin-top: 20px; font-size: 17px; line-height: 1.7; font-style: italic; font-weight: 500; color: #6E6E6E; }
        .active-status { margin-top: 24px; font-size: 17px; line-height: 1.6; font-weight: 800; color: #29C244; background: #e6f8e8; display: inline-block; padding: 4px 12px; border-radius: 6px; }
        .history-wrap { margin-top: 40px; }
        .history-title { font-size: 22px; line-height: 1.3; font-weight: 800; margin: 0 0 16px 0; color: #0D1282; }
        @media (max-width: 900px) { .page-title { font-size: 34px; } .section-box { padding: 22px 22px; } }
        @media (max-width: 640px) { .rayon-page-content { padding: 24px 16px 40px; } .page-title { font-size: 28px; } .page-subtext, .info-text, .muted-note, .active-status { font-size: 15px; } .section-title, .history-title { font-size: 20px; } }
      `}</style>

      <div className="rayon-page-content min-h-screen">
        <div className="rayon-inner">
          <h1 className="page-title">Jadwal Ibadah Rayon</h1>
          <p className="page-subtext">Informasi jadwal ibadah rayon terbaru</p>
          <p className="page-subtext font-bold text-[#D71313]">Tanggal: {today}</p>

          {errorMsg && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
              {errorMsg}
            </div>
          )}

          <section className="section-box">
            <h2 className="section-title">Informasi Rayon Anda</h2>
            <p className="info-text">
              <strong>Nama Rayon:</strong> {rayonInfo?.nama_rayon || rayonInfo?.namaRayon || "-"}
            </p>
            <p className="info-text">
              <strong>Ketua Rayon:</strong> {namaKetua}
            </p>
            <p className="info-text">
              <strong>Keterangan:</strong> {rayonInfo?.keterangan || "-"}
            </p>
            <p className="muted-note">
              “Informasi jadwal diperbarui secara real-time oleh Ketua Rayon.”
            </p>
          </section>

          {jadwalAktif && Object.keys(jadwalAktif).length > 0 ? (
            <section className="section-box">
              <h2 className="section-title">Jadwal Ibadah Aktif</h2>
              <p className="info-text"><strong>Tanggal Ibadah:</strong> {jadwalAktif.tanggal_ibadah || jadwalAktif.tanggalIbadah || "-"}</p>
              <p className="info-text"><strong>Waktu:</strong> {jadwalAktif.waktu || "-"}</p>
              <p className="info-text"><strong>Lokasi:</strong> {jadwalAktif.lokasi || "-"}</p>
              <p className="info-text"><strong>Pelayan Firman:</strong> {jadwalAktif.pelayan_firman || jadwalAktif.pelayanFirman || "-"}</p>
              <p className="info-text"><strong>Penanggung Jawab:</strong> {jadwalAktif.penanggung_jawab || jadwalAktif.penanggungJawab || "-"}</p>
              <p className="active-status">Status: {jadwalAktif.status || "Aktif"}</p>
            </section>
          ) : (
            <section className="section-box text-center py-10">
              <p className="text-gray-500 font-medium text-lg">Belum ada jadwal ibadah aktif untuk rayon Anda saat ini.</p>
            </section>
          )}

          <section className="history-wrap">
            <h2 className="history-title">Riwayat Jadwal Sebelumnya</h2>
            {riwayatJadwal && riwayatJadwal.length > 0 ? (
              
              /* PERBAIKAN: Tabel dirombak agar mirip dengan halaman ManajemenIbadahPage (tanpa kolom Aksi) */
              <div className="overflow-x-auto rounded-lg border border-[#CFCFCF] bg-white mt-6">
                <table className="w-full border-collapse text-left text-[15px] text-[#0D1282]">
                  <thead>
                    <tr className="bg-[#EFEFEF]">
                      <th className="border-b border-[#CFCFCF] px-5 py-4 font-bold">Judul Acara / Pelayan Firman</th>
                      <th className="border-b border-[#CFCFCF] px-5 py-4 font-bold">Waktu & Tempat</th>
                      <th className="border-b border-[#CFCFCF] px-5 py-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatJadwal.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="border-b border-[#CFCFCF] px-5 py-4 align-top">
                          <div className="font-bold text-lg">{item.pelayan_firman || item.pelayanFirman || "Ibadah Rayon"}</div>
                        </td>
                        <td className="border-b border-[#CFCFCF] px-5 py-4 align-top">
                          <div className="font-semibold">{item.tanggal_ibadah || item.tanggal}</div>
                          <div className="text-sm text-gray-600 mt-1 font-medium">
                            📍 {item.lokasi}
                          </div>
                        </td>
                        <td className="border-b border-[#CFCFCF] px-5 py-4 align-middle">
                          <span className={`px-3 py-1.5 rounded-md text-[13px] font-bold ${item.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {item.status || 'Selesai'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            ) : (
              <div className="border border-[#CFCFCF] rounded-lg p-8 text-center bg-white text-gray-500 mt-4 font-medium">
                Belum ada riwayat ibadah rayon.
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default JadwalIbadahRayonPage;