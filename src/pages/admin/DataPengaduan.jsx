import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pengaduanAPI } from "../../services/pengaduanApi";

export default function DataPengaduan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    kategori: "",
    jenis: "",
    status: "",
    tanggalDari: "",
    tanggalSampai: "",
  });

  const [kategoriList, setKategoriList] = useState([]);
  const [jenisList, setJenisList] = useState([]);

  const fetchData = async () => {
    try {
      const data = await pengaduanAPI.fetchAll();
      setPengaduanList(data);
      setFilteredList(data);
      setLoading(false);

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
    setFilteredList(pengaduanList);
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

    setFilteredList(filtered);
  }, [filters, pengaduanList]);

  return (
    <div className="p-4 md:p-8 font-poppins bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 tracking-tight">
        Daftar Pengaduan Mahasiswa
      </h1>

      {/* FILTER */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-xl shadow">
        <select
          name="kategori"
          value={filters.kategori}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Kategori</option>
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
          className="border rounded px-3 py-2"
        >
          <option value="">Jenis</option>
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
          className="border rounded px-3 py-2"
        >
          <option value="">Status</option>
          <option value="Belum Ditangani">Belum Ditangani</option>
          <option value="Selesai">Selesai</option>
        </select>

        <input
          type="date"
          name="tanggalDari"
          value={filters.tanggalDari}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          name="tanggalSampai"
          value={filters.tanggalSampai}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        />

        <div className="col-span-full mt-2 flex justify-end">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded font-medium"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-500 italic">Sedang memuat data...</p>
      ) : filteredList.length === 0 ? (
        <p className="text-gray-500 italic">Tidak ada pengaduan yang cocok.</p>
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
              {filteredList.map((item, index) => (
                <tr key={item.idPengaduan} className="hover:bg-gray-50 transition-colors">
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
