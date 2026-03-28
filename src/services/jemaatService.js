import axiosInstance from '../config/axiosInstance';

export const getAllJemaat = async () => {
    try {
        const response = await axiosInstance.get('/user/jemaat'); 
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal mengambil data jemaat';
    }
};

// --- TAMBAHKAN DUA FUNGSI INI ---
export const createJemaat = async (jemaatData) => {
    try {
        const response = await axiosInstance.post('/user/jemaat', jemaatData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal membuat akun jemaat';
    }
};

export const updateJemaat = async (id, jemaatData) => {
    try {
        const response = await axiosInstance.put(`/user/jemaat/${id}`, jemaatData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal memperbarui data jemaat';
    }
};

export const deleteJemaat = async (id) => {
    try {
        const response = await axiosInstance.delete(`/user/jemaat/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal menghapus data jemaat';
    }
};