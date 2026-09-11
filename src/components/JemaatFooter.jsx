import React from "react";
import { Mail, MapPin, Phone, Heart, BookOpen } from "lucide-react";
import { homeData } from "../data/homeData";
import gpdiLogo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#07104f" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const jemaatLinks = [
  { label: "Dashboard", href: "/jemaat/dashboard" },
  { label: "Pengumuman", href: "/jemaat/pengumuman" },
  { label: "Konten Rohani", href: "/jemaat/konten" },
  { label: "Profil Saya", href: "/jemaat/profil" },
];

const socials = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

export default function JemaatFooter() {
  const { gereja } = homeData;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#07104f] text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">

          {/* Kolom 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src={gpdiLogo}
                alt="Logo GPdI"
                className="h-8 w-8 rounded-full bg-white object-contain p-0.5"
              />
              <span className="text-sm font-bold tracking-wide">GPdI Sibulele</span>
            </div>
            <p className="text-xs leading-relaxed text-blue-200/80">
              Selamat datang di ruang jemaat. Temukan pengumuman, konten rohani, dan informasi gereja di sini.
            </p>
            {/* Ayat singkat */}
            <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
              <BookOpen size={12} className="mt-0.5 shrink-0 text-blue-300" />
              <p className="text-[11px] italic leading-relaxed text-blue-200/80">
                "Hendaklah kamu selalu bersukacita dalam Tuhan." — Filipi 4:4
              </p>
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-white/8 text-blue-200 transition hover:bg-white/15 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Menu Jemaat */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Menu Jemaat</p>
            <ul className="flex flex-col gap-2">
              {jemaatLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs text-blue-100/80 transition hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Kontak Gereja</p>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2 text-xs leading-relaxed text-blue-100/80">
                <MapPin size={13} className="mt-0.5 shrink-0 text-red-300" />
                {gereja.alamat}
              </li>
              <li className="flex items-center gap-2 text-xs text-blue-100/80">
                <Phone size={13} className="shrink-0 text-red-300" />
                {gereja.telepon}
              </li>
              <li className="flex items-center gap-2 text-xs text-blue-100/80">
                <Mail size={13} className="shrink-0 text-red-300" />
                {gereja.email}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-1.5 px-6 py-4 sm:flex-row sm:px-10">
          <p className="text-[11px] text-blue-300/70">
            © {currentYear} GPdI Sibulele. Bersama melayani Tuhan.
          </p>
          <p className="flex items-center gap-1 text-[11px] text-blue-300/70">
            Dibuat dengan <Heart size={10} className="fill-red-400 text-red-400" /> untuk jemaat Tuhan
          </p>
        </div>
      </div>
    </footer>
  );
}
