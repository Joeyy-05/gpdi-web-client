import { homeData } from "../data/homeData";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function PublicFooter() {
  const { gereja } = homeData;

  return (
    <footer
      className="bg-[#f7f8fb] px-5 pb-6 pt-4"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-[#07104f] px-6 py-10 text-white shadow-xl shadow-blue-950/10 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              GPdI Jemaat Sibulele
            </p>
            <h3 className="mt-3 max-w-md text-2xl font-extrabold leading-tight sm:text-3xl">
              Bersama melayani, bertumbuh dalam kasih.
            </h3>
            <div className="mt-7 grid gap-3 text-sm text-blue-100 sm:grid-cols-2">
              <p className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-red-300" />
                {gereja.alamat}
              </p>
              <p className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-red-300" />
                {gereja.telepon}
              </p>
              <p className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 shrink-0 text-red-300" />
                {gereja.email}
              </p>
            </div>
          </div>
          <a
            href={`mailto:${gereja.email}`}
            className="group flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0D1282] transition hover:bg-blue-50"
          >
            Hubungi kami{" "}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
        <div className="mt-10 border-t border-white/15 pt-5 text-xs text-blue-200">
          <p>© 2026 GPdI Sibulele. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
