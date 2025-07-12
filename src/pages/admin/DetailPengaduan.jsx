import { BsInfoCircle, BsCheckCircle, BsClock, BsExclamationTriangle } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pengaduanAPI } from "../../services/pengaduanApi";
import { useToast } from "../../components/Toast";
import { FaUser, FaFileAlt, FaCalendarAlt, FaTag, FaComments, FaPaperPlane } from "react-icons/fa";

export default function DetailPengaduan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useToast();

  const [data, setData] = useState(null);
  const [balasan, setBalasan] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const all = await pengaduanAPI.fetchAll();
        const item = all.find((p) => p.idPengaduan === parseInt(id));
        if (item) {
          setData(item);
          setBalasan(item.balasan || "");
          setStatus(item.status || "Belum Ditangani");
        } else {
          showError("Pengaduan tidak ditemukan");
          navigate("/pengaduan");
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
        showError("Gagal memuat detail pengaduan");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (balasan.trim().length < 10) {
      showError("Balasan minimal harus 10 karakter untuk memberikan tanggapan yang bermakna.");
      return;
    }

    setSubmitting(true);
    try {
      await pengaduanAPI.updatePengaduan(data.idPengaduan, {
        balasan,
        status,
      });
      showSuccess("Tanggapan berhasil dikirim dan status pengaduan telah diperbarui!");
      setTimeout(() => {
        navigate("/pengaduan");
      }, 1500);
    } catch (error) {
      showError("Gagal mengirim tanggapan. Silakan coba lagi dalam beberapa saat.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Memuat detail pengaduan...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800 border-green-200";
      case "Diproses":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Selesai":
        return <BsCheckCircle className="text-green-600" />;
      case "Diproses":
        return <BsClock className="text-yellow-600" />;
      default:
        return <BsExclamationTriangle className="text-red-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-poppins p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col border border-gray-200"
      >
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-6 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BsInfoCircle className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins">Detail Pengaduan Mahasiswa</h1>
              <p className="text-blue-100 text-sm font-montserrat">Kelola dan tanggapi pengaduan dengan profesional</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/pengaduan")}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Tutup
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-8 space-y-8">
            {/* Student Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 font-poppins flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FaUser className="text-blue-600" size={20} />
                </div>
                Informasi Mahasiswa
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm">
                  <span className="text-gray-600 font-medium block mb-2 text-sm">Nama Lengkap</span>
                  <span className="text-gray-900 font-semibold text-lg">{data.nama}</span>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm">
                  <span className="text-gray-600 font-medium block mb-2 text-sm">NIM</span>
                  <span className="text-gray-900 font-semibold text-lg">{data.nim || 'N/A'}</span>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm">
                  <span className="text-gray-600 font-medium block mb-2 text-sm">Kelas</span>
                  <span className="text-gray-900 font-semibold text-lg">{data.kelas}</span>
                </div>
              </div>
            </motion.div>

            {/* Complaint Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 font-poppins flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <FaFileAlt className="text-purple-600" size={20} />
                </div>
                Detail Pengaduan
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTag className="text-gray-500" size={14} />
                    <span className="text-gray-600 font-medium text-sm">Kategori</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{data.kategori}</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaFileAlt className="text-gray-500" size={14} />
                    <span className="text-gray-600 font-medium text-sm">Jenis</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{data.jenis}</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BsInfoCircle className="text-gray-500" size={14} />
                    <span className="text-gray-600 font-medium text-sm">Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.status)}
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(data.status)}`}>
                      {data.status}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTag className="text-gray-500" size={14} />
                    <span className="text-gray-600 font-medium text-sm">Tag</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{data.tag || 'General'}</span>
                </div>
              </div>

              {data.subject && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaComments className="text-gray-500" size={16} />
                    <span className="text-gray-700 font-medium">Isi Pengaduan</span>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-900 leading-relaxed text-base">{data.subject}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaCalendarAlt className="text-gray-400" size={14} />
                <span className="font-medium">
                  Dibuat pada: {new Date(data.created_at).toLocaleDateString("id-ID", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </motion.div>

            {/* Admin Response Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 font-poppins flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <FaComments className="text-green-600" size={20} />
                </div>
                Tanggapan Admin
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Balasan untuk Mahasiswa
                  </label>
                  <textarea
                    value={balasan}
                    onChange={(e) => setBalasan(e.target.value)}
                    rows="6"
                    placeholder="Tulis balasan pengaduan di sini... Berikan penjelasan yang jelas dan solusi yang konstruktif."
                    className="w-full border border-gray-300 rounded-2xl px-6 py-4 resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base bg-white shadow-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">Minimal 10 karakter untuk memberikan balasan yang bermakna</p>
                    <span className={`text-xs ${balasan.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                      {balasan.length}/10 karakter
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Update Status Pengaduan
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base bg-white shadow-sm"
                  >
                    <option value="Belum Ditangani">🔴 Belum Ditangani</option>
                    <option value="Diproses">🟡 Sedang Diproses</option>
                    <option value="Selesai">🟢 Selesai Ditangani</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">Status akan terlihat oleh mahasiswa yang mengajukan pengaduan</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:justify-end pt-6 border-t border-gray-200"
            >
              <button
                onClick={() => navigate("/pengaduan")}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-3 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                disabled={balasan.trim().length < 10 || submitting}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={16} />
                    <span>Kirim Tanggapan</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
