import React from 'react';

const PublicFooter = () => {
    return (
        <footer className="bg-slate-900 text-white py-10 mt-auto font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-6 flex justify-center items-center">
                    {/* Ganti div ini dengan <img src={logoGPdI} alt="Logo GPdI" className="h-10 w-auto"/> nantinya */}
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">G</div>
                    <span className="font-bold text-lg ml-3 tracking-tight">GPdI Sibulele</span>
                </div>
                <p className="text-slate-400 text-sm mb-2">Jl. Contoh No. 123, Sibulele, Sulawesi Tengah</p>
                <p className="text-slate-400 text-sm mb-6">info@gpdisibulele.org | +62 123 4567 890</p>
                <div className="border-t border-slate-700 pt-6 text-slate-500 text-xs">
                    &copy; {new Date().getFullYear()} GPdI Jemaat Sibulele. Hak Cipta Dilindungi.
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;