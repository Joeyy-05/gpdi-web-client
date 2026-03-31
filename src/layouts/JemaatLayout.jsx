import React from "react";
import { Outlet } from "react-router-dom";
import JemaatNavbar from "../components/JemaatNavbar"; // Sesuaikan path jika berbeda
import JemaatFooter from "../components/JemaatFooter"; // Sesuaikan path jika berbeda

export default function JemaatLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
      {/* Navbar statis di atas */}
      <JemaatNavbar />
      
      {/* Konten halaman yang berubah-ubah (dinamis) akan dirender di sini */}
      <main className="flex-grow">
        <Outlet /> 
      </main>

      {/* Footer statis di bawah */}
      <JemaatFooter />
    </div>
  );
}