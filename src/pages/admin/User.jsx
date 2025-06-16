import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export default function UserPage() {
  const [adminList, setAdminList] = useState([]);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const resAdmin = await axios.get(`${BASE_URL}/user?role=eq.admin&select=*`, { headers });
      const resMahasiswa = await axios.get(`${BASE_URL}/user?role=eq.mahasiswa&select=*`, { headers });

      setAdminList(resAdmin.data);
      setMahasiswaList(resMahasiswa.data);
    } catch (error) {
      console.error("❌ Gagal ambil data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-4">🔷 Daftar Admin</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {adminList.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.nama}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">🎓 Daftar Mahasiswa</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-green-200">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswaList.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.nama}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
