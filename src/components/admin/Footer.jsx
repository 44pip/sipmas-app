import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-0">
      <div className="flex flex-col items-center justify-center text-sm font-barlow text-teksSamping space-y-0">
        {/* Logo */}
        <img
          src="/img/logo.png"
          alt="Logo SIPMAS"
          className="h-7" // atur ukuran logo sesuai keinginan
        />

        {/* Teks */}
        <p>© {new Date().getFullYear()} Sistem Pengaduan Mahasiswa.</p>
      </div>
    </footer>
  );
}
