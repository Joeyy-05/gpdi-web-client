import React, { useState, useEffect, useCallback } from "react";
import {
  getAllSurat,
  createSurat,
  updateSurat,
  deleteSurat,
} from "../../services/adminService";

const AdministrasiPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    nama_surat: "",
    whatsapp_url: "",
    is_active: true,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await getAllSurat();
      setData(res?.data || []);
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      });
    } else {
      setEditId(null);
      setFormData({
        nama_surat: "",
        whatsapp_url: "",
        is_active: true,
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
      // Konversi string "true"/"false" kembali menjadi boolean asli untuk Laravel
      const payload = {
        ...formData,
        is_active: formData.is_active === "true" || formData.is_active === true,
      };
      editId ? await updateSurat(editId, payload) : await createSurat(payload);
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
        await deleteSurat(id);
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
          Administrasi &amp; Utilitas
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola tautan layanan surat-menyurat gereja.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Daftar Layanan Surat
          </h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm text-sm transition"
          >
            + Tambah Layanan
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nama Surat</th>
                <th className="px-6 py-4">Tautan WhatsApp</th>
                <th className="px-6 py-4">Status</th>
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
              ) : errorMsg ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-red-500">
                    {String(errorMsg)}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">
                    Belum ada layanan surat yang ditambahkan.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
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
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="text-amber-500 bg-amber-50 hover:bg-amber-100 p-2 rounded transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.nama_surat)}
                          className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">
                {editId ? "Edit Layanan Surat" : "Tambah Layanan Surat"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                  {errorMsg}
                </div>
              )}

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
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
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
                    setFormData({ ...formData, whatsapp_url: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
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
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value={true}>Aktif (Muncul di Aplikasi)</option>
                  <option value={false}>Nonaktif (Sembunyikan)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition ${isSubmitting ? "opacity-70" : ""}`}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Data"}
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
