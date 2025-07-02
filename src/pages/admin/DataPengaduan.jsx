import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { pengaduanAPI } from "../../services/pengaduanApi";

export default function DataPengaduan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null); // state untuk modal

  const fetchData = async () => {
    try {
      const data = await pengaduanAPI.fetchAll();
      setPengaduanList(data);
    } catch (error) {
      console.error("❌ Gagal mengambil data pengaduan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus pengaduan ini?");
    if (!konfirmasi) return;

    try {
      await pengaduanAPI.deletePengaduan(id);
      fetchData();
    } catch (error) {
      console.error("❌ Gagal menghapus pengaduan:", error);
      alert("Pengaduan gagal dihapus.");
    }
  };

return (
  <div className="p-4 md:p-8 font-poppins bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-blue-700 mb-6 tracking-tight">
      Daftar Pengaduan Mahasiswa
    </h1>

    {loading ? (
      <p className="text-gray-500 italic">Sedang memuat data...</p>
    ) : pengaduanList.length === 0 ? (
      <p className="text-gray-500 italic">Belum ada pengaduan.</p>
    ) : (
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kelas</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Jenis</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pengaduanList.map((item, index) => (
              <tr
                key={item.idPengaduan}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold">{index + 1}</td>
                <td className="px-4 py-3">{item.nama}</td>
                <td className="px-4 py-3">{item.kelas}</td>
                <td className="px-4 py-3">{item.kategori}</td>
                <td className="px-4 py-3">{item.jenis}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs italic">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 flex gap-3 items-center">
                  <button
                    onClick={() => handleDelete(item.idPengaduan)}
                    className="text-red-600 hover:text-red-700 transition"
                    title="Hapus"
                  >
                    <MdOutlineDeleteOutline className="text-xl" />
                  </button>
                  <Link
                    to={`/detailPengaduan/${item.idPengaduan}`}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Lihat Detail"
                  >
                    <BsInfoCircle className="text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}
