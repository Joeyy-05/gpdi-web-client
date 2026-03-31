import axiosInstance from '../config/axiosInstance';

// ==========================================
// API KONTEN UNTUK ADMIN / PENDETA
// ==========================================

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

export const getAllRenungan = async () => {
    try {
        const response = await axiosInstance.get('/content/admin/renungan');
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal memuat renungan'; }
};

export const createRenungan = async (data) => {
    try {
        const response = await axiosInstance.post('/content/admin/renungan', data);
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal membuat renungan'; }
};

export const updateRenungan = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/content/admin/renungan/${id}`, data);
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal update renungan'; }
};

export const deleteRenungan = async (id) => {
    try {
        const response = await axiosInstance.delete(`/content/admin/renungan/${id}`);
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal hapus renungan'; }
};

export const getAllGaleri = async () => {
    try {
        const response = await axiosInstance.get('/content/admin/galeri');
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal memuat galeri'; }
};

// PERBAIKAN: Header multipart/form-data dihapus agar Axios dapat menangani boundary secara otomatis
export const createGaleri = async (data) => {
    try {
        // Kembali menggunakan JSON biasa tanpa header multipart
        const response = await axiosInstance.post('/content/admin/galeri', data);
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal unggah foto'; }
};

// PERBAIKAN: Header multipart/form-data dihapus
export const updateGaleri = async (id, data) => {
    try {
        // Tetap gunakan POST untuk update JSON
        const response = await axiosInstance.post(`/content/admin/galeri/${id}`, data);
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal update galeri'; }
};

export const deleteGaleri = async (id) => {
    try {
        const response = await axiosInstance.delete(`/content/admin/galeri/${id}`);
        return response.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal hapus galeri'; }
};


// ==========================================
// API KONTEN UNTUK JEMAAT (READ-ONLY)
// ==========================================

// Mengambil daftar renungan harian khusus untuk dibaca Jemaat
export const getRenunganJemaat = async () => {
    try {
        const response = await axiosInstance.get('/content/devotionals');
        return response.data;
    } catch (error) { 
        throw error.response?.data?.message || 'Gagal memuat renungan harian.'; 
    }
};

// PERBAIKAN: Menambahkan fungsi untuk mengambil galeri publik
export const getPublicGaleri = async () => {
    try {
        const response = await axiosInstance.get('/content/galeri');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal memuat galeri publik.';
    }
};