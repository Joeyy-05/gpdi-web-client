import React from "react";
// Pastikan path import ini sesuai dengan lokasi fail JemaatFooter Anda
import { homeData } from "../data/homeData"; 

export default function JemaatFooter() {
  const { gereja } = homeData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F3F3F3] px-5 pb-6 pt-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto flex min-h-[270px] w-full max-w-[1385px] flex-col items-center bg-[#E9E7E7] px-6 pt-10 text-center rounded-lg shadow-inner">
          <h3 className="text-[22px] font-bold text-[#0D1282] uppercase tracking-widest">GPdI Sibulele</h3>
          <p className="mt-4 text-[16px] font-medium text-gray-700 max-w-2xl">{gereja.alamat}</p>

          <div className="mt-8 flex items-center gap-6">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#3b5998] text-white rounded-full font-bold">f</a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-yellow-400 to-purple-600 text-white rounded-lg font-bold text-xs">IG</a>
            <a href="#" className="w-12 h-10 flex items-center justify-center bg-red-600 text-white rounded-lg font-bold text-xs uppercase">YT</a>
          </div>

          <div className="mt-10 border-t border-gray-300 w-full pt-6">
            <p className="text-[12px] text-gray-500">© {currentYear} GPdI Sibulele. All Rights Reserved. | <span className="font-bold text-[#0D1282]">Bersama Melayani Tuhan</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}