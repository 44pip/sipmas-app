import { Link, Outlet, useLocation } from "react-router-dom";

export default function MahasiswaLayout() {
  const location = useLocation();
  const activeClass = "text-blue-600 font-semibold underline underline-offset-8 font-lato";
  const inactiveClass = "text-gray-600 hover:text-blue-600 font-poppins";

  return (
    <div className="min-h-screen bg-blue-50 p-6 font-poppins">
      <div className="max-w-4xl mx-auto">
        
        {/* Logo di atas */}
        <div className="flex justify-center mb-4">
          <img src="/img/logo.png" alt="Logo SIPMAS" className="h-15" />
        </div>

        {/* Navigasi */}
        <div className="flex space-x-8 px-6 mb-0">
          <Link
            to="/formPengaduan"
            className={location.pathname.includes("formPengaduan") ? activeClass : inactiveClass}
          >
            Tambah Pengaduan
          </Link>
          <Link
            to="/pengaduan/riwayat"
            className={location.pathname.includes("riwayat") ? activeClass : inactiveClass}
          >
            Riwayat Pengaduan
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
