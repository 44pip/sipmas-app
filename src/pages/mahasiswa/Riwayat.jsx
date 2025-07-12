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
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
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
                    <span className="text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-blue-100 text-blue-700">
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2 truncate">
                    <FaFileAlt className="text-blue-400" />
                    {item.judul || "Pengaduan"}
                  </h2>

                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p><strong>Kategori:</strong> {item.kategori}</p>
                    <p><strong>Sub-Kategori:</strong> {item.tag}</p>
                    <p><strong>Jenis:</strong> {item.jenis}</p>
                  </div>

                  <div className="text-right">
                    <button onClick={() => handleDetailClick(item)} className="text-sm text-blue-600 hover:underline font-medium transition">
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
                    <span className="text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-blue-100 text-blue-700">
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2 truncate">
                    <FaFileAlt className="text-blue-400" />
                    {item.judul || "Pengaduan"}
                  </h2>

                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p><strong>Kategori:</strong> {item.kategori}</p>
                    <p><strong>Sub-Kategori:</strong> {item.tag}</p>
                    <p><strong>Jenis:</strong> {item.jenis}</p>
                  </div>

                  <div className="text-right">
                    <button onClick={() => handleDetailClick(item)} className="text-sm text-blue-600 hover:underline font-medium transition">
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
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl relative w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
              {/* Header - Fixed */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-2xl font-bold text-blue-700">Detail Pengaduan</h3>
                <button 
                  onClick={closeModal} 
                  className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4 text-gray-700 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-semibold text-gray-600">Tanggal:</span>
                      <p className="text-gray-900 mt-1">{dayjs(selectedPengaduan.created_at).format("DD MMMM YYYY")}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-semibold text-gray-600">Status:</span>
                      <p className="text-gray-900 mt-1">{selectedPengaduan.status}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-semibold text-gray-600">Kategori:</span>
                      <p className="text-gray-900 mt-1">{selectedPengaduan.kategori}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-semibold text-gray-600">Sub-Kategori:</span>
                      <p className="text-gray-900 mt-1">{selectedPengaduan.tag}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <span className="font-semibold text-gray-600">Jenis:</span>
                      <p className="text-gray-900 mt-1">{selectedPengaduan.jenis}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="font-semibold text-gray-600">Isi Laporan:</span>
                    <p className="text-gray-900 mt-2 leading-relaxed">{selectedPengaduan.subject}</p>
                  </div>
                  
                  {selectedPengaduan.balasan && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="font-semibold text-blue-600 mb-2">Balasan Admin:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedPengaduan.balasan}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
