import axiosInstance from '../config/axiosInstance';

// Mengambil semua data pengguna/jemaat untuk tabel Admin
export const getAllUsers = async () => {
    try {
        // PERBAIKAN: Tambahkan /user di depannya
        const response = await axiosInstance.get('/user/admin/users');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal memuat data jemaat';
    }
};

// Mengubah role pengguna (misal: dari jemaat menjadi ketua_rayon)
export const updateUserRole = async (userId, roleName) => {
    try {
        // PERBAIKAN: Tambahkan /user di depannya
        const response = await axiosInstance.put(`/user/admin/users/${userId}/role`, { role: roleName });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal mengubah role pengguna';
    }
};