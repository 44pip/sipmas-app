import React, { useState, useEffect } from "react";
import { pengaduanAPI } from "../../services/pengaduanApi";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileAlt, FaTimes } from "react-icons/fa";

export default function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
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

  const handleDetailClick = (item) => {
    setSelectedPengaduan(item);
  };

  const closeModal = () => {
    setSelectedPengaduan(null);
  };

  const pengaduanTerbalas = riwayat.filter((item) => item.status.toLowerCase() === "selesai");
  const pengaduanBelum = riwayat.filter((item) => item.status.toLowerCase() !== "selesai");

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {loading ? (
        <div className="text-center text-gray-500 text-lg animate-pulse">
          Memuat data...
        </div>
      ) : riwayat.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Belum ada pengaduan yang Anda lakukan.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">
            🗂️ Riwayat Pengaduan Anda
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Belum Terbalas</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pengaduanBelum.map((item) => (
                <motion.div
                  key={item.idPengaduan}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {dayjs(item.created_at).format("DD MMMM YYYY")}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-yellow-100 text-yellow-700">
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2 truncate">
                    <FaFileAlt className="text-indigo-400" />
                    {item.judul || "Pengaduan"}
                  </h2>

                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p><strong>Kategori:</strong> {item.kategori}</p>
                    <p><strong>Sub-Kategori:</strong> {item.tag}</p>
                    <p><strong>Jenis:</strong> {item.jenis}</p>
                  </div>

                  <div className="text-right">
                    <button onClick={() => handleDetailClick(item)} className="text-sm text-indigo-600 hover:underline font-medium transition">
                      Lihat Selengkapnya
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sudah Terbalas</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pengaduanTerbalas.map((item) => (
                <motion.div
                  key={item.idPengaduan}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {dayjs(item.created_at).format("DD MMMM YYYY")}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-green-100 text-green-700">
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2 truncate">
                    <FaFileAlt className="text-indigo-400" />
                    {item.judul || "Pengaduan"}
                  </h2>

                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p><strong>Kategori:</strong> {item.kategori}</p>
                    <p><strong>Sub-Kategori:</strong> {item.tag}</p>
                    <p><strong>Jenis:</strong> {item.jenis}</p>
                  </div>

                  <div className="text-right">
                    <button onClick={() => handleDetailClick(item)} className="text-sm text-indigo-600 hover:underline font-medium transition">
                      Lihat Selengkapnya
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Modal Detail Pengaduan */}
      <AnimatePresence>
        {selectedPengaduan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full shadow-2xl relative"
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                <FaTimes size={20} />
              </button>
              <h3 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-2">Detail Pengaduan</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><span className="font-semibold">Tanggal:</span> {dayjs(selectedPengaduan.created_at).format("DD MMMM YYYY")}</p>
                <p><span className="font-semibold">Kategori:</span> {selectedPengaduan.kategori}</p>
                <p><span className="font-semibold">Sub-Kategori:</span> {selectedPengaduan.tag}</p>
                <p><span className="font-semibold">Jenis:</span> {selectedPengaduan.jenis}</p>
                <p><span className="font-semibold">Status:</span> {selectedPengaduan.status}</p>
                <p><span className="font-semibold">Isi Laporan:</span><br />{selectedPengaduan.subject}</p>
                {selectedPengaduan.balasan && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="font-semibold text-indigo-600 mb-1">Balasan Admin:</p>
                    <p className="text-sm text-gray-700">{selectedPengaduan.balasan}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
