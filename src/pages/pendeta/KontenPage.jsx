import React, { useState, useEffect, useCallback } from "react";
import {
  getAllPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman,
  getAllRenungan,
  createRenungan,
  updateRenungan,
  deleteRenungan,
  getAllGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
} from "../../services/contentService";
import { contentStorageUrl } from "../../config/mediaUrls";

const KontenPage = () => {
  const [activeTab, setActiveTab] = useState("pengumuman");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null); // PERBAIKAN: State untuk menampung string Base64 gambar

  // Unified Form Data
  const [formData, setFormData] = useState({
    judul: "",
    scope: "publik",
    id_rayon: "", // Pengumuman
    tema: "",
    ayat_pokok: "", // Renungan
    deskripsi: "",
    tanggal_kegiatan: "",
    kategori: "Umum", // Galeri
    isi: "",
    status: "Aktif", // Global
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      let response;
      if (activeTab === "pengumuman") response = await getAllPengumuman();
      else if (activeTab === "renungan") response = await getAllRenungan();
      else if (activeTab === "galeri") response = await getAllGaleri();
      setData(response?.data || []);
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
    setFotoBase64(null); // Reset Base64

    if (item) {
      setEditId(item.id);
      setFormData({
        judul: item.judul || "",
        scope: item.scope || "publik",
        id_rayon: item.id_rayon || "",
        tema: item.tema || "",
        ayat_pokok: item.ayat_pokok || "",
        deskripsi: item.deskripsi || "",
        tanggal_kegiatan: item.tanggal_kegiatan
          ? item.tanggal_kegiatan.split("T")[0]
          : "",
        kategori: item.kategori || "Umum",
        isi: item.isi || "",
        status: item.status || "Aktif",
      });
    } else {
      setEditId(null);
      setFormData({
        judul: "",
        scope: "publik",
        id_rayon: "",
        tema: "",
        ayat_pokok: "",
        deskripsi: "",
        tanggal_kegiatan: "",
        kategori: "Umum",
        isi: "",
        status: "Aktif",
      });
    }
    setErrorMsg("");
    setIsModalOpen(true);
  };

  // PERBAIKAN: Mengonversi file gambar yang dipilih menjadi string Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoBase64(reader.result); // Simpan hasil konversi
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (activeTab === "pengumuman") {
        if (formData.scope === "rayon" && !formData.id_rayon)
          throw new Error("Pilih rayon target!");
        editId
          ? await updatePengumuman(editId, formData)
          : await createPengumuman(formData);
      } else if (activeTab === "renungan") {
        editId
          ? await updateRenungan(editId, formData)
          : await createRenungan(formData);
      } else if (activeTab === "galeri") {
        // PERBAIKAN: Mengirim data sebagai objek JSON murni, bukan FormData
        const payload = {
          judul: formData.judul,
          deskripsi: formData.deskripsi,
          tanggal_kegiatan: formData.tanggal_kegiatan,
          kategori: formData.kategori,
        };

        // Jika ada foto baru yang diunggah, masukkan string Base64-nya ke payload
        if (fotoBase64) {
          payload.foto = fotoBase64;
        }

        if (!editId && !payload.foto)
          throw new Error("Wajib mengunggah foto untuk galeri baru!");

        editId
          ? await updateGaleri(editId, payload)
          : await createGaleri(payload);
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
        if (activeTab === "pengumuman") await deletePengumuman(id);
        else if (activeTab === "renungan") await deleteRenungan(id);
        else if (activeTab === "galeri") await deleteGaleri(id);
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
          Konten & Publikasi
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola informasi, spiritualitas, dan dokumentasi jemaat.
        </p>
      </div>

      {/* TAB NAVIGATION */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {["pengumuman", "renungan", "galeri"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </nav>
      </div>

      {isLoading && (
        <div className="text-slate-500 text-sm animate-pulse">
          Memuat data...
        </div>
      )}

      {/* CONTENT AREA */}
      {!isLoading && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              Daftar {activeTab}
            </h2>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm text-sm transition"
            >
              + Tambah {activeTab}
            </button>
          </div>

          {/* RENDER TABLE UNTUK PENGUMUMAN & RENUNGAN */}
          {activeTab !== "galeri" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      {activeTab === "pengumuman" ? "Judul" : "Tema & Ayat"}
                    </th>
                    {activeTab === "pengumuman" && (
                      <th className="px-6 py-4 font-semibold">Audiens</th>
                    )}
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-center w-24">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        Belum ada data.
                      </td>
                    </tr>
                  ) : (
                    data.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">
                            {activeTab === "pengumuman"
                              ? item.judul
                              : item.tema}
                          </div>
                          {activeTab === "renungan" && (
                            <div className="text-xs text-slate-500 mt-1">
                              {item.ayat_pokok}
                            </div>
                          )}
                        </td>
                        {activeTab === "pengumuman" && (
                          <td className="px-6 py-4 text-xs font-medium uppercase">
                            {item.scope}
                          </td>
                        )}
                        <td className="px-6 py-4 text-xs">{item.status}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleOpenModal(item)}
                              className="text-amber-500 bg-amber-50 hover:bg-amber-100 p-2 rounded"
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
                                handleDelete(item.id, item.judul || item.tema)
                              }
                              className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded"
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
          )}

          {/* RENDER GRID UNTUK GALERI */}
          {activeTab === "galeri" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.length === 0 ? (
                <div className="col-span-full py-8 text-center text-slate-500 bg-white rounded-xl border">
                  Belum ada foto galeri.
                </div>
              ) : (
                data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group relative"
                  >
                    <div className="h-40 bg-slate-100 relative overflow-hidden">
                      <img
                        src={`${contentStorageUrl}/${item.path_foto}`}
                        alt={item.judul}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider backdrop-blur-sm">
                        {item.kategori || "Umum"}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-800 text-sm truncate">
                        {item.judul}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(item.tanggal_kegiatan).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                      <div className="mt-3 flex justify-between border-t border-slate-50 pt-3">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.judul)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* MODAL MULTI-FUNGSI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-800 capitalize">
                {editId ? `Edit ${activeTab}` : `Buat ${activeTab}`}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-red-500 transition"
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
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-medium">
                  {errorMsg}
                </div>
              )}

              {/* FIELD KHUSUS GALERI */}
              {activeTab === "galeri" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Kategori Kegiatan
                    </label>
                    <select
                      required
                      value={formData.kategori}
                      onChange={(e) =>
                        setFormData({ ...formData, kategori: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="Umum">Umum / Lainnya</option>
                      <option value="Ibadah">Ibadah Raya</option>
                      <option value="Pemuda">Pemuda & Remaja</option>
                      <option value="Sekolah Minggu">Sekolah Minggu</option>
                      <option value="Wanita">Wanita / Kaum Ibu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Judul Foto/Kegiatan
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.judul}
                      onChange={(e) =>
                        setFormData({ ...formData, judul: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Tanggal Kegiatan
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.tanggal_kegiatan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggal_kegiatan: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Pilih File Foto{" "}
                      {editId && (
                        <span className="text-gray-400 font-normal">
                          (Kosongkan jika tidak diganti)
                        </span>
                      )}
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleFileChange}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Deskripsi Singkat (Opsional)
                    </label>
                    <textarea
                      rows="3"
                      value={formData.deskripsi}
                      onChange={(e) =>
                        setFormData({ ...formData, deskripsi: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    ></textarea>
                  </div>
                </>
              ) : (
                /* FIELD PENGUMUMAN & RENUNGAN */
                <>
                  {activeTab === "pengumuman" ? (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Judul Pengumuman
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.judul}
                        onChange={(e) =>
                          setFormData({ ...formData, judul: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Tema Renungan
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.tema}
                          onChange={(e) =>
                            setFormData({ ...formData, tema: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Ayat Pokok
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.ayat_pokok}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ayat_pokok: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Isi Konten
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.isi}
                      onChange={(e) =>
                        setFormData({ ...formData, isi: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Status Visibilitas
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                      </select>
                    </div>
                    {activeTab === "pengumuman" && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Target Audiens
                        </label>
                        <select
                          value={formData.scope}
                          onChange={(e) =>
                            setFormData({ ...formData, scope: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                        >
                          <option value="publik">Publik</option>
                          <option value="jemaat">Internal Jemaat</option>
                          <option value="rayon">Khusus Rayon</option>
                        </select>
                      </div>
                    )}
                  </div>
                </>
              )}

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
                  className={`px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm ${isSubmitting ? "opacity-70" : ""}`}
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

export default KontenPage;
