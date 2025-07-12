import React, { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Link reset dikirim ke ${email} (fitur simulasi)`);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input Email */}
      <div className="relative">
        <input
          type="email"
          placeholder="Masukkan email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Tombol Reset */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition duration-300"
      >
        Kirim Link Reset
      </button>

      {/* Kembali ke Login */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Sudah ingat password?{" "}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Kembali ke Login
        </a>
      </p>
    </form>
  );
}
