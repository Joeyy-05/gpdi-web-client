export default function JemaatFooter() {
  return (
    <footer className="w-full border-t border-gray-300 bg-[#EDEDED] px-6 py-4">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 md:flex-row md:items-start">

        {/* Left */}
        <div>
          <p className="text-[14px] font-semibold text-black">
            Sistem Informasi GPdI Jemaat Sibulele
          </p>
          <p className="text-[13px] text-gray-700">
            Versi Sistem: versi
          </p>
          <p className="text-[13px] text-gray-700">
            Tahun: tahun
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-1 text-[13px] text-gray-800 md:items-end">
          <a href="#" className="hover:underline">
            Panduan Penggunaan
          </a>
          <a href="#" className="hover:underline">
            Hubungi Administrator
          </a>
          <a href="#" className="hover:underline">
            Kebijakan Privasi Internal
          </a>
        </div>

      </div>
    </footer>
  );
}