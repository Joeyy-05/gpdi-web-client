import React, { useState } from "react";

const RequestSuratPage = () => {
  const [form, setForm] = useState({
    nama: "",
    noHp: "",
    jenisSurat: "",
    keperluan: "",
    tanggalPengambilan: "",
    catatan: "",
  });

  // Pastikan nomor ini diawali dengan kode negara tanpa tanda '+' (misal: 62 untuk Indonesia)
  const nomorAdmin = "6281263299741"; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nama ||
      !form.noHp ||
      !form.jenisSurat ||
      !form.keperluan ||
      !form.tanggalPengambilan
    ) {
      alert("Mohon lengkapi semua field wajib terlebih dahulu.");
      return;
    }

    // Pendekatan string literal murni dengan jeda baris (\n) yang aman
    const rawPesan = `Halo Admin, saya ingin request surat.

Nama: ${form.nama}
No HP: ${form.noHp}
Jenis Surat: ${form.jenisSurat}
Keperluan: ${form.keperluan}
Tanggal Pengambilan: ${form.tanggalPengambilan}
Catatan Tambahan: ${form.catatan || "-"}`;

    // encodeURIComponent akan otomatis mengubah \n menjadi %0A dan mengamankan karakter khusus
    const waUrl = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(rawPesan)}`;
    
    // Membuka WhatsApp di tab baru
    window.open(waUrl, "_blank");
  };

  return (
    <>
      <style>{`
        .request-page-content {
          padding: 34px 28px 56px;
          font-family: "Montserrat", sans-serif;
          color: #111111;
          background: #FFFFFF;
        }

        .request-inner {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 40px;
          line-height: 1.15;
          font-weight: 800;
          margin: 0 0 22px 0;
          letter-spacing: 0.3px;
          color: #0D1282;
        }

        .page-subtext {
          font-size: 17px;
          line-height: 1.65;
          font-weight: 500;
          margin: 0;
        }

        .form-box {
          background: #EEEDED;
          padding: 30px 34px;
          margin-top: 30px;
          border-radius: 12px;
        }

        .form-title {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          margin: 0 0 22px 0;
          color: #0D1282;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0D1282;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          border: 1px solid #C9C9C9;
          background: #FFFFFF;
          font-family: inherit;
          font-size: 15px;
          padding: 13px 14px;
          outline: none;
          border-radius: 6px;
          transition: border-color 0.2s;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #0D1282;
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .helper-text {
          margin-top: 20px;
          font-size: 15px;
          line-height: 1.7;
          color: #6E6E6E;
          font-style: italic;
        }

        .button-wrap {
          margin-top: 28px;
          display: flex;
          justify-content: flex-end;
        }

        .submit-btn {
          min-width: 220px;
          height: 46px;
          border: none;
          background: #D71313;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #b51010;
        }

        @media (max-width: 900px) {
          .page-title {
            font-size: 34px;
          }

          .form-box {
            padding: 22px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .button-wrap {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .request-page-content {
            padding: 24px 16px 40px;
          }

          .page-title {
            font-size: 30px;
          }

          .page-subtext,
          .helper-text,
          .form-input,
          .form-select,
          .form-textarea {
            font-size: 15px;
          }

          .form-title {
            font-size: 20px;
          }

          .submit-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="request-page-content min-h-screen">
        <div className="request-inner">
          <h1 className="page-title">Request Surat</h1>
          <p className="page-subtext">Silakan isi formulir di bawah untuk mengajukan permohonan surat.</p>
          <p className="page-subtext font-medium text-gray-600">Setelah dikirim, Anda akan diarahkan otomatis ke WhatsApp Admin Gereja.</p>

          <form className="form-box shadow-sm" onSubmit={handleSubmit}>
            <h2 className="form-title">Form Permohonan Surat</h2>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  className="form-input"
                  placeholder="Masukkan nama lengkap"
                  value={form.nama}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">No. HP / WhatsApp</label>
                <input
                  type="tel"
                  name="noHp"
                  className="form-input"
                  placeholder="Contoh: 08123456789"
                  value={form.noHp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Jenis Surat</label>
                <select
                  name="jenisSurat"
                  className="form-select"
                  value={form.jenisSurat}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Pilih jenis surat</option>
                  <option value="Surat Baptis">Surat Baptis</option>
                  <option value="Surat Nikah">Surat Peneguhan Nikah</option>
                  <option value="Surat Keterangan Jemaat">Surat Keterangan Jemaat</option>
                  <option value="Surat Pengantar">Surat Pengantar Pindah</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Rencana Tanggal Pengambilan</label>
                <input
                  type="date"
                  name="tanggalPengambilan"
                  className="form-input"
                  value={form.tanggalPengambilan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Keperluan Penggunaan Surat</label>
                <input
                  type="text"
                  name="keperluan"
                  className="form-input"
                  placeholder="Contoh: Keperluan pendaftaran sekolah / administrasi sipil"
                  value={form.keperluan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Catatan Tambahan (Opsional)</label>
                <textarea
                  name="catatan"
                  className="form-textarea"
                  placeholder="Tuliskan detail tambahan jika ada (misal: mohon dititipkan di pos satpam)"
                  value={form.catatan}
                  onChange={handleChange}
                />
              </div>
            </div>

            <p className="helper-text">
              * Pastikan data yang diisi sudah benar. WhatsApp akan terbuka otomatis dengan format pesan yang sudah tersusun.
            </p>

            <div className="button-wrap">
              <button type="submit" className="submit-btn flex justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                Kirim via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestSuratPage;