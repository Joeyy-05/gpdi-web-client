import React from 'react';
import { useNavigate } from 'react-router-dom';
// Impor gambar jika ada di folder assets
// import heroBg from '../assets/hero_bg.jpg';
// import ibadahRayaImg from '../assets/ibadah_raya.jpg';
// import sekolahMingguImg from '../assets/sekolah_minggu.jpg';
// import ibadahPemudaImg from '../assets/ibadah_pemuda.jpg';
// import ibadahWanitaImg from '../assets/ibadah_wanita.jpg';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="font-sans">
            {/* HERO SECTION */}
            <section 
                className="relative h-[650px] flex items-center justify-center text-center px-4"
                style={{
                    // Ganti URL ini dengan gambar asli (export dari Figma)
                    backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay Gelap agar teks terbaca */}
                <div className="absolute inset-0 bg-slate-950 bg-opacity-65"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-white">
                    <p className="text-blue-300 font-semibold tracking-wider uppercase mb-5 text-sm">Selamat Datang di Website Resmi</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        Gereja Pantekosta di Indonesia (GPdI)<br/> Jemaat Sibulele
                    </h1>
                    
                    <div className="mt-8 mb-12 bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 inline-block px-10 py-5 rounded-xl shadow-lg">
                        <p className="text-lg italic font-medium text-gray-100">"Sebab itu jadilah penurut-penurut Allah, seperti anak-anak yang kekasih"</p>
                        <p className="text-sm font-semibold text-blue-300 mt-3 tracking-wide">Efesus 5:1 (Ayat Tahunan 2026)</p>
                    </div>
                    
                    <div>
                        <button 
                            onClick={() => navigate('/jadwal')}
                            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition text-lg shadow-md"
                        >
                            Lihat Jadwal Ibadah
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION INFORMASI PELAYANAN */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Informasi Pelayanan</h2>
                        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                        <p className="text-slate-600 mt-5 max-w-2xl mx-auto">
                            Berbagai ibadah dan pelayanan yang kami selenggarakan untuk membangun kerohanian jemaat di segala usia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Kartu Pelayanan 1 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group border border-slate-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop" alt="Ibadah Raya" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-7 text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Ibadah Raya</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Diadakan setiap hari Minggu pagi untuk seluruh jemaat.</p>
                            </div>
                        </div>

                        {/* Kartu Pelayanan 2 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group border border-slate-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1602058300263-8ce058df34cc?q=80&w=800&auto=format&fit=crop" alt="Sekolah Minggu" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-7 text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Sekolah Minggu</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Ibadah khusus anak-anak untuk mengenal Tuhan sejak dini.</p>
                            </div>
                        </div>

                        {/* Kartu Pelayanan 3 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group border border-slate-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1523580494112-071d16940353?q=80&w=800&auto=format&fit=crop" alt="Ibadah Pemuda" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-7 text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Ibadah Pemuda</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Wadah bagi generasi muda (Pelpap) untuk bertumbuh bersama.</p>
                            </div>
                        </div>

                        {/* Kartu Pelayanan 4 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group border border-slate-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" alt="Ibadah Wanita" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-7 text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Ibadah Wanita</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Persekutuan khusus kaum wanita untuk saling menguatkan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;