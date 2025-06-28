import React, { useState, useEffect } from "react";
import { pengaduanAPI } from "../../services/pengaduanApi";
import { useNavigate } from "react-router-dom";

export default function FormPengaduan() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Silakan login terlebih dahulu untuk mengakses form pengaduan.");
      navigate("/login");
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    nama: "",
    nim: "",
    kelas: "",
    tanggal: today,
    kategori: "",
    subKategori: "",
    jenis: "",
    keterangan: ""
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const subKategoriOptions = {
    "Akademik": [
      "Dosen", "KRS", "Jadwal", "Ujian", "Nilai", "Perwalian", "Tugas", "Pembelajaran"
    ],
    "Non Akademik": [
      "Fasilitas", "Keamanan", "Kebersihan", "Kantin", "WiFi / Internet", "Parkiran", "Administrasi", "Layanan Mahasiswa"
    ]
  };

  const jenisOptions = [
    "Komplain", "Saran", "Permintaan", "Kerusakan", "Kehilangan", "Lainnya"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const unfilled = Object.values(form).filter((val) => !val);
    if (unfilled.length > 1) {
      alert("Lengkapi seluruh data sebelum mengirim pengaduan!");
      return;
    } else if (unfilled.length === 1) {
      const missingField = Object.entries(form).find(([key, value]) => !value);
      alert(`Kolom "${missingField[0]}" wajib diisi!`);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        idUser: user.idUser,
        nama: form.nama,
        nim: form.nim,
        kelas: form.kelas,
        subject: form.keterangan,
        status: "Belum Ditangani",
        kategori: form.kategori,
        tag: form.subKategori,
        jenis: form.jenis,
        created_at: form.tanggal
      };

      await pengaduanAPI.create(payload);

      setForm({
        nama: "",
        nim: "",
        kelas: "",
        tanggal: today,
        kategori: "",
        subKategori: "",
        jenis: "",
        keterangan: ""
      });

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("❌ GAGAL:", error.response?.data || error.message);
      alert("Gagal mengirim pengaduan");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Form Pengaduan Mahasiswa</h2>
        {isSuccess && (
          <div className="text-green-600 text-sm text-center">
            Pengaduan berhasil dikirim!
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input name="nama" onChange={handleChange} value={form.nama} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">NIM</label>
            <input name="nim" onChange={handleChange} value={form.nim} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kelas</label>
            <input name="kelas" onChange={handleChange} value={form.kelas} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal</label>
            <input type="date" name="tanggal" onChange={handleChange} value={form.tanggal} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select name="kategori" onChange={handleChange} value={form.kategori} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Pilih Kategori --</option>
              <option value="Akademik">Akademik</option>
              <option value="Non Akademik">Non Akademik</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sub-Kategori</label>
            <select name="subKategori" onChange={handleChange} value={form.subKategori} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={!form.kategori}>
              <option value="">-- Pilih Sub-Kategori --</option>
              {form.kategori && subKategoriOptions[form.kategori].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Jenis</label>
            <select name="jenis" onChange={handleChange} value={form.jenis} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Pilih Jenis --</option>
              {jenisOptions.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Keterangan</label>
            <textarea name="keterangan" onChange={handleChange} value={form.keterangan} rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="md:col-span-2 text-right">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow">
              Kirim Pengaduan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
