import React, { useState } from "react";
import axios from "axios";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Link reset dikirim ke ${email} (fitur simulasi)`);
    setEmail("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lupa Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Masukkan email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-yellow-500 text-white py-2 rounded">
          Kirim Link Reset
        </button>
      </form>
    </div>
  );
}
