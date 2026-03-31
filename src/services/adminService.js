import axiosInstance from '../config/axiosInstance';

// --- API LAYANAN SURAT ---
export const getAllSurat = async () => { const res = await axiosInstance.get('/admin/surat'); return res.data; };
export const createSurat = async (data) => { const res = await axiosInstance.post('/admin/surat', data); return res.data; };
export const updateSurat = async (id, data) => { const res = await axiosInstance.put(`/admin/surat/${id}`, data); return res.data; };
export const deleteSurat = async (id) => { const res = await axiosInstance.delete(`/admin/surat/${id}`); return res.data; };

// --- API NOTIFIKASI ---
export const getAllNotifikasi = async () => { const res = await axiosInstance.get('/admin/notifikasi'); return res.data; };
export const createNotifikasi = async (data) => { const res = await axiosInstance.post('/admin/notifikasi', data); return res.data; };
export const updateNotifikasi = async (id, data) => { const res = await axiosInstance.put(`/admin/notifikasi/${id}`, data); return res.data; };
export const deleteNotifikasi = async (id) => { const res = await axiosInstance.delete(`/admin/notifikasi/${id}`); return res.data; };