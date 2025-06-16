import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-600">
          Dashboard Mahasiswa
        </h1>
        <p className="text-gray-600">
          Selamat datang kembali, semoga harimu menyenangkan!
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-sm text-gray-500 mb-1">Total Pengaduan</h2>
          <p className="text-2xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-sm text-gray-500 mb-1">Diproses</h2>
          <p className="text-2xl font-bold text-yellow-500">8</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-sm text-gray-500 mb-1">Selesai</h2>
          <p className="text-2xl font-bold text-green-500">16</p>
        </div>
      </section>

      <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Pengaduan Terbaru
        </h2>
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-2">Nama</th>
              <th className="py-2">Kategori</th>
              <th className="py-2">Status</th>
              <th className="py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-gray-700 border-b hover:bg-gray-50">
              <td className="py-2">Dinda</td>
              <td className="py-2">Akademik</td>
              <td className="py-2 text-yellow-500 font-medium">Diproses</td>
              <td className="py-2">14 Juni 2025</td>
            </tr>
            <tr className="text-sm text-gray-700 border-b hover:bg-gray-50">
              <td className="py-2">Rafi</td>
              <td className="py-2">Non-Akademik</td>
              <td className="py-2 text-green-500 font-medium">Selesai</td>
              <td className="py-2">13 Juni 2025</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
