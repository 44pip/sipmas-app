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
    <div className="min-h-screen bg-blue-50 p-6">
      {loading ? (
        <p className="text-center text-gray-600">Memuat data...</p>
      ) : riwayat.length === 0 ? (
        <p className="text-center text-gray-600">
          Belum ada pengaduan yang Anda lakukan.
        </p>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Riwayat Pengaduan Anda
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {riwayat.map((item) => (
              <div
                key={item.idPengaduan}
                className="bg-white shadow-md rounded-xl p-5 border border-blue-400"
              >
                <div className="text-sm text-gray-500 mb-1">
                  {dayjs(item.created_at).format("DD MMMM YYYY")}
                </div>
                <h2 className="text-lg font-bold text-blue-700 mb-2">
                  {item.judul}
                </h2>
                <p className="text-sm text-gray-800 mb-3">
                  <strong>Kategori:</strong> {item.kategori} <br />
                  <strong>Sub-Kategori:</strong> {item.sub_kategori} <br />
                  <strong>Jenis:</strong> {item.jenis}
                </p>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "selesai"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Status: {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
