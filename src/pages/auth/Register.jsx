import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";


export default function Register() {
  const [form, setForm] = useState({ nama: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/user`,
        {
          nama: form.nama,
          email: form.email.toLowerCase(),
          password: form.password,
          role: "mahasiswa",
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            Prefer: "return=representation",
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registrasi berhasil!");
      setForm({ nama: "", email: "", password: "", confirmPassword: "" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Register error:", error);
      alert("Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <FaUser className="text-white text-2xl" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Buat Akun Baru</h1>
          <p className="text-gray-600 text-sm">Daftar untuk menggunakan SIPMAS</p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Nama */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            name="nama"
            placeholder="Nama lengkap"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.nama}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Alamat email"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>

        {/* Konfirmasi Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>

        {/* Tombol Register */}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <ImSpinner2 className="animate-spin" size={18} />
              <span>Mendaftar...</span>
            </div>
          ) : (
            "Daftar"
          )}
        </motion.button>

        {/* Link Login */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Masuk di sini
            </a>
          </p>
        </div>
      </motion.form>
    </motion.div>
  );
}
