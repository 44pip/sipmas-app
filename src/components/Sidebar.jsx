import React from "react";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between min-h-screen shadow-lg">
      {/* Bagian atas */}
      <div>
        <div className="p-6 text-center border-b border-blue-700">
          <div className="text-3xl font-bold tracking-wide">📣 SIPMAS</div>
          <div className="text-xs text-blue-200 mt-1 italic">
            Sistem Pengaduan Ma
          </div>
          <div className="w-10 h-1 bg-blue-400 mx-auto mt-3 rounded-full shadow-inner" />
        </div>
        <SidebarMenu />
      </div>

      {/* Bagian bawah */}
      <div className="p-4 border-t border-blue-700 text-sm text-blue-200">
        <div className="mb-2">Versi 1.0.0</div>
        <button className="w-full text-left hover:text-white transition-all">
          🔒 Keluar
        </button>
      </div>
    </aside>
  );
}
