import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function MahasiswaLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [namaUser, setNamaUser] = useState("");

  const activeClass = "text-blue-600 font-semibold underline underline-offset-8 font-barlow";
  const inactiveClass = "text-gray-600 hover:text-blue-600 font-barlow";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      setNamaUser(user.nama || "User");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-50 p-6 font-poppins">
      <div className="max-w-4xl mx-auto">

        {/* Header Atas */}
        <div className="flex justify-between items-center mb-4 px-2">

          {/* Profil + Nama */}
          <div className="flex items-center space-x-2 px-4 py-1 rounded-full bg-transparent shadow-sm">
            <FaUserCircle className="text-biru" size={24} />
            <p className="text-sm font-semibold text-teks font-montserrat">
              Halo, <span className="text-biru font-bold">{namaUser}</span>
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <img src="/img/logo.png" alt="Logo SIPMAS" className="h-12" />
          </div>

          {/* Logout Icon */}
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-merah transition duration-200"
            title="Logout"
          >
            <FiLogOut size={22} />
          </button>
        </div>

        {/* Navigasi */}
        <div className="flex space-x-8 px-6 mb-4 justify-center">
          <Link
            to="/formPengaduan"
            className={location.pathname.includes("formPengaduan") ? activeClass : inactiveClass}
          >
            Tambah Pengaduan
          </Link>
          <Link
            to="/riwayat"
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
