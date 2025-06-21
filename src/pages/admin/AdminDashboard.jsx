import { HiSpeakerphone } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { userAPI, statistikAPI } from "../../services/userApi";
import { pengaduanAPI } from "../../services/pengaduanApi";
import dayjs from "dayjs";

// Import icons
import { FaUsers, FaUserShield, FaUserGraduate } from "react-icons/fa";
import { MdReport } from "react-icons/md";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    totalUser: 0,
    totalAdmin: 0,
    totalMahasiswa: 0,
    totalPengaduan: 0,
  });

  const fetchCounts = async () => {
    try {
      const [all, admin, mahasiswa, pengaduan] = await Promise.all([
        userAPI.countAll(),
        userAPI.countByRole("admin"),
        userAPI.countByRole("mahasiswa"),
        statistikAPI.countPengaduan(),
      ]);

      setCounts({
        totalUser: all,
        totalAdmin: admin,
        totalMahasiswa: mahasiswa,
        totalPengaduan: pengaduan,
      });
    } catch (err) {
      console.error("❌ Gagal ambil data dashboard:", err);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchPengaduan();
  }, []);

  const [pengaduanTerbaru, setPengaduanTerbaru] = useState([]);

  const fetchPengaduan = async () => {
    try {
      const allPengaduan = await pengaduanAPI.fetchAll(); // ambil semua
      const sorted = allPengaduan
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // urutkan terbaru
        .slice(0, 7); // ambil 7 teratas

      setPengaduanTerbaru(sorted);
    } catch (err) {
      console.error("❌ Gagal ambil pengaduan terbaru:", err);
    }
  };

  return (
    <div className="space-y-8 font-poppins">
      {" "}
      {/* ← font dasar */}
      <div>
        <h1 className="text-2xl font-extrabold text-blue-600 font-lato">
          Dashboard Admin
        </h1>
        <p className="text-gray-600 font-montserrat">
          Kelola laporan mahasiswa dengan mudah.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card
          title="Total Pengguna"
          value={counts.totalUser}
          color="indigo"
          icon={<FaUsers size={28} />}
        />
        <Card
          title="Admin"
          value={counts.totalAdmin}
          color="blue"
          icon={<FaUserShield size={28} />}
        />
        <Card
          title="Mahasiswa"
          value={counts.totalMahasiswa}
          color="green"
          icon={<FaUserGraduate size={28} />}
        />
        <Card
          title="Pengaduan"
          value={counts.totalPengaduan}
          color="red"
          icon={<MdReport size={28} />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pengaduan Terbaru */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-3 font-lato">
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
                        {item.keterangan || "Tanpa deskripsi"}
                      </h4>
                      <p className="text-xs text-gray-500 italic mt-1">
                        {item.email || "email tidak tersedia"}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-poppins">
                      Fasilitas
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

        {/* Aksi Cepat */}
        <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center font-poppins">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2 font-lato">
            <span className="text-orange-500">
              <BsLightning className="text-orange-500" size={20} />
            </span>{" "}
            Aksi Cepat
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all font-semibold">
              + Tambah Mahasiswa
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all font-semibold">
              + Tambah Pengaduan
            </button>
          </div>
          <img
            src="/img/aksi.png"
            alt="Ilustrasi aksi cepat"
            className="w-125 mt-6"
          />
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
      <div className="text-3xl font-extrabold font-lato text-black">{value}</div>
    </div>
  );
}
