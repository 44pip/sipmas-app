import { AiOutlineUserDelete } from "react-icons/ai";
import { FaUserShield, FaUserGraduate, FaSearch, FaFilter } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useToast } from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  Prefer: "return=representation",
};

export default function UserPage() {
  const [adminList, setAdminList] = useState([]);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("mahasiswa");
  const [deleteDialog, setDeleteDialog] = useState({ show: false, id: null, type: null });
  const { showSuccess, showError } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const resAdmin = await axios.get(
        `${BASE_URL}/user?role=eq.admin&select=*`,
        { headers }
      );
      const resMahasiswa = await axios.get(
        `${BASE_URL}/user?role=eq.mahasiswa&select=*`,
        { headers }
      );
      setAdminList(resAdmin.data);
      setMahasiswaList(resMahasiswa.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data user:", err);
      showError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (idUser, type) => {
    setDeleteDialog({ show: true, id: idUser, type });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/user?idUser=eq.${deleteDialog.id}`, { headers });
      showSuccess("Pengguna berhasil dihapus");
      fetchUsers(); // refresh data
    } catch (err) {
      console.error("❌ Gagal menghapus:", err);
      showError("Gagal menghapus pengguna");
    } finally {
      setDeleteDialog({ show: false, id: null, type: null });
    }
  };

  const filteredAdminList = adminList.filter(user => 
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMahasiswaList = mahasiswaList.filter(user => 
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = (data, type) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-blue-100 rounded-2xl"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
            >
              {type === "admin" ? (
                <FaUserShield className="text-blue-600" size={24} />
              ) : (
                <FaUserGraduate className="text-blue-600" size={24} />
              )}
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 font-poppins">
                {type === "admin" ? "Daftar Admin" : "Daftar Mahasiswa"}
              </h2>
              <p className="text-gray-600 font-montserrat">
                {data.length} {type === "admin" ? "administrator" : "mahasiswa"} terdaftar
              </p>
            </div>
          </div>
          <motion.button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiRefreshCw size={16} />
            </motion.div>
            Refresh
          </motion.button>
        </div>
      </div>

      {data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-12 text-center"
        >
          <motion.div 
            className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {type === "admin" ? (
              <FaUserShield className="text-gray-400" size={32} />
            ) : (
              <FaUserGraduate className="text-gray-400" size={32} />
            )}
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada {type} ditemukan</h3>
          <p className="text-gray-500 font-montserrat">Belum ada data {type} yang terdaftar dalam sistem</p>
        </motion.div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm font-montserrat">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr className="text-left">
                  <th className="px-8 py-6 text-gray-700 font-semibold uppercase tracking-wider">#</th>
                  <th className="px-8 py-6 text-gray-700 font-semibold uppercase tracking-wider">Informasi Pengguna</th>
                  <th className="px-8 py-6 text-gray-700 font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-8 py-6 text-gray-700 font-semibold uppercase text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {data.map((user, index) => (
                    <motion.tr
                      key={user.idUser}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="hover:bg-blue-50 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)"
                      }}
                    >
                      <td className="px-8 py-6 text-gray-700 font-semibold">{index + 1}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                            whileHover={{ 
                              scale: 1.1,
                              rotate: [0, 10, -10, 0],
                              transition: { duration: 0.6 }
                            }}
                          >
                            {user.nama.charAt(0).toUpperCase()}
                          </motion.div>
                          <div>
                            <div className="text-gray-900 font-semibold text-lg">{user.nama}</div>
                            <div className="text-gray-500 text-sm">ID: {user.idUser}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-gray-700">{user.email}</td>
                      <td className="px-8 py-6 text-center">
                        <motion.button
                          onClick={() => handleDelete(user.idUser, type)}
                          className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all duration-300"
                          title="Hapus pengguna"
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25 
                          }}
                        >
                          <AiOutlineUserDelete size={20} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            <AnimatePresence>
              {data.map((user, index) => (
                <motion.div
                  key={user.idUser}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="p-6 hover:bg-blue-50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.6 }
                        }}
                      >
                        {user.nama.charAt(0).toUpperCase()}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 font-semibold text-lg truncate">{user.nama}</div>
                        <div className="text-gray-600 text-sm truncate">{user.email}</div>
                        <div className="text-gray-500 text-xs">ID: {user.idUser}</div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleDelete(user.idUser, type)}
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all duration-300 ml-4"
                      title="Hapus pengguna"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }}
                    >
                      <AiOutlineUserDelete size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </motion.div>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 xl:p-8 font-poppins bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
          Manajemen Pengguna
        </h1>
        <p className="text-gray-600">Kelola pengguna sistem SIPMAS - admin dan mahasiswa</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="mb-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <motion.div 
              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FaSearch className="h-5 w-5 text-gray-400" />
            </motion.div>
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base"
            />
          </div>
          <motion.div 
            className="flex bg-gray-100 rounded-2xl p-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={() => setActiveTab("admin")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "admin"
                  ? "bg-white text-blue-700 shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              whileHover={{ 
                scale: activeTab === "admin" ? 1 : 1.05,
                boxShadow: activeTab === "admin" ? "0 4px 12px rgba(59, 130, 246, 0.15)" : "none"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              Admin ({filteredAdminList.length})
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("mahasiswa")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "mahasiswa"
                  ? "bg-white text-blue-700 shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              whileHover={{ 
                scale: activeTab === "mahasiswa" ? 1 : 1.05,
                boxShadow: activeTab === "mahasiswa" ? "0 4px 12px rgba(59, 130, 246, 0.15)" : "none"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              Mahasiswa ({filteredMahasiswaList.length})
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* User Tables */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderTable(filteredAdminList, "admin")}
            </motion.div>
          )}
          {activeTab === "mahasiswa" && (
            <motion.div
              key="mahasiswa"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderTable(filteredMahasiswaList, "mahasiswa")}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.show}
        onClose={() => setDeleteDialog({ show: false, id: null, type: null })}
        onConfirm={confirmDelete}
        title="Konfirmasi Hapus Pengguna"
        message={`Apakah Anda yakin ingin menghapus ${deleteDialog.type === 'admin' ? 'administrator' : 'mahasiswa'} ini? Tindakan ini tidak dapat dibatalkan.`}
        type="warning"
        confirmText="Hapus"
        cancelText="Batal"
        confirmButtonColor="danger"
      />
    </div>
  );
}
