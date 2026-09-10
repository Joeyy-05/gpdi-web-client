import React, { useState, useEffect, useMemo } from "react";
import {
  deleteJemaat,
  createJemaat,
  updateJemaat,
} from "../../services/jemaatService";
import { updateUserRole, getAllUsers } from "../../services/userService";
import { useAuth } from "../../context/useAuth";
// PERBAIKAN: Asumsi Anda memiliki service untuk mengambil daftar rayon. Sesuaikan path-nya jika berbeda.
import { getAllRayon } from "../../services/eventService";

const JemaatPage = () => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin" || currentUser?.role === "pendeta";
  const [jemaat, setJemaat] = useState([]);
  const [rayonList, setRayonList] = useState([]); // State untuk menyimpan daftar rayon
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // State untuk Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk input formulir (Ditambahkan id_rayon)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jemaat",
    id_rayon: "", // Default kosong
  });

  useEffect(() => {
    // Jalankan keduanya sekaligus (paralel) agar lebih cepat
    Promise.all([fetchData(), fetchRayon()]);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getAllUsers();
      setJemaat(data.data || data);
    } catch (error) {
      setErrorMsg(
        typeof error === "string" ? error : "Gagal mengambil data jemaat.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk mengambil daftar rayon dari backend
  const fetchRayon = async () => {
    try {
      const response = await getAllRayon();
      setRayonList(response.data || response);
    } catch (error) {
      console.error("Gagal memuat daftar rayon:", error);
      // Jangan memblokir halaman jika gagal, cukup catat di konsol
    }
  };

  const handleRoleChangeInline = async (id, newRole, userName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin mengubah peran ${userName || "pengguna ini"} menjadi ${newRole.replace("_", " ")}?`,
      )
    ) {
      try {
        await updateUserRole(id, newRole);
        fetchData();
      } catch (error) {
        alert(`Gagal mengubah peran: ${error}`);
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "jemaat",
      id_rayon: "",
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name || "",
      email: item.email || "",
      password: "",
      role: item.role || "jemaat",
      id_rayon: item.id_rayon || "", // Ambil id_rayon jika sudah ada
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Validasi mandiri: Pastikan akun jemaat/ketua_rayon memiliki rayon
      if (
        (formData.role === "jemaat" || formData.role === "ketua_rayon") &&
        !formData.id_rayon
      ) {
        throw new Error("Silakan pilih Rayon untuk pengguna ini!");
      }

      // Jika role adalah pendeta/admin, id_rayon boleh dikosongkan/null
      const finalPayload = { ...formData };
      if (finalPayload.role === "pendeta") {
        finalPayload.id_rayon = null;
      }

      if (editId) {
        await updateJemaat(editId, finalPayload);
        await updateUserRole(editId, finalPayload.role);
      } else {
        await createJemaat(finalPayload);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setErrorMsg(typeof error === "string" ? error : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, nama) => {
    if (
      window.confirm(`Apakah Anda yakin ingin menghapus data jemaat: ${nama}?`)
    ) {
      try {
        await deleteJemaat(id);
        fetchData();
      } catch (error) {
        alert(`Gagal menghapus: ${error}`);
      }
    }
  };

  // useMemo: hanya hitung ulang jika jemaat atau searchTerm berubah
  const filteredJemaat = useMemo(() => jemaat.filter((item) => {
    const matchName = (item.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchEmail = (item.email || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchName || matchEmail;
  }), [jemaat, searchTerm]);

  // Helper untuk menampilkan nama rayon di tabel
  const getRayonName = (id) => {
    if (!id) return "-";
    const rayon = rayonList.find((r) => r.id === id || r.id === parseInt(id));
    return rayon ? rayon.nama_rayon : "-";
  };

  return (
    <div className="font-sans space-y-6 relative">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Manajemen Jemaat
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data anggota, ploting rayon, dan hak akses (Role).
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm transition flex items-center text-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tambah Akun Jemaat
        </button>
      </div>

      {/* --- PENCARIAN --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
          />
        </div>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Nama Lengkap
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Kontak (Email)
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Rayon
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Peran Akses
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredJemaat.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    Tidak ada data jemaat.
                  </td>
                </tr>
              ) : (
                filteredJemaat.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {item.name || "Tanpa Nama"}
                    </td>
                    <td className="px-6 py-4">{item.email}</td>

                    {/* KOLOM RAYON DITAMPILKAN DI SINI */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getRayonName(item.id_rayon)}
                      </span>
                    </td>

                    {/* KOLOM PERAN DINAMIS */}
                    <td className="px-6 py-4">
                      {isAdmin && (
                        <select
                          value={item.role || "jemaat"}
                          onChange={(e) =>
                            handleRoleChangeInline(
                              item.id,
                              e.target.value,
                              item.name,
                            )
                          }
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold border capitalize cursor-pointer transition focus:outline-none focus:ring-2
                                                        ${
                                                          item.role ===
                                                          "pendeta"
                                                            ? "bg-purple-50 text-purple-700 border-purple-200 focus:ring-purple-500"
                                                            : item.role ===
                                                                "ketua_rayon"
                                                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500"
                                                              : "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500"
                                                        }`}
                        >
                          <option value="jemaat">Jemaat</option>
                          <option value="ketua_rayon">Ketua Rayon</option>
                          <option value="pendeta">Pendeta / Admin</option>
                        </select>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 p-2 rounded-lg transition"
                          title="Edit Profil"
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
                          onClick={() => handleDelete(item.id, item.name)}
                          className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition"
                          title="Hapus"
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

      {/* --- MODAL FORM (Tambah/Edit) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-slate-800">
                {editId ? "Edit Data & Peran" : "Buat Akun Jemaat Baru"}
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

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-100">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm outline-none"
                  placeholder="Masukkan nama jemaat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm outline-none"
                  placeholder="jemaat@gpdi.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Kata Sandi{" "}
                  {editId && (
                    <span className="text-slate-400 font-normal">
                      (Kosongkan jika tidak diubah)
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  required={!editId}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm outline-none"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {isAdmin && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Peran Akses
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm bg-white outline-none"
                    >
                      <option value="jemaat">Jemaat Biasa</option>
                      <option value="ketua_rayon">Ketua Rayon</option>
                      <option value="pendeta">Pendeta / Admin</option>
                    </select>
                  </div>
                )}

                {/* FIELD PEMILIHAN RAYON */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Plotting Rayon
                  </label>
                  <select
                    value={formData.id_rayon}
                    onChange={(e) =>
                      setFormData({ ...formData, id_rayon: e.target.value })
                    }
                    disabled={formData.role === "pendeta"} // Pendeta tidak terikat 1 rayon
                    className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm outline-none ${formData.role === "pendeta" ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                  >
                    <option value="">-- Pilih Rayon --</option>
                    {rayonList.map((rayon) => (
                      <option key={rayon.id} value={rayon.id}>
                        {rayon.nama_rayon}
                      </option>
                    ))}
                  </select>
                </div>
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
                  className={`px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Akun"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JemaatPage;
