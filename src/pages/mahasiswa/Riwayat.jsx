import React, { useState, useEffect } from "react";
import { pengaduanAPI } from "../../services/pengaduanApi";
import dayjs from "dayjs";

export default function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        if (!user || !user.idUser) return;
        const data = await pengaduanAPI.fetchByUserId(user.idUser);
        setRiwayat(data);
      } catch (error) {
        console.error("Gagal mengambil riwayat:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRiwayat();
  }, [user]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
    {loading ? (
      <div className="text-center text-gray-500 text-lg animate-pulse">Memuat data...</div>
    ) : riwayat.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">Belum ada pengaduan yang Anda lakukan.</div>
    ) : (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">Riwayat Pengaduan Anda</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {riwayat.map((item) => (
            <div
              key={item.idPengaduan}
              className="bg-white shadow-xl rounded-xl p-6 border-t-4 border-blue-500 transition hover:shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{dayjs(item.created_at).format("DD MMMM YYYY")}</span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.status.toLowerCase() === "selesai"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-blue-700 mb-2 truncate">
                {item.judul || "Pengaduan"}
              </h2>

              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p><strong>Kategori:</strong> {item.kategori}</p>
                <p><strong>Sub-Kategori:</strong> {item.sub_kategori}</p>
                <p><strong>Jenis:</strong> {item.jenis}</p>
              </div>

              <div className="mt-3">
                <button className="text-sm text-blue-600 hover:underline transition">Lihat Detail</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
}
