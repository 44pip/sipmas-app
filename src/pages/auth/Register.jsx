import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";

export default function Register() {
  const [form, setForm] = useState({ nama: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/user`,
        {
          nama: form.nama,
          email: form.email,
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
      setForm({ nama: "", email: "", password: "" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Register error:", error);
      alert("Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nama */}
      <div className="relative">
        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Nama"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <span
          className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <FaLock className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Konfirmasi Password"
          className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <span
          className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </span>
      </div>

      {/* Tombol Daftar */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <ImSpinner2 className="animate-spin text-white" size={20} />
        ) : (
          "Daftar"
        )}
      </button>

      {/* Link ke login */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Sudah punya akun?{" "}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Login di sini
        </a>
      </p>
    </form>
  );
}