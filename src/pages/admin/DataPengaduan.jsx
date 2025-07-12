import { BsInfoCircle, BsSearch, BsFilter } from "react-icons/bs";
import { MdOutlineDeleteOutline, MdRefresh, MdDownload } from "react-icons/md";
import { FaEye, FaEyeSlash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pengaduanAPI } from "../../services/pengaduanApi";
import { useToast } from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function DataPengaduan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [deleteDialog, setDeleteDialog] = useState({ show: false, id: null });

  const [filters, setFilters] = useState({
    kategori: "",
    jenis: "",
    status: "",
    tanggalDari: "",
    tanggalSampai: "",
  });

  const [kategoriList, setKategoriList] = useState([]);
  const [jenisList, setJenisList] = useState([]);
  const { showSuccess, showError, showInfo } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await pengaduanAPI.fetchAll();
      setPengaduanList(data);
      setFilteredList(data);

      // Extract kategori dan jenis unik
      const kategoriSet = new Set();
      const jenisSet = new Set();
      data.forEach((item) => {
        if (item.kategori) kategoriSet.add(item.kategori);
        if (item.jenis) jenisSet.add(item.jenis);
      });

      setKategoriList([...kategoriSet]);
      setJenisList([...jenisSet]);
    } catch (error) {
      console.error("❌ Gagal mengambil data pengaduan:", error);
      showError("Gagal memuat data pengaduan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDeleteDialog({ show: true, id });
  };

  const confirmDelete = async () => {
    try {
      await pengaduanAPI.deletePengaduan(deleteDialog.id);
      showSuccess("Pengaduan berhasil dihapus");
      fetchData();
    } catch (error) {
      console.error("❌ Gagal menghapus pengaduan:", error);
      showError("Gagal menghapus pengaduan");
    } finally {
      setDeleteDialog({ show: false, id: null });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      kategori: "",
      jenis: "",
      status: "",
      tanggalDari: "",
      tanggalSampai: "",
    });
    setSortConfig({ key: null, direction: 'asc' });
    setFilteredList(pengaduanList);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    const filtered = pengaduanList.filter((item) => {
      const { kategori, jenis, status, tanggalDari, tanggalSampai } = filters;

      const matchKategori = kategori ? item.kategori === kategori : true;
      const matchJenis = jenis ? item.jenis === jenis : true;
      const matchStatus = status ? item.status === status : true;

      const createdAt = new Date(item.created_at);
      const matchTanggalDari = tanggalDari ? createdAt >= new Date(tanggalDari) : true;
      const matchTanggalSampai = tanggalSampai ? createdAt <= new Date(tanggalSampai) : true;

      return matchKategori && matchJenis && matchStatus && matchTanggalDari && matchTanggalSampai;
    });

    const sortedData = getSortedData(filtered);
    setFilteredList(sortedData);
  }, [filters, pengaduanList, sortConfig]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <FaSort className="text-gray-400" size={12} />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-blue-600" size={12} /> : 
      <FaSortDown className="text-blue-600" size={12} />;
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
    <div className="p-4 md:p-8 font-poppins bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
          Daftar Pengaduan Mahasiswa
        </h1>
        <p className="text-gray-600">Kelola dan pantau semua pengaduan mahasiswa</p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BsFilter className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Filter & Pencarian</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
              >
                {showFilters ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                {showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <MdRefresh size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <select
                  name="kategori"
                  value={filters.kategori}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Semua Kategori</option>
                  {kategoriList.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <select
                  name="jenis"
                  value={filters.jenis}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Semua Jenis</option>
                  {jenisList.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Semua Status</option>
                  <option value="Belum Ditangani">Belum Ditangani</option>
                  <option value="Selesai">Selesai</option>
                </select>

                <input
                  type="date"
                  name="tanggalDari"
                  value={filters.tanggalDari}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />

                <input
                  type="date"
                  name="tanggalSampai"
                  value={filters.tanggalSampai}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Menampilkan <strong>{filteredList.length}</strong> dari <strong>{pengaduanList.length}</strong> pengaduan
          </span>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
        >
          <MdRefresh size={16} />
          Refresh Data
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {filteredList.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BsSearch className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tidak ada pengaduan ditemukan</h3>
            <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('idPengaduan')}>
                    <div className="flex items-center gap-2">
                      #
                      <SortIcon columnKey="idPengaduan" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('nama')}>
                    <div className="flex items-center gap-2">
                      Nama
                      <SortIcon columnKey="nama" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('kelas')}>
                    <div className="flex items-center gap-2">
                      Kelas
                      <SortIcon columnKey="kelas" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('kategori')}>
                    <div className="flex items-center gap-2">
                      Kategori
                      <SortIcon columnKey="kategori" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('jenis')}>
                    <div className="flex items-center gap-2">
                      Jenis
                      <SortIcon columnKey="jenis" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-2">
                      Status
                      <SortIcon columnKey="status" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => handleSort('created_at')}>
                    <div className="flex items-center gap-2">
                      Tanggal
                      <SortIcon columnKey="created_at" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <AnimatePresence>
                  {filteredList.map((item, index) => (
                    <motion.tr
                      key={item.idPengaduan}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {item.nama.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-gray-900 font-medium">{item.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.kelas}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.jenis}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(item.created_at).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/detailPengaduan/${item.idPengaduan}`}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <BsInfoCircle size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.idPengaduan)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <MdOutlineDeleteOutline size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.show}
        onClose={() => setDeleteDialog({ show: false, id: null })}
        onConfirm={confirmDelete}
        title="Konfirmasi Hapus"
        message="Apakah Anda yakin ingin menghapus pengaduan ini? Tindakan ini tidak dapat dibatalkan."
        type="warning"
        confirmText="Hapus"
        cancelText="Batal"
        confirmButtonColor="danger"
      />
    </div>
  );
}
