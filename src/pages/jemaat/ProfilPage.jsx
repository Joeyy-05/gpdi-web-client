import React, { useState, useEffect } from "react";
// Pastikan path impor ini sesuai dengan struktur folder Anda
import {
  getProfileAPI,
  updateProfileAPI,
  updatePasswordAPI,
} from "../../services/profileService";
import {
  getFamilyMembersAPI,
  addFamilyMemberAPI,
  updateFamilyMemberAPI,
  deleteFamilyMemberAPI,
} from "../../services/familyService";

export default function ProfilPage() {
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE DATA PRIBADI ---
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    email: "", // Read-only
    rayon: "", // Read-only
  });

  // --- STATE KELUARGA ---
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [editingFamilyId, setEditingFamilyId] = useState(null);
  const [familyForm, setFamilyForm] = useState({
    full_name: "",
    gender: "",
    birth_date: "",
    relationship: "",
  });

  // --- STATE KEAMANAN ---
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // --- FETCH DATA AWAL ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, familyRes] = await Promise.all([
        getProfileAPI(),
        getFamilyMembersAPI(),
      ]);

      const pData = profileRes.data || {};

      setProfileForm({
        full_name: pData.full_name || "",
        phone_number: pData.phone_number || "",
        address: pData.address || "",
        email: pData.user?.email || "Email tidak tersedia",
        rayon: pData.rayon_id
          ? `Tergabung di Rayon ID: ${pData.rayon_id}`
          : "Belum Terdaftar",
      });

      setFamilyMembers(familyRes.data || []);
    } catch (error) {
      console.error("Gagal menarik data profil atau keluarga:", error);
      alert(
        error.message ||
          "Gagal memuat data dari server. Pastikan Anda sudah login.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- HANDLER DATA PRIBADI ---
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileAPI({
        full_name: profileForm.full_name,
        phone_number: profileForm.phone_number,
        address: profileForm.address,
      });
      alert("Profil berhasil diperbarui!");
      fetchData(); // Refresh data untuk memastikan konsistensi
    } catch (error) {
      console.error("Gagal update profil:", error);
      alert(error.message || "Gagal memperbarui profil.");
    }
  };

  // --- HANDLER KELUARGA ---
  const openFamilyModal = (member = null) => {
    if (member) {
      setEditingFamilyId(member.id);
      setFamilyForm({
        full_name: member.full_name,
        gender: member.gender,
        birth_date: member.birth_date,
        relationship: member.relationship,
      });
    } else {
      setEditingFamilyId(null);
      setFamilyForm({
        full_name: "",
        gender: "",
        birth_date: "",
        relationship: "",
      });
    }
    setIsFamilyModalOpen(true);
  };

  const handleFamilyChange = (e) => {
    setFamilyForm({ ...familyForm, [e.target.name]: e.target.value });
  };

  const handleFamilySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFamilyId) {
        await updateFamilyMemberAPI(editingFamilyId, familyForm);
        alert("Data anggota keluarga berhasil diperbarui!");
      } else {
        await addFamilyMemberAPI(familyForm);
        alert("Anggota keluarga berhasil ditambahkan!");
      }
      setIsFamilyModalOpen(false);
      fetchData(); // Refresh tabel
    } catch (error) {
      console.error("Gagal menyimpan keluarga:", error);
      alert(error.message || "Terjadi kesalahan saat menyimpan data keluarga.");
    }
  };

  const handleDeleteFamily = async (id) => {
    if (window.confirm("Yakin ingin menghapus anggota keluarga ini?")) {
      try {
        await deleteFamilyMemberAPI(id);
        alert("Anggota keluarga berhasil dihapus!");
        fetchData(); // Refresh tabel
      } catch (error) {
        console.error("Gagal menghapus keluarga:", error);
        alert(error.message || "Gagal menghapus data anggota keluarga.");
      }
    }
  };

  // --- HANDLER KEAMANAN ---
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      return alert("Konfirmasi password baru tidak cocok!");
    }

    try {
      await updatePasswordAPI(passwordForm);
      alert("Password berhasil diperbarui!");
      setPasswordForm({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      console.error("Gagal update password:", error);
      alert(
        error.message ||
          "Gagal memperbarui password. Pastikan password lama Anda benar.",
      );
    }
  };

  // --- KELAS CSS ---
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-[#0D1282] focus:ring-2 focus:ring-blue-100";
  const sectionClass =
    "rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-9";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wide text-[#0D1282]";

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#0D1282] font-bold">
        Memuat Profil...
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen bg-[#f7f8fb] text-slate-900"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <main className="px-5 pb-24 pt-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
                Akun jemaat
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-[#0D1282] sm:text-6xl">
                Profil Saya
              </h1>
              <p className="mt-4 text-base font-medium text-slate-600">
                Kelola informasi pribadi dan data anggota keluarga
              </p>
            </section>

            {/* SECTION DATA PRIBADI */}
            <section className={`mt-8 ${sectionClass}`}>
              <h2 className="mb-6 text-[22px] font-extrabold text-[#111111]">
                Data Pribadi
              </h2>
              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Nama Lengkap</label>
                    <input
                      name="full_name"
                      value={profileForm.full_name}
                      onChange={handleProfileChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor HP</label>
                    <input
                      name="phone_number"
                      value={profileForm.phone_number}
                      onChange={handleProfileChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Alamat</label>
                    <input
                      name="address"
                      value={profileForm.address}
                      onChange={handleProfileChange}
                      className={inputClass}
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Email (Tidak dapat diubah)
                    </label>
                    <input
                      value={profileForm.email}
                      className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Rayon (Ditetapkan Admin)
                    </label>
                    <input
                      value={profileForm.rayon}
                      className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="rounded-full bg-[#0D1282] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#0a0f63]"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </section>

            {/* SECTION ANGGOTA KELUARGA */}
            <section className={`mt-10 ${sectionClass}`}>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-[22px] font-extrabold text-[#111111]">
                  Anggota Keluarga
                </h2>
                <button
                  onClick={() => openFamilyModal()}
                  className="rounded-full bg-[#D71313] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#b51010]"
                >
                  + Tambah anggota
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full border-collapse text-left text-[14px] text-[#222222]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border-b border-[#D0D0D0] px-4 py-3 font-bold">
                        Nama Lengkap
                      </th>
                      <th className="border-b border-[#D0D0D0] px-4 py-3 font-bold">
                        Jenis Kelamin
                      </th>
                      <th className="border-b border-[#D0D0D0] px-4 py-3 font-bold">
                        Tanggal Lahir
                      </th>
                      <th className="border-b border-[#D0D0D0] px-4 py-3 font-bold">
                        Hubungan
                      </th>
                      <th className="border-b border-[#D0D0D0] px-4 py-3 font-bold text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {familyMembers.length > 0 ? (
                      familyMembers.map((member) => (
                        <tr
                          key={member.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="border-b border-[#D0D0D0] px-4 py-3">
                            {member.full_name}
                          </td>
                          <td className="border-b border-[#D0D0D0] px-4 py-3">
                            {member.gender}
                          </td>
                          <td className="border-b border-[#D0D0D0] px-4 py-3">
                            {member.birth_date}
                          </td>
                          <td className="border-b border-[#D0D0D0] px-4 py-3">
                            {member.relationship}
                          </td>
                          <td className="border-b border-[#D0D0D0] px-4 py-3 text-center">
                            <button
                              onClick={() => openFamilyModal(member)}
                              className="text-[#0D1282] font-bold mr-3 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFamily(member.id)}
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
                          colSpan="5"
                          className="px-4 py-8 text-center text-gray-500 font-medium"
                        >
                          Belum ada data anggota keluarga.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[14px] font-medium italic text-[#6E6E6E]">
                Data anggota keluarga akan digunakan untuk administrasi
                pelayanan gereja.
              </p>
            </section>

            {/* SECTION KEAMANAN AKUN */}
            <section className={`mt-8 ${sectionClass}`}>
              <h2 className="mb-6 text-[22px] font-extrabold text-[#111111]">
                Keamanan Akun
              </h2>
              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-5 max-w-xl"
              >
                <div>
                  <label className={labelClass}>Password Lama</label>
                  <input
                    type="password"
                    name="old_password"
                    value={passwordForm.old_password}
                    onChange={handlePasswordChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Password Baru</label>
                  <input
                    type="password"
                    name="new_password"
                    value={passwordForm.new_password}
                    onChange={handlePasswordChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    name="new_password_confirmation"
                    value={passwordForm.new_password_confirmation}
                    onChange={handlePasswordChange}
                    className={inputClass}
                    required
                  />
                </div>
                <p className="text-[13px] font-medium italic text-[#6E6E6E]">
                  Password minimal 6 karakter.
                </p>
                <button
                  type="submit"
                  className="w-full bg-[#0D1282] py-3.5 text-[15px] font-bold text-white hover:bg-[#0a0f63] rounded-md transition-all"
                >
                  Perbarui Password
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>

      {/* MODAL ANGGOTA KELUARGA */}
      {isFamilyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 md:p-8 shadow-xl">
            <h3 className="mb-6 text-[22px] font-bold text-[#0D1282]">
              {editingFamilyId
                ? "Edit Anggota Keluarga"
                : "Tambah Anggota Keluarga"}
            </h3>
            <form onSubmit={handleFamilySubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Nama Lengkap</label>
                <input
                  name="full_name"
                  value={familyForm.full_name}
                  onChange={handleFamilyChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={familyForm.gender}
                    onChange={handleFamilyChange}
                    className={inputClass}
                    required
                  >
                    <option value="" disabled>
                      Pilih...
                    </option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tanggal Lahir</label>
                  <input
                    type="date"
                    name="birth_date"
                    value={familyForm.birth_date}
                    onChange={handleFamilyChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Hubungan (Misal: Istri, Suami, Anak)
                </label>
                <input
                  name="relationship"
                  value={familyForm.relationship}
                  onChange={handleFamilyChange}
                  className={inputClass}
                  placeholder="Contoh: Anak"
                  required
                />
              </div>
              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFamilyModalOpen(false)}
                  className="px-5 py-2.5 text-[14px] font-bold text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#D71313] px-6 py-2.5 text-[14px] font-bold text-white hover:bg-[#b51010] rounded-md transition-all"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
