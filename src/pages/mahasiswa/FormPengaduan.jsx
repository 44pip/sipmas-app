import React, { useState, useEffect } from "react";
import { pengaduanAPI } from "../../services/pengaduanApi";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

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
    Akademik: [
      "Dosen",
      "KRS",
      "Jadwal",
      "Ujian",
      "Nilai",
      "Perwalian",
      "Tugas",
      "Pembelajaran"
    ],
    "Non Akademik": [
      "Fasilitas",
      "Keamanan",
      "Kebersihan",
      "Kantin",
      "WiFi / Internet",
      "Parkiran",
      "Administrasi",
      "Layanan Mahasiswa"
    ]
  };

  const jenisOptions = [
    "Komplain",
    "Saran",
    "Permintaan",
    "Kerusakan",
    "Kehilangan",
    "Lainnya"
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
    <div className=" from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-5xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">
          📝 Form Pengaduan Mahasiswa
        </h2>

        {isSuccess && (
          <div className="bg-green-100 border border-green-300 text-green-700 text-center py-2 rounded mb-4">
            Pengaduan berhasil dikirim!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {["nama", "nim", "kelas"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold mb-1 capitalize">
                {field}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Kategori</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Akademik">Akademik</option>
              <option value="Non Akademik">Non Akademik</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Sub-Kategori</label>
            <select
              name="subKategori"
              value={form.subKategori}
              onChange={handleChange}
              disabled={!form.kategori}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">-- Pilih Sub-Kategori --</option>
              {form.kategori &&
                subKategoriOptions[form.kategori].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Jenis</label>
            <select
              name="jenis"
              value={form.jenis}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">-- Pilih Jenis --</option>
              {jenisOptions.map((jenis) => (
                <option key={jenis} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Keterangan</label>
            <textarea
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              rows="4"
              placeholder="Ceritakan detail pengaduanmu di sini..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
            >
              <FaPaperPlane /> Kirim Pengaduan
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}