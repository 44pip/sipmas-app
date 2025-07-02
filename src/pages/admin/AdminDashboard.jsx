import { HiSpeakerphone } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { userAPI, statistikAPI } from "../../services/userApi";
import { pengaduanAPI } from "../../services/pengaduanApi";
import dayjs from "dayjs";

// Import icons
import { FaUsers, FaUserGraduate } from "react-icons/fa";
import { MdReport, MdOutlineReportProblem } from "react-icons/md";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    totalUser: 0,
    totalMahasiswa: 0,
    totalPengaduan: 0,
    belumDitangani: 0,
  });

  const [pengaduanTerbaru, setPengaduanTerbaru] = useState([]);

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
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchPengaduan();
  }, []);

  return (
  <div className="space-y-8 p-6 md:p-10 bg-gray-50 min-h-screen font-poppins">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-blue-600 font-lato">
        Dashboard Admin
      </h1>
      <p className="text-gray-600 font-montserrat">
        Kelola laporan mahasiswa dengan mudah dan cepat.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <Card
        title="Total Pengguna"
        value={counts.totalUser}
        color="indigo"
        icon={<FaUsers size={28} />}
      />
      <Card
        title="Belum Ditangani"
        value={counts.belumDitangani}
        color="blue"
        icon={<MdOutlineReportProblem size={28} />}
      />
      <Card
        title="Mahasiswa"
        value={counts.totalMahasiswa}
        color="green"
        icon={<FaUserGraduate size={28} />}
      />
      <Card
        title="Total Pengaduan"
        value={counts.totalPengaduan}
        color="red"
        icon={<MdReport size={28} />}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pengaduan Terbaru */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 font-lato">
          <HiSpeakerphone className="text-yellow-400" size={20} />
          Pengaduan Terbaru
        </h3>
        <ul className="space-y-4 text-sm text-gray-700 font-montserrat">
          {pengaduanTerbaru.length === 0 ? (
            <li className="text-gray-400 italic">Belum ada pengaduan</li>
          ) : (
            pengaduanTerbaru.map((item, index) => (
              <li key={index} className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-blue-600 font-semibold font-poppins">
                      {item.kategori || "Tanpa kategori"}
                    </h4>
                    <p className="text-xs text-gray-500 italic mt-1">
                      {item.jenis || "Jenis tidak tersedia"}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-poppins">
                    {item.tag || "Sub-kategori"}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-2 font-montserrat">
                  {dayjs(item.created_at).format("DD MMMM YYYY")}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Statistik */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2 font-lato">
          <BsLightning className="text-orange-500" size={20} />
          Statistik Status Pengaduan
        </h3>
        <div className="space-y-4">
          {[
            { label: "Belum Ditangani", value: counts.belumDitangani, color: "bg-yellow-400" },
            { label: "Selesai", value: counts.totalPengaduan - counts.belumDitangani, color: "bg-green-500" },
            { label: "Total", value: counts.totalPengaduan, color: "bg-blue-600" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1 font-semibold">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${item.color} h-2.5 rounded-full`}
                  style={{
                    width:
                      counts.totalPengaduan > 0
                        ? `${(item.value / counts.totalPengaduan) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

}

function Card({ title, value, color, icon }) {
  const colorMap = {
    indigo: {
      bg: "bg-white",
      icon: "text-black",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
    },
    red: {
      bg: "bg-red-50",
      icon: "text-red-600",
    },
  };

  const style = colorMap[color] || colorMap.indigo;

  return (
    <div
      className={`px-5 py-4 rounded-xl shadow font-poppins border border-black ${style.bg}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium font-montserrat text-black">
          {title}
        </h3>
        <div className={style.icon}>{icon}</div>
      </div>
      <div className="text-3xl font-extrabold font-lato text-black">
        {value}
      </div>
    </div>
  );
}
