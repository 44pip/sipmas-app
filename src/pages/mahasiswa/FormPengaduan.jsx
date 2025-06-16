import React, { useState } from "react";
import { pengaduanAPI } from "../../services/pengaduanApi";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function FormPengaduan() {
  const navigate = useNavigate();

  // Cek apakah user sudah login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Silakan login terlebih dahulu untuk mengakses form pengaduan.");
      navigate("/login");
    }
  }, []);

  const [form, setForm] = useState({ nama: "", subject: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.subject) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    try {
      await pengaduanAPI.create({ ...form, status: "Belum Ditangani" });
      setForm({ nama: "", subject: "" });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("❌ GAGAL:", error.response?.data || error.message);
      alert("Gagal mengirim pengaduan");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          Form Pengaduan Mahasiswa
        </h2>
        {isSuccess && (
          <div className="text-green-600 text-sm mb-3 text-center">
            Pengaduan berhasil dikirim!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Mahasiswa"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subjek Pengaduan"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Kirim Pengaduan
          </button>
        </form>
      </div>
    </div>
  );
}
