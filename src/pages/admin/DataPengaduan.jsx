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
    <div className="p-6 font-poppins">
      <h1 className="text-2xl font-extrabold text-blue-700 mb-4 font-lato">
        Daftar Pengaduan Mahasiswa
      </h1>

      {loading ? (
        <p className="text-gray-600 font-montserrat italic">
          Sedang memuat data...
        </p>
      ) : pengaduanList.length === 0 ? (
        <p className="text-gray-600 font-montserrat italic">
          Belum ada pengaduan.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-sm text-left border border-gray-200 font-montserrat">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Kelas</th>
                <th className="px-4 py-2">Kategori</th>
                <th className="px-4 py-2">Jenis</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengaduanList.map((item, index) => (
                <tr
                  key={item.idPengaduan}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-semibold">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.kelas}</td>
                  <td className="px-4 py-2">{item.kategori}</td>
                  <td className="px-4 py-2">{item.jenis}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs italic">
                    {new Date(item.created_at).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(item.idPengaduan)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdOutlineDeleteOutline className="text-xl" />
                    </button>
                    <Link to={`/detailPengaduan/${item.idPengaduan}`}>
                      <BsInfoCircle className="text-blue-600 hover:text-blue-800 text-xl" />
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
