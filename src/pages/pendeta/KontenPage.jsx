import React, { useState, useEffect } from 'react';
import { getAllPengumuman, createPengumuman, updatePengumuman, deletePengumuman } from '../../services/contentService';

const KontenPage = () => {
    const [activeTab, setActiveTab] = useState('pengumuman');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    // State Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editId, setEditId] = useState(null);
    
    // State Form Pengumuman (Sudah menggunakan scope dan id_rayon)
    const [formData, setFormData] = useState({ 
        judul: '', 
        isi: '', 
        status: 'Aktif',
        scope: 'publik', 
        id_rayon: ''
    });

    useEffect(() => {
        if (activeTab === 'pengumuman') {
            fetchPengumuman();
        }
    }, [activeTab]);

    const fetchPengumuman = async () => {
        setIsLoading(true);
        try {
            const response = await getAllPengumuman();
            setData(response.data || []);
        } catch (error) {
            setErrorMsg('Gagal memuat data. Pastikan backend sudah terhubung.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditId(item.id);
            setFormData({ 
                judul: item.judul, 
                isi: item.isi, 
                status: item.status,
                scope: item.scope || 'publik',
                id_rayon: item.id_rayon || ''
            });
        } else {
            setEditId(null);
            setFormData({ judul: '', isi: '', status: 'Aktif', scope: 'publik', id_rayon: '' });
        }
        setErrorMsg('');
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        
        try {
            // Validasi di sisi frontend jika scope adalah rayon
            if (formData.scope === 'rayon' && !formData.id_rayon) {
                throw new Error('Silakan pilih rayon target terlebih dahulu.');
            }

            if (editId) {
                await updatePengumuman(editId, formData);
            } else {
                await createPengumuman(formData);
            }
            setIsModalOpen(false);
            fetchPengumuman();
        } catch (error) {
            setErrorMsg(typeof error === 'string' ? error : error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id, judul) => {
        if (window.confirm(`Hapus pengumuman "${judul}"?`)) {
            try {
                await deletePengumuman(id);
                fetchPengumuman();
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <div className="font-sans space-y-6 relative">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Konten & Publikasi</h1>
                <p className="text-slate-500 text-sm mt-1">Kelola informasi, renungan, dan galeri untuk ditampilkan di halaman publik jemaat.</p>
            </div>

            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    <button onClick={() => setActiveTab('pengumuman')} className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'pengumuman' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>
                        Pengumuman Warta
                    </button>
                    <button onClick={() => setActiveTab('renungan')} className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'renungan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>
                        Renungan Harian
                    </button>
                    <button onClick={() => setActiveTab('galeri')} className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'galeri' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>
                        Galeri Kegiatan
                    </button>
                </nav>
            </div>

            {activeTab === 'pengumuman' && (
                <div className="space-y-4 animate-fade-in-up">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-slate-800">Daftar Pengumuman</h2>
                        <button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm text-sm transition">
                            + Tambah Pengumuman
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold w-1/3">Judul Pengumuman</th>
                                    <th className="px-6 py-4 font-semibold">Target Audiens</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {isLoading ? (
                                    <tr><td colSpan="4" className="px-6 py-8 text-center">Memuat data...</td></tr>
                                ) : data.length === 0 ? (
                                    <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Belum ada data pengumuman.</td></tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition">
                                            <td className="px-6 py-4 font-medium text-slate-800">{item.judul}</td>
                                            <td className="px-6 py-4">
                                                <span className="capitalize bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium border border-indigo-100">
                                                    {item.scope === 'rayon' ? `Rayon ${item.id_rayon}` : item.scope}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${item.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <button onClick={() => handleOpenModal(item)} className="text-amber-500 bg-amber-50 p-2 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                                                    <button onClick={() => handleDelete(item.id, item.judul)} className="text-red-500 bg-red-50 p-2 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">{editId ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{errorMsg}</div>}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Pengumuman</label>
                                <input type="text" required value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm" placeholder="Contoh: Ibadah Padang Gabungan"/>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Isi Pengumuman</label>
                                <textarea required rows="4" value={formData.isi} onChange={(e) => setFormData({...formData, isi: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm" placeholder="Tuliskan detail pengumuman di sini..."></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Status Visibilitas</label>
                                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm bg-white">
                                    <option value="Aktif">Aktif (Tampil)</option>
                                    <option value="Tidak Aktif">Tidak Aktif (Sembunyi)</option>
                                </select>
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Target Audiens</label>
                                <select value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm bg-white">
                                    <option value="publik">Publik (Semua Orang)</option>
                                    <option value="jemaat">Internal Jemaat (Harus Login)</option>
                                    <option value="rayon">Khusus Rayon Tertentu</option>
                                </select>
                            </div>

                            {formData.scope === 'rayon' && (
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <label className="block text-sm font-semibold text-blue-800 mb-1">Pilih Rayon Target</label>
                                    <select required value={formData.id_rayon} onChange={(e) => setFormData({...formData, id_rayon: e.target.value})} className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 text-sm bg-white">
                                        <option value="">-- Pilih Rayon --</option>
                                        <option value="1">Rayon 1 - Yerusalem</option>
                                        <option value="2">Rayon 2 - Nazaret</option>
                                        <option value="3">Rayon 3 - Betlehem</option>
                                    </select>
                                </div>
                            )}

                            <div className="pt-4 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                <button type="submit" disabled={isSubmitting} className={`px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg ${isSubmitting ? 'opacity-70' : ''}`}>
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Pengumuman'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KontenPage;