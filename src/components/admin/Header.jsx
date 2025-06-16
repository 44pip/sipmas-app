import React, { useEffect, useState } from "react";

export default function Header() {
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
    setTanggal(formatter.format(new Date()));
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Kiri: Judul */}
        <h1 className="text-xl font-semibold text-blue-700 font-montserrat">
          Manajemen Pengaduan Mahasiswa
        </h1>

        {/* Tengah: Tanggal */}
        <div className="text-sm text-gray-500 italic">{tanggal}</div>

        {/* Kanan: Profil */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 italic">Selamat datang, Admin</span>
          <img
            src="https://avatar.iran.liara.run/public/24"
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full ring-2 ring-blue-200"
          />
        </div>
      </div>
    </header>
  );
}
