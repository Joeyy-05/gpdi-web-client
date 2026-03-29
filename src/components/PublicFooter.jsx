export default function PublicFooter() {
  return (
    <footer
      className="bg-[#F3F3F3] px-5 pb-6 pt-8"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto flex min-h-[270px] w-full max-w-[1385px] flex-col items-center bg-[#E9E7E7] px-6 pt-10 text-center">
          <h3 className="text-[22px] font-bold text-black">GPdI Sibulele</h3>

          <p className="mt-4 text-[20px] font-bold text-black">
            Jalan Contoh No.123, Kota A, Provinsi A, 12345
          </p>

          <div className="mt-4 flex items-center gap-10">
            <a
              href="#"
              className="flex h-[42px] w-[42px] items-center justify-center bg-[#3b5998] text-[28px] font-bold text-white"
            >
              f
            </a>

            <a
              href="#"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-[14px] font-bold text-white"
            >
              IG
            </a>

            <a
              href="#"
              className="flex h-[42px] w-[62px] items-center justify-center rounded-[10px] bg-[#ff0000] text-[18px] font-bold text-white"
            >
              ▶
            </a>
          </div>

          <p className="mt-4 text-[18px] font-bold text-black">
            Copyright © 2023
          </p>
        </div>

        <div className="pt-8 text-center">
          <p className="text-[20px] font-normal text-black">
            © 2026 GPdI Jemaat Sibulele. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}