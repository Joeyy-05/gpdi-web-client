import axiosInstance from '../config/axiosInstance';

// Mengambil semua pengumuman
export const getAllPengumuman = async () => {
    try {
        const response = await axiosInstance.get('/content/admin/pengumuman');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal mengambil data pengumuman';
    }
};

// Menambah pengumuman baru
export const createPengumuman = async (data) => {
    try {
        const response = await axiosInstance.post('/content/admin/pengumuman', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal membuat pengumuman';
    }
};

// Mengubah pengumuman
export const updatePengumuman = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/content/admin/pengumuman/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal memperbarui pengumuman';
    }
};

// Menghapus pengumuman
export const deletePengumuman = async (id) => {
    try {
        const response = await axiosInstance.delete(`/content/admin/pengumuman/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal menghapus pengumuman';
    }
};