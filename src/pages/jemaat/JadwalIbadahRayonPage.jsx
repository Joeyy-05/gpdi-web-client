import React, { useState } from "react";
import {
  rayonInfo,
  jadwalAktif,
  riwayatJadwal,
  notifikasiJadwal,
} from "../../data/jadwalRayonData";

const JadwalIbadahRayonPage = () => {
  const [selectedNotif, setSelectedNotif] = useState(null);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <style>{`
        .rayon-page-content {
          padding: 34px 28px 56px;
          font-family: "Montserrat", sans-serif;
          color: #111111;
          background: #FFFFFF;
        }

        .rayon-inner {
          width: 100%;
          max-width: 1240px;
        }

        .page-title {
          font-size: 40px;
          line-height: 1.15;
          font-weight: 800;
          margin: 0 0 22px 0;
          letter-spacing: 0.3px;
        }

        .page-subtext {
          font-size: 17px;
          line-height: 1.65;
          font-weight: 500;
          margin: 0;
        }

        .section-box {
          background: #EEEDED;
          padding: 28px 34px;
          margin-top: 28px;
        }

        .section-title {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          margin: 0 0 16px 0;
        }

        .info-text {
          font-size: 17px;
          line-height: 1.7;
          font-weight: 500;
          margin: 0;
        }

        .info-text strong {
          font-weight: 800;
        }

        .info-text + .info-text {
          margin-top: 2px;
        }

        .muted-note {
          margin-top: 20px;
          font-size: 17px;
          line-height: 1.7;
          font-style: italic;
          font-weight: 500;
          color: #6E6E6E;
        }

        .active-status {
          margin-top: 24px;
          font-size: 17px;
          line-height: 1.6;
          font-weight: 800;
          color: #29C244;
        }

        .history-wrap {
          margin-top: 22px;
        }

        .history-title {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          margin: 0 0 16px 0;
        }

        .table-box {
          width: 100%;
          overflow-x: auto;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          table-layout: fixed;
        }

        .history-table th,
        .history-table td {
          border: 1px solid #BFBFBF;
          text-align: left;
          vertical-align: middle;
          padding: 9px 10px;
          font-size: 15px;
          line-height: 1.35;
          font-weight: 500;
        }

        .history-table th {
          background: #EFEFEF;
          font-size: 15px;
          font-weight: 700;
        }

        .notif-box {
          background: #EEEDED;
          padding: 32px 34px 34px;
          margin-top: 40px;
        }

        .notif-title {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          margin: 0 0 26px 0;
        }

        .notif-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .notif-row + .notif-row {
          margin-top: 26px;
        }

        .notif-text {
          flex: 1;
          font-size: 17px;
          line-height: 1.75;
          font-weight: 500;
          margin: 0;
        }

        .detail-btn {
          min-width: 180px;
          height: 44px;
          padding: 0 20px;
          background: #0D1282;
          color: #FFFFFF;
          border: none;
          font-family: inherit;
          font-size: 16px;
          line-height: 1;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .page-title {
            font-size: 34px;
          }

          .section-box,
          .notif-box {
            padding: 22px 22px;
          }

          .notif-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .detail-btn {
            min-width: 160px;
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-box {
          background: #FFFFFF;
          padding: 30px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .modal-title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 15px;
          color: #0D1282;
        }
        .modal-body {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 25px;
        }
        .close-modal-btn {
          background: #D71313;
          color: white;
          border: none;
          padding: 10px 20px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .rayon-page-content {
            padding: 24px 16px 40px;
          }

          .page-title {
            font-size: 30px;
          }

          .page-subtext,
          .info-text,
          .muted-note,
          .active-status,
          .notif-text {
            font-size: 15px;
          }

          .section-title,
          .history-title,
          .notif-title {
            font-size: 20px;
          }

          .history-table th,
          .history-table td {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="rayon-page-content">
        <div className="rayon-inner">
          <h1 className="page-title">Jadwal Ibadah Rayon</h1>

          <p className="page-subtext">Informasi jadwal ibadah rayon terbaru</p>
          <p className="page-subtext">Tanggal: {today}</p>

          <section className="section-box">
            <h2 className="section-title">Informasi Rayon Anda</h2>

            <p className="info-text">
              <strong>Nama Rayon:</strong> {rayonInfo.namaRayon}
            </p>
            <p className="info-text">
              <strong>Ketua Rayon:</strong> {rayonInfo.ketuaRayon}
            </p>
            <p className="info-text">
              <strong>Wilayah:</strong> {rayonInfo.wilayah}
            </p>

            <p className="muted-note">
              “Informasi jadwal diperbarui secara real-time oleh Ketua Rayon.”
            </p>
          </section>

          <section className="section-box">
            <h2 className="section-title">Jadwal Ibadah Aktif</h2>

            <p className="info-text">
              <strong>Tanggal Ibadah:</strong> {jadwalAktif.tanggalIbadah}
            </p>
            <p className="info-text">
              <strong>Waktu:</strong> {jadwalAktif.waktu}
            </p>
            <p className="info-text">
              <strong>Lokasi:</strong> {jadwalAktif.lokasi}
            </p>
            <p className="info-text">
              <strong>Pelayan Firman:</strong> {jadwalAktif.pelayanFirman}
            </p>
            <p className="info-text">
              <strong>Penanggung Jawab:</strong> {jadwalAktif.penanggungJawab}
            </p>

            <p className="active-status">Status: {jadwalAktif.status}</p>
          </section>

          <section className="history-wrap">
            <h2 className="history-title">Riwayat Jadwal Sebelumnya</h2>

            <div className="table-box">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Lokasi</th>
                    <th>Pelayan Firman</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {riwayatJadwal.map((item) => (
                    <tr key={item.id}>
                      <td>{item.tanggal}</td>
                      <td>{item.lokasi}</td>
                      <td>{item.pelayanFirman}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="notif-box">
            <h2 className="notif-title">Notifikasi Perubahan Jadwal Terbaru</h2>

            {notifikasiJadwal.map((notif) => (
              <div className="notif-row" key={notif.id}>
                <p className="notif-text">“{notif.pesan}”</p>
                {notif.deskripsi && (
                  <button
                    className="detail-btn"
                    onClick={() => setSelectedNotif(notif)}
                  >
                    Lihat Detail
                  </button>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Modal Detail Notifikasi */}
      {selectedNotif && (
        <div className="modal-overlay" onClick={() => setSelectedNotif(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Detail Perubahan Jadwal</h3>
            <div className="modal-body">
              <p>{selectedNotif.deskripsi}</p>
            </div>
            <button
              className="close-modal-btn"
              onClick={() => setSelectedNotif(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JadwalIbadahRayonPage;