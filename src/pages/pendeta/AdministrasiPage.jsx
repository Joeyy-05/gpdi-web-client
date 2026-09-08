import React, { useState, useEffect, useCallback } from "react";
import {
  getAllSurat,
  createSurat,
  updateSurat,
  deleteSurat,
  getAllNotifikasi,
  createNotifikasi,
  updateNotifikasi,
  deleteNotifikasi,
} from "../../services/adminService";

const AdministrasiPage = () => {
  const [activeTab, setActiveTab] = useState("surat");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    nama_surat: "",
    whatsapp_url: "",
    is_active: true, // Surat
    judul: "",
    isi: "",
    id_pengguna: "",
    jenis_referensi: "", // Notifikasi
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res =
        activeTab === "surat" ? await getAllSurat() : await getAllNotifikasi();
      setData(res?.data || []);
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item.id);
      setFormData({
        nama_surat: item.nama_surat || "",
        whatsapp_url: item.whatsapp_url || "",
        is_active: item.is_active ?? true,
        judul: item.judul || "",
        isi: item.isi || "",
        id_pengguna: item.id_pengguna || "",
        jenis_referensi: item.jenis_referensi || "",
      });
    } else {
      setEditId(null);
      setFormData({
        nama_surat: "",
        whatsapp_url: "",
        is_active: true,
        judul: "",
        isi: "",
        id_pengguna: "",
        jenis_referensi: "",
      });
    }
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      if (activeTab === "surat") {
        // Konversi string "true"/"false" kembali menjadi boolean asli untuk Laravel
        const payload = {
          ...formData,
          is_active:
            formData.is_active === "true" || formData.is_active === true,
        };
        editId
          ? await updateSurat(editId, payload)
          : await createSurat(payload);
      } else {
        editId
          ? await updateNotifikasi(editId, formData)
          : await createNotifikasi(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setErrorMsg(typeof error === "string" ? error : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, label) => {
    if (window.confirm(`Hapus data "${label}" secara permanen?`)) {
      try {
        activeTab === "surat"
          ? await deleteSurat(id)
          : await deleteNotifikasi(id);
        fetchData();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="font-sans space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Administrasi & Utilitas
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola tautan layanan surat-menyurat dan siaran notifikasi jemaat.
        </p>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("surat")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === "surat" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Layanan Surat
          </button>
          <button
            onClick={() => setActiveTab("notifikasi")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === "notifikasi" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Notifikasi Sistem
          </button>
        </nav>
      </div>

      <div className="space-y-4 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            Daftar {activeTab}
          </h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm text-sm transition"
          >
            + Tambah Data
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                {activeTab === "surat" ? (
                  <>
                    <th className="px-6 py-4">Nama Surat</th>
                    <th className="px-6 py-4">Tautan WhatsApp</th>
                    <th className="px-6 py-4">Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4">Judul Notifikasi</th>
                    <th className="px-6 py-4">Target Pengguna</th>
                    <th className="px-6 py-4">Status Baca</th>
                  </>
                )}
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8">
                    Memuat data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    {activeTab === "surat" ? (
                      <>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {item.nama_surat}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs text-blue-600">
                          <a
                            href={item.whatsapp_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.whatsapp_url}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${item.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                          >
                            {item.is_active ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {item.judul}
                          <div className="text-xs text-slate-500 mt-1 truncate max-w-xs">
                            {item.isi}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {item.id_pengguna || "Semua Pengguna (Broadcast)"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${item.is_read ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                          >
                            {item.is_read ? "Dibaca" : "Belum"}
                          </span>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="text-amber-500 bg-amber-50 p-2 rounded"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(item.id, item.nama_surat || item.judul)
                          }
                          className="text-red-500 bg-red-50 p-2 rounded"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-800 capitalize">
                {editId ? `Edit ${activeTab}` : `Tambah ${activeTab}`}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                  {errorMsg}
                </div>
              )}

              {activeTab === "surat" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Nama Layanan Surat
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama_surat}
                      onChange={(e) =>
                        setFormData({ ...formData, nama_surat: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Contoh: Surat Baptisan Air"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Tautan WhatsApp (URL)
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.whatsapp_url}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsapp_url: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="https://wa.me/62812...&text=Halo..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Status Layanan
                    </label>
                    <select
                      value={formData.is_active}
                      onChange={(e) =>
                        setFormData({ ...formData, is_active: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                    >
                      <option value={true}>Aktif (Muncul di Aplikasi)</option>
                      <option value={false}>Nonaktif (Sembunyikan)</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Judul Notifikasi
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.judul}
                      onChange={(e) =>
                        setFormData({ ...formData, judul: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Isi Pesan
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.isi}
                      onChange={(e) =>
                        setFormData({ ...formData, isi: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Target Pengguna (UUID)
                    </label>
                    <input
                      type="text"
                      value={formData.id_pengguna}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          id_pengguna: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Kosongkan jika ingin broadcast ke semua jemaat"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrasiPage;
