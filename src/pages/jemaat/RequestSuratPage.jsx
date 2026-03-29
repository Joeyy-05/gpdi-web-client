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

  const nomorAdmin = "6281234567890"; // ganti dengan nomor WA admin gereja

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

    const pesan = `Halo Admin, saya ingin request surat.%0A%0A` +
      `Nama: ${encodeURIComponent(form.nama)}%0A` +
      `No HP: ${encodeURIComponent(form.noHp)}%0A` +
      `Jenis Surat: ${encodeURIComponent(form.jenisSurat)}%0A` +
      `Keperluan: ${encodeURIComponent(form.keperluan)}%0A` +
      `Tanggal Pengambilan: ${encodeURIComponent(form.tanggalPengambilan)}%0A` +
      `Catatan Tambahan: ${encodeURIComponent(form.catatan || "-")}`;

    const waUrl = `https://wa.me/${nomorAdmin}?text=${pesan}`;
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

        .form-box {
          background: #EEEDED;
          padding: 30px 34px;
          margin-top: 30px;
        }

        .form-title {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          margin: 0 0 22px 0;
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
        }

        .submit-btn:hover {
          opacity: 0.95;
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

      <div className="request-page-content">
        <div className="request-inner">
          <h1 className="page-title">Request Surat</h1>
          <p className="page-subtext">Silakan isi formulir di bawah untuk mengajukan permohonan surat.</p>
          <p className="page-subtext">Setelah dikirim, Anda akan diarahkan ke WhatsApp admin.</p>

          <form className="form-box" onSubmit={handleSubmit}>
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
                />
              </div>

              <div className="form-group">
                <label className="form-label">No. HP</label>
                <input
                  type="text"
                  name="noHp"
                  className="form-input"
                  placeholder="Masukkan nomor HP"
                  value={form.noHp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Jenis Surat</label>
                <select
                  name="jenisSurat"
                  className="form-select"
                  value={form.jenisSurat}
                  onChange={handleChange}
                >
                  <option value="">Pilih jenis surat</option>
                  <option value="Surat Baptis">Surat Baptis</option>
                  <option value="Surat Nikah">Surat Nikah</option>
                  <option value="Surat Keterangan Jemaat">Surat Keterangan Jemaat</option>
                  <option value="Surat Pengantar">Surat Pengantar</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tanggal Pengambilan</label>
                <input
                  type="date"
                  name="tanggalPengambilan"
                  className="form-input"
                  value={form.tanggalPengambilan}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Keperluan</label>
                <input
                  type="text"
                  name="keperluan"
                  className="form-input"
                  placeholder="Contoh: keperluan administrasi / pernikahan / sekolah"
                  value={form.keperluan}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Catatan Tambahan</label>
                <textarea
                  name="catatan"
                  className="form-textarea"
                  placeholder="Tulis catatan tambahan jika ada"
                  value={form.catatan}
                  onChange={handleChange}
                />
              </div>
            </div>

            <p className="helper-text">
              Pastikan data yang diisi sudah benar. Setelah klik tombol kirim, WhatsApp akan terbuka otomatis.
            </p>

            <div className="button-wrap">
              <button type="submit" className="submit-btn">
                Kirim ke WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestSuratPage;