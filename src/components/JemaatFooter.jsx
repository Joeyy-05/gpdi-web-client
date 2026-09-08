import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { homeData } from "../data/homeData";

export default function JemaatFooter() {
  const { gereja } = homeData;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#f7f8fb] px-5 pb-6 pt-4"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-[#07104f] px-6 py-9 text-white shadow-xl shadow-blue-950/10 sm:px-10 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              Ruang jemaat
            </p>
            <h3 className="mt-2 text-2xl font-extrabold">
              Bertumbuh dan melayani bersama.
            </h3>
          </div>
          <p className="flex items-start gap-3 text-sm leading-6 text-blue-100">
            <MapPin size={17} className="mt-0.5 shrink-0 text-red-300" />
            {gereja.alamat}
          </p>
          <p className="flex items-start gap-3 text-sm leading-6 text-blue-100">
            <Phone size={17} className="mt-0.5 shrink-0 text-red-300" />
            {gereja.telepon}
          </p>
          <p className="flex items-start gap-3 text-sm leading-6 text-blue-100">
            <Mail size={17} className="mt-0.5 shrink-0 text-red-300" />
            {gereja.email}
          </p>
        </div>
        <div className="mt-8 border-t border-white/15 pt-5 text-xs text-blue-200">
          <p>© {currentYear} GPdI Sibulele. Bersama melayani Tuhan.</p>
        </div>
      </div>
    </footer>
  );
}
