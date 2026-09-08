import React, { useState, useEffect, useCallback } from "react";
import {
  getAllRayon,
  createRayon,
  updateRayon,
  deleteRayon,
  getAllWorship,
  createWorship,
  updateWorship,
  deleteWorship,
  getAllActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllRayonSchedule,
  createRayonSchedule,
  updateRayonSchedule,
  deleteRayonSchedule,
} from "../../services/eventService";

const JadwalRayonPage = () => {
  const [activeTab, setActiveTab] = useState("ibadah");
  const [data, setData] = useState([]);
  const [rayonsList, setRayonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  // PERBAIKAN: Menambahkan 'gambar' dengan nilai awal null
  const [formData, setFormData] = useState({
    nama_rayon: "",
    keterangan: "",
    rayon_id: "",
    title: "",
    description: "",
    location: "",
    event_date: "",
    start_time: "",
    end_time: "",
    status_publish: "published",
    category: "Ibadah Raya Minggu",
    day_of_week: "Minggu",
    gambar: null,
  });

  const fetchRayonsDropdown = async () => {
    try {
      const res = await getAllRayon();
      setRayonsList(res?.data || []);
    } catch (error) {
      console.error("Gagal memuat dropdown rayon:", error);
    }
  };

  useEffect(() => {
    fetchRayonsDropdown();
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      let res;
      if (activeTab === "rayon") res = await getAllRayon();
      else if (activeTab === "ibadah") res = await getAllWorship();
      else if (activeTab === "kegiatan") res = await getAllActivity();
      else if (activeTab === "jadwal_rayon") res = await getAllRayonSchedule();
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
        nama_rayon: item.nama_rayon || "",
        keterangan: item.keterangan || "",
        rayon_id: item.rayon_id || "",
        title: item.title || "",
        description: item.description || "",
        location: item.location || "",
        event_date: item.event_date ? item.event_date.split("T")[0] : "",
        start_time: item.start_time || "",
        end_time: item.end_time || "",
        status_publish: item.status_publish || "published",
        category: item.category || "Ibadah Raya Minggu",
        day_of_week: item.day_of_week || "Minggu",
        gambar: null, // Selalu reset input file saat edit
      });
    } else {
      setEditId(null);
      setFormData({
        nama_rayon: "",
        keterangan: "",
        rayon_id: "",
        title: "",
        description: "",
        location: "",
        event_date: "",
        start_time: "",
        end_time: "",
        status_publish: "published",
        category: "Ibadah Raya Minggu",
        day_of_week: "Minggu",
        gambar: null,
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
      // Karena kita menggunakan Base64 (teks), semua modul bisa menggunakan logika JSON seragam
      if (activeTab === "rayon")
        editId
          ? await updateRayon(editId, formData)
          : await createRayon(formData);
      else if (activeTab === "ibadah")
        editId
          ? await updateWorship(editId, formData)
          : await createWorship(formData);
      else if (activeTab === "kegiatan")
        editId
          ? await updateActivity(editId, formData)
          : await createActivity(formData);
      else if (activeTab === "jadwal_rayon")
        editId
          ? await updateRayonSchedule(editId, formData)
          : await createRayonSchedule(formData);

      if (activeTab === "rayon") fetchRayonsDropdown();
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
        if (activeTab === "rayon") {
          await deleteRayon(id);
          fetchRayonsDropdown();
        } else if (activeTab === "ibadah") await deleteWorship(id);
        else if (activeTab === "kegiatan") await deleteActivity(id);
        else if (activeTab === "jadwal_rayon") await deleteRayonSchedule(id);
        fetchData();
      } catch (error) {
        alert(error);
      }
    }
  };

  // Fungsi baru untuk memproses gambar menjadi teks Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, gambar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-sans space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Manajemen Event & Rayon
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola seluruh agenda gereja secara terpusat.
        </p>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {["ibadah", "kegiatan", "jadwal_rayon", "rayon"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize py-4 px-2 border-b-2 font-medium text-sm transition whitespace-nowrap ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            Daftar {activeTab.replace("_", " ")}
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
                {activeTab === "rayon" ? (
                  <>
                    <th className="px-6 py-4">Nama Rayon</th>
                    <th className="px-6 py-4">Keterangan</th>
                  </>
                ) : activeTab === "ibadah" ? (
                  <>
                    <th className="px-6 py-4">Kategori & Judul</th>
                    <th className="px-6 py-4">Hari & Waktu</th>
                    <th className="px-6 py-4">Lokasi</th>
                    <th className="px-6 py-4">Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4">Judul Acara</th>
                    <th className="px-6 py-4">Waktu & Tempat</th>
                    {activeTab !== "jadwal_rayon" && (
                      <th className="px-6 py-4">Status</th>
                    )}
                  </>
                )}
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    Memuat data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    {activeTab === "rayon" ? (
                      <>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {item.nama_rayon}
                        </td>
                        <td className="px-6 py-4">{item.keterangan || "-"}</td>
                      </>
                    ) : activeTab === "ibadah" ? (
                      <>
                        <td className="px-6 py-4">
                          <div className="font-bold text-blue-800 bg-blue-50 inline-block px-2 py-1 rounded text-xs mb-1">
                            {item.category}
                          </div>
                          <div className="font-medium text-slate-800">
                            {item.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">
                            {item.day_of_week}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {item.start_time} - {item.end_time || "Selesai"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium uppercase">
                          {item.status_publish}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">
                            {item.title}
                          </div>
                          {activeTab === "jadwal_rayon" && (
                            <div className="text-xs text-indigo-600 mt-1 font-semibold">
                              ID Rayon: {item.rayon_id}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            {item.event_date
                              ? new Date(item.event_date).toLocaleDateString(
                                  "id-ID",
                                )
                              : "-"}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {item.start_time} - {item.end_time || "Selesai"} |{" "}
                            {item.location}
                          </div>
                        </td>
                        {activeTab !== "jadwal_rayon" && (
                          <td className="px-6 py-4 text-xs font-medium uppercase">
                            {item.status_publish}
                          </td>
                        )}
                      </>
                    )}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="text-amber-500 bg-amber-50 hover:bg-amber-100 p-2 rounded transition"
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
                            handleDelete(item.id, item.nama_rayon || item.title)
                          }
                          className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded transition"
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
                {editId
                  ? `Edit ${activeTab.replace("_", " ")}`
                  : `Tambah ${activeTab.replace("_", " ")}`}
              </h3>
              <button
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

            {/* FORM SUBMIT */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                  {errorMsg}
                </div>
              )}

              {activeTab === "rayon" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Nama Rayon
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama_rayon}
                      onChange={(e) =>
                        setFormData({ ...formData, nama_rayon: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Keterangan
                    </label>
                    <textarea
                      rows="3"
                      value={formData.keterangan}
                      onChange={(e) =>
                        setFormData({ ...formData, keterangan: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  {activeTab === "jadwal_rayon" && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <label className="block text-sm font-semibold text-blue-800 mb-1">
                        Pilih Rayon
                      </label>
                      <select
                        required
                        value={formData.rayon_id}
                        onChange={(e) =>
                          setFormData({ ...formData, rayon_id: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                      >
                        <option value="">-- Pilih Rayon --</option>
                        {rayonsList.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.nama_rayon}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {activeTab === "ibadah" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Kategori
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                        >
                          <option value="Ibadah Raya Minggu">
                            Ibadah Raya Minggu
                          </option>
                          <option value="Ibadah Sekolah Minggu">
                            Ibadah Sekolah Minggu
                          </option>
                          <option value="Ibadah Pemuda & Remaja">
                            Ibadah Pemuda & Remaja
                          </option>
                          <option value="Ibadah Wanita (Pelwap)">
                            Ibadah Wanita (Pelwap)
                          </option>
                          <option value="Doa Malam Jemaat">
                            Doa Malam Jemaat
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Hari Pelaksanaan
                        </label>
                        <select
                          required
                          value={formData.day_of_week}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              day_of_week: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                        >
                          <option value="Minggu">Minggu</option>
                          <option value="Senin">Senin</option>
                          <option value="Selasa">Selasa</option>
                          <option value="Rabu">Rabu</option>
                          <option value="Kamis">Kamis</option>
                          <option value="Jumat">Jumat</option>
                          <option value="Sabtu">Sabtu</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Judul / Sesi Acara
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Misal: Ibadah Sesi 1"
                    />
                  </div>

                  {/* PERBAIKAN: Input Gambar memanggil handleImageUpload */}
                  {activeTab === "kegiatan" && (
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Foto / Gambar Kegiatan
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        *Maksimal 2MB. Biarkan kosong jika tidak ingin mengubah
                        foto.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        {activeTab === "ibadah"
                          ? "Tanggal (Opsional)"
                          : "Tanggal"}
                      </label>
                      <input
                        type="date"
                        required={activeTab !== "ibadah"}
                        value={formData.event_date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            event_date: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Lokasi
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Mulai
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.start_time}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            start_time: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Selesai (Opsional)
                      </label>
                      <input
                        type="time"
                        value={formData.end_time}
                        onChange={(e) =>
                          setFormData({ ...formData, end_time: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {activeTab !== "jadwal_rayon" && (
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status_publish}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status_publish: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                      >
                        <option value="published">Diterbitkan</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Keterangan Tambahan
                    </label>
                    <textarea
                      rows="2"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    ></textarea>
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
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
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

export default JadwalRayonPage;
