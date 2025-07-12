import React, { useEffect, useState } from "react";
import { userAPI, statistikAPI } from "../../services/userApi";
import { pengaduanAPI } from "../../services/pengaduanApi";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../components/Toast";

// Import icons
import { FaUsers, FaUserGraduate, FaChartLine, FaClock, FaArrowRight } from "react-icons/fa";
import { MdReport, MdOutlineReportProblem, MdTrendingUp, MdDashboard } from "react-icons/md";
import { HiSpeakerphone, HiOutlineLightningBolt } from "react-icons/hi";
import { BsLightning, BsGraphUp, BsCalendarCheck } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    totalUser: 0,
    totalMahasiswa: 0,
    totalPengaduan: 0,
    belumDitangani: 0,
  });

  const [pengaduanTerbaru, setPengaduanTerbaru] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const { showError } = useToast();

  const fetchCounts = async () => {
    try {
      const [all, mahasiswa, pengaduan] = await Promise.all([
        userAPI.countAll(),
        userAPI.countByRole("mahasiswa"),
        statistikAPI.countPengaduan(),
      ]);

      const allPengaduan = await pengaduanAPI.fetchAll();
      const belumDitangani = allPengaduan.filter(
        (p) => p.status === "Belum Ditangani"
      ).length;

      setCounts({
        totalUser: all,
        totalMahasiswa: mahasiswa,
        totalPengaduan: pengaduan,
        belumDitangani,
      });
    } catch (err) {
      console.error("❌ Gagal ambil data dashboard:", err);
      showError("Gagal memuat data dashboard");
    }
  };

  const fetchPengaduan = async () => {
    try {
      const allPengaduan = await pengaduanAPI.fetchAll();
      const sorted = allPengaduan
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
      setPengaduanTerbaru(sorted);
    } catch (err) {
      console.error("❌ Gagal ambil pengaduan terbaru:", err);
      showError("Gagal memuat pengaduan terbaru");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchPengaduan();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-secondary-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-secondary-200 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-secondary-200 rounded-xl"></div>
          <div className="h-96 bg-secondary-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 p-4 lg:p-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <MdDashboard className="text-2xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins">
              Dashboard Admin
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 font-montserrat text-lg leading-relaxed max-w-2xl"
          >
            Kelola pengaduan mahasiswa dengan mudah dan efisien. Pantau statistik real-time dan tangani laporan dengan cepat.
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Pengguna"
          value={counts.totalUser}
          change="+12%"
          color="primary"
          icon={<FaUsers size={24} />}
          onClick={() => navigate("/users")}
          delay={0.1}
          selected={selectedCard === 'users'}
          onHover={() => setSelectedCard('users')}
          onLeave={() => setSelectedCard(null)}
        />
        <StatsCard
          title="Belum Ditangani"
          value={counts.belumDitangani}
          change={counts.belumDitangani > 0 ? "Perlu Perhatian" : "Aman"}
          color="secondary"
          icon={<MdOutlineReportProblem size={24} />}
          onClick={() => navigate("/pengaduan?status=Belum Ditangani")}
          delay={0.2}
          selected={selectedCard === 'pending'}
          onHover={() => setSelectedCard('pending')}
          onLeave={() => setSelectedCard(null)}
        />
        <StatsCard
          title="Mahasiswa"
          value={counts.totalMahasiswa}
          change="+5%"
          color="primary"
          icon={<FaUserGraduate size={24} />}
          onClick={() => navigate("/users?role=mahasiswa")}
          delay={0.3}
          selected={selectedCard === 'students'}
          onHover={() => setSelectedCard('students')}
          onLeave={() => setSelectedCard(null)}
        />
        <StatsCard
          title="Total Pengaduan"
          value={counts.totalPengaduan}
          change="+8%"
          color="primary"
          icon={<MdReport size={24} />}
          onClick={() => navigate("/pengaduan")}
          delay={0.4}
          selected={selectedCard === 'reports'}
          onHover={() => setSelectedCard('reports')}
          onLeave={() => setSelectedCard(null)}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 font-poppins">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <HiSpeakerphone className="text-blue-600" size={24} />
                </div>
                Pengaduan Terbaru
              </h3>
              <button
                onClick={() => navigate("/pengaduan")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                Lihat Semua
                <FaArrowRight size={12} />
              </button>
            </div>
          </div>
          <div className="p-6">
            {pengaduanTerbaru.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 font-montserrat">Belum ada pengaduan terbaru</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {pengaduanTerbaru.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 group"
                      onClick={() => navigate(`/detailPengaduan/${item.idPengaduan}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-800 font-poppins group-hover:text-blue-700 transition-colors">
                          {item.kategori || "Tanpa kategori"}
                        </h4>
                        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                          {item.tag || "General"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 font-montserrat">
                        {item.jenis || "Jenis tidak tersedia"}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {item.nama || "Anonymous"}
                        </span>
                        <span className="flex items-center gap-1">
                          <BsCalendarCheck size={10} />
                          {dayjs(item.created_at).format("DD MMM YYYY")}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 font-poppins">
              <div className="p-3 bg-purple-100 rounded-2xl">
                <IoStatsChart className="text-purple-600" size={24} />
              </div>
              Statistik Pengaduan
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[
                {
                  label: "Belum Ditangani",
                  value: counts.belumDitangani,
                  total: counts.totalPengaduan,
                  color: "bg-red-500",
                  bgColor: "bg-red-100",
                  icon: <MdOutlineReportProblem className="text-red-500" />
                },
                {
                  label: "Selesai",
                  value: counts.totalPengaduan - counts.belumDitangani,
                  total: counts.totalPengaduan,
                  color: "bg-green-500",
                  bgColor: "bg-green-100",
                  icon: <BsGraphUp className="text-green-500" />
                },
                {
                  label: "Total Pengaduan",
                  value: counts.totalPengaduan,
                  total: counts.totalPengaduan,
                  color: "bg-blue-500",
                  bgColor: "bg-blue-100",
                  icon: <HiOutlineLightningBolt className="text-blue-500" />
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-semibold text-gray-700 font-poppins">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {item.value}
                    </span>
                  </div>
                  <div className={`w-full ${item.bgColor} rounded-full h-3 overflow-hidden`}>
                    <motion.div
                      className={`${item.color} h-3 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{
                        width: item.total > 0 ? `${(item.value / item.total) * 100}%` : "0%",
                      }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-montserrat flex justify-between">
                    <span>{item.total > 0 ? `${Math.round((item.value / item.total) * 100)}%` : "0%"} dari total</span>
                    <span>{item.value} dari {item.total}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, color, icon, onClick, delay, selected, onHover, onLeave }) {
  const colorClasses = {
    primary: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
      iconBg: "bg-white/20",
      changeColor: "text-blue-100",
      shadow: "shadow-blue-500/25"
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
      iconBg: "bg-white/20",
      changeColor: "text-blue-100",
      shadow: "shadow-blue-500/25"
    },
    secondary: {
      bg: "bg-gradient-to-br from-red-500 to-red-600",
      hover: "hover:from-red-600 hover:to-red-700",
      iconBg: "bg-white/20",
      changeColor: "text-red-100",
      shadow: "shadow-red-500/25"
    },
  };

  const classes = colorClasses[color] || colorClasses.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: selected ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 25px -3px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`${classes.bg} ${classes.hover} text-white p-6 rounded-3xl cursor-pointer group overflow-hidden relative transition-all duration-300 ${selected ? 'ring-4 ring-white/30' : ''}`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className={`p-3 ${classes.iconBg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: 5 }}
          >
            {icon}
          </motion.div>
          <motion.div
            animate={{ rotate: selected ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <MdTrendingUp className="text-white/60 group-hover:text-white/80 transition-colors" size={20} />
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-white/90 text-sm font-medium font-montserrat">
            {title}
          </h3>
          <motion.div 
            className="text-3xl font-bold font-poppins"
            animate={{ scale: selected ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {value.toLocaleString()}
          </motion.div>
          <div className={`text-xs ${classes.changeColor} font-medium font-montserrat`}>
            {change}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
