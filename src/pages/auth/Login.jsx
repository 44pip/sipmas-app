import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek ke tabel user buatan sendiri
    const { data: users, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", form.email)
      .single();

    if (error || !users) {
      alert("Email tidak ditemukan.");
      return;
    }

    if (users.password !== form.password) {
      alert("Password salah.");
      return;
    }

    alert("Login berhasil!");
    localStorage.setItem("user", JSON.stringify(users));

    // Redirect berdasarkan role
    if (users.role === "admin") {
      navigate("/adminDashboard");
    } else if (users.role === "mahasiswa") {
      navigate("/mahasiswaDashboard");
    } else {
      navigate("/forbidden");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
