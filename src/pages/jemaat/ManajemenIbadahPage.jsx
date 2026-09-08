import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import {
  getRayonSchedulesAPI,
  createRayonScheduleAPI,
  updateRayonScheduleAPI,
  deleteRayonScheduleAPI,
} from "../../services/eventService";

export default function ManajemenIbadahPage() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    rayon_id: user?.id_rayon || "",
    title: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    description: "",
    category: "Ibadah Rayon",
    day_of_week: "Minggu",
    status_publish: "published",
  });

  const todayDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  // PERBAIKAN UTAMA: Logika ekstraksi Array yang kebal terhadap berbagai jenis format Response
  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const res = await getRayonSchedulesAPI();

      // Menembus bungkusan JSON Axios dan Laravel
      let actualArray = [];
      if (res?.data?.data && Array.isArray(res.data.data)) {
        actualArray = res.data.data; // Jika dari full Axios response
      } else if (res?.data && Array.isArray(res.data)) {
        actualArray = res.data; // Jika langsung array dari Laravel JSON
      } else if (Array.isArray(res)) {
        actualArray = res;
      }

      setSchedules(actualArray);
    } catch (error) {
      console.error("Gagal menarik jadwal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDayName = (dateString) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const d = new Date(dateString);
    return days[d.getDay()];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "event_date" && value) {
        newData.day_of_week = getDayName(value);
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        rayon_id: user?.id_rayon || formData.rayon_id,
      };

      if (isEditing) {
        await updateRayonScheduleAPI(editId, payload);
        alert("Jadwal berhasil diperbarui!");
      } else {
        await createRayonScheduleAPI(payload);
        alert("Jadwal ibadah baru berhasil ditambahkan!");
      }
      resetForm();
      fetchSchedules();
    } catch (error) {
      console.error("Gagal menyimpan jadwal:", error);
      alert("Gagal menyimpan data! Validasi Backend menolak data Anda.");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormData({
      rayon_id: item.rayon_id || user?.id_rayon || "",
      title: item.title || "",
      event_date: item.event_date ? item.event_date.split("T")[0] : "",
      start_time: item.start_time || "",
      end_time: item.end_time || "",
      location: item.location || "",
      description: item.description || "",
      category: item.category || "Ibadah Rayon",
      day_of_week: item.day_of_week || "Minggu",
      status_publish: item.status_publish || "published",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus jadwal ini secara permanen?",
      )
    ) {
      try {
        await deleteRayonScheduleAPI(id);
        alert("Jadwal berhasil dihapus.");
        fetchSchedules();
      } catch (error) {
        console.error("Gagal menghapus jadwal:", error);
        alert("Terjadi kesalahan saat menghapus jadwal.");
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      rayon_id: user?.id_rayon || "",
      title: "",
      event_date: "",
      start_time: "",
      end_time: "",
      location: "",
      description: "",
      category: "Ibadah Rayon",
      day_of_week: "Minggu",
      status_publish: "published",
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#0D1282] placeholder:text-slate-400 outline-none focus:border-[#0D1282] focus:ring-2 focus:ring-blue-100";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wide text-[#0D1282]";

  return (
    <div
      className="min-h-screen bg-[#f7f8fb] text-[#0D1282]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="px-5 pb-16 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-2xl bg-[#0D1282] p-7 text-white shadow-xl shadow-blue-950/15 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              Ketua rayon
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Manajemen Ibadah Rayon
            </h1>
            <p className="mt-4 text-sm font-medium text-blue-100 sm:text-base">
              Kelola jadwal ibadah rayon secara terpusat dan terorganisir
            </p>
            <p className="mt-2 text-sm font-medium text-blue-100 sm:text-base">
              Tanggal: {todayDate}
            </p>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  resetForm();
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="rounded-full bg-[#D71313] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#b10f10]"
              >
                + Tambah Jadwal Ibadah
              </button>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-7 text-2xl font-extrabold text-[#0D1282]">
              {isEditing
                ? "Form Edit Jadwal Ibadah"
                : "Form Tambah Jadwal Ibadah"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label className={labelClass}>Nama Rayon (Otomatis)</label>
                  <input
                    className={`${inputClass} bg-gray-200 cursor-not-allowed text-gray-600`}
                    value={`Rayon ID: ${user?.id_rayon || "Belum diatur"}`}
                    readOnly
                  />
                </div>
                <div>
                  <label className={labelClass}>Judul / Sesi Acara</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Misal: Ibadah Rayon Minggu ke-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div>
                  <label className={labelClass}>Tanggal Pelaksanaan</label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Waktu Mulai</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Waktu Selesai (Opsional)</label>
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Lokasi Ibadah</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Masukkan Alamat Lengkap / Nama Tuan Rumah"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Keterangan Tambahan (Opsional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[160px] w-full border border-[#D1D1D1] bg-white px-6 py-6 text-[18px] font-medium text-[#0D1282] placeholder:text-[#7A7A7A] outline-none focus:border-[#0D1282] rounded-lg"
                  placeholder="Tambahkan Keterangan (contoh: Nama Pelayan Firman, Penanggung Jawab, dll)"
                />
              </div>

              <div className="flex items-center gap-8 pt-4 border-t border-gray-300 mt-6 pt-8">
                <button
                  type="submit"
                  className="min-w-[172px] rounded-[12px] bg-[#D71313] px-8 py-3 text-[20px] font-semibold text-white shadow-sm transition hover:bg-[#b10f10]"
                >
                  {isEditing ? "Update Jadwal" : "Simpan Jadwal"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="min-w-[172px] rounded-[12px] border border-[#D71313] bg-white px-8 py-3 text-[20px] font-semibold text-[#D71313] transition hover:bg-red-50"
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-xl font-extrabold text-[#0D1282]">
              Daftar Jadwal Ibadah Rayon
            </h3>

            {isLoading ? (
              <div className="text-center py-10 font-bold text-gray-500 animate-pulse">
                Memuat Data Jadwal...
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[#CFCFCF] bg-white">
                <table className="w-full border-collapse text-left text-[15px] text-[#0D1282]">
                  <thead>
                    <tr className="bg-[#EFEFEF]">
                      <th className="border-b border-[#CFCFCF] px-5 py-4 font-bold">
                        Judul Acara
                      </th>
                      <th className="border-b border-[#CFCFCF] px-5 py-4 font-bold">
                        Waktu & Tempat
                      </th>
                      <th className="border-b border-[#CFCFCF] px-5 py-4 font-bold text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.length > 0 ? (
                      schedules.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="border-b border-[#CFCFCF] px-5 py-4 align-top">
                            <div className="font-bold text-lg">
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {item.description}
                              </div>
                            )}
                          </td>
                          <td className="border-b border-[#CFCFCF] px-5 py-4 align-top">
                            <div className="font-semibold">
                              {item.event_date
                                ? new Date(item.event_date).toLocaleDateString(
                                    "id-ID",
                                  )
                                : "-"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              ⏰ {item.start_time} -{" "}
                              {item.end_time || "Selesai"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1 font-medium">
                              📍 {item.location}
                            </div>
                          </td>
                          <td className="border-b border-[#CFCFCF] px-5 py-4 text-center align-middle">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-[#0D1282] font-bold mr-4 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-[#D71313] font-bold hover:underline"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-5 py-10 text-center text-gray-500 font-medium text-lg"
                        >
                          Belum ada jadwal ibadah yang didaftarkan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
