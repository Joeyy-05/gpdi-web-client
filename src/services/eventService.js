import axiosInstance from '../config/axiosInstance';

// --- API PUBLIK UNTUK JEMAAT (Tanpa Login) ---
export const getPublicWorship = async () => {
    try {
        const res = await axiosInstance.get('/event/worship'); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal memuat jadwal ibadah'; }
};

export const getPublicActivity = async () => {
    try {
        const res = await axiosInstance.get('/event/activity'); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal memuat jadwal kegiatan'; }
};

// --- API RAYON ---
export const getAllRayon = async () => {
    try {
        const res = await axiosInstance.get('/event/admin/rayon'); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal memuat rayon'; }
};
export const createRayon = async (data) => {
    try {
        const res = await axiosInstance.post('/event/admin/rayon', data); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal membuat rayon'; }
};
export const updateRayon = async (id, data) => {
    try {
        const res = await axiosInstance.put(`/event/admin/rayon/${id}`, data); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal update rayon'; }
};
export const deleteRayon = async (id) => {
    try {
        const res = await axiosInstance.delete(`/event/admin/rayon/${id}`); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal hapus rayon'; }
};

// --- API JADWAL IBADAH ---
export const getAllWorship = async () => {
    try {
        const res = await axiosInstance.get('/event/admin/worship'); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal memuat jadwal'; }
};
export const createWorship = async (data) => {
    try {
        const res = await axiosInstance.post('/event/admin/worship', data); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal membuat jadwal'; }
};
export const updateWorship = async (id, data) => {
    try {
        const res = await axiosInstance.put(`/event/admin/worship/${id}`, data); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal update jadwal'; }
};
export const deleteWorship = async (id) => {
    try {
        const res = await axiosInstance.delete(`/event/admin/worship/${id}`); return res.data;
    } catch (error) { throw error.response?.data?.message || 'Gagal hapus jadwal'; }
};

// --- API JADWAL KEGIATAN ---
export const getAllActivity = async () => { 
    const res = await axiosInstance.get('/event/admin/activity'); 
    return res.data; 
};

export const createActivity = async (data) => { 
    // Biarkan Axios menangani header secara otomatis
    const res = await axiosInstance.post('/event/admin/activity', data); 
    return res.data; 
};

export const updateActivity = async (id, data) => { 
    const res = await axiosInstance.put(`/event/admin/activity/${id}`, data); 
    return res.data; 
};

export const deleteActivity = async (id) => { 
    const res = await axiosInstance.delete(`/event/admin/activity/${id}`); 
    return res.data; 
};

// --- API JADWAL RAYON (ADMIN) ---
export const getAllRayonSchedule = async () => { const res = await axiosInstance.get('/event/admin/rayon-schedule'); return res.data; };
export const createRayonSchedule = async (data) => { const res = await axiosInstance.post('/event/admin/rayon-schedule', data); return res.data; };
export const updateRayonSchedule = async (id, data) => { const res = await axiosInstance.put(`/event/admin/rayon-schedule/${id}`, data); return res.data; };
export const deleteRayonSchedule = async (id) => { const res = await axiosInstance.delete(`/event/admin/rayon-schedule/${id}`); return res.data; };

// Mengambil jadwal ibadah rayon khusus untuk jemaat yang sedang login
export const getJadwalRayonJemaat = async () => {
    try {
        const response = await axiosInstance.get('/event/jemaat/rayon-schedules');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal memuat jadwal rayon jemaat.';
    }
};

// =========================================================
// --- API KHUSUS KETUA RAYON (ManajemenIbadahPage.jsx) ---
// =========================================================
export const getRayonSchedulesAPI = async () => {
    try {
        const response = await axiosInstance.get('/event/rayon-schedules/me');
        return response; // Mengembalikan full response agar sesuai dengan destructuring .data di komponen
    } catch (error) {
        throw error.response?.data?.message || 'Gagal memuat jadwal rayon';
    }
};

export const createRayonScheduleAPI = async (data) => {
    try {
        const response = await axiosInstance.post('/event/rayon-schedules', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal menambah jadwal rayon';
    }
};

export const updateRayonScheduleAPI = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/event/rayon-schedules/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal update jadwal rayon';
    }
};

export const deleteRayonScheduleAPI = async (id) => {
    try {
        const response = await axiosInstance.delete(`/event/rayon-schedules/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gagal menghapus jadwal rayon';
    }
};