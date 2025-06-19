import { IoIosLock } from "react-icons/io";
import { BiLock } from "react-icons/bi";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from "react-router-dom";
import { HiSpeakerphone } from "react-icons/hi"; // 📣
import { FiLogOut } from "react-icons/fi"; // 🔒

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between min-h-screen shadow-lg">
      {/* Bagian atas */}
      <div>
        <div className="p-6 text-center border-b border-blue-700">
          <div className="flex items-center justify-center gap-2 text-3xl font-poppins font-extrabold tracking-wide">
            <HiSpeakerphone className="text-yellow-400" />
            SIPMAS
          </div>
          <div className="text-xs font-barlow text-blue-200 mt-1 italic">
            Sistem Pengaduan Mahasiswa
          </div>
          <div className="w-10 h-1 bg-blue-400 mx-auto mt-3 rounded-full shadow-inner" />
        </div>
        <SidebarMenu />
      </div>

      {/* Bagian bawah */}
      <div className="p-4 border-t border-blue-700 text-sm font-barlow text-blue-200">
        <div className="mb-2">Versi 1.0.0</div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 hover:text-white transition-all"
        >
          <IoIosLock size={20} className="text-yellow-400" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
