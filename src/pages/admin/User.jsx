import { AiOutlineUserDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  Prefer: "return=representation",
};

export default function UserPage() {
  const [adminList, setAdminList] = useState([]);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const resAdmin = await axios.get(
        `${BASE_URL}/user?role=eq.admin&select=*`,
        { headers }
      );
      const resMahasiswa = await axios.get(
        `${BASE_URL}/user?role=eq.mahasiswa&select=*`,
        { headers }
      );
      setAdminList(resAdmin.data);
      setMahasiswaList(resMahasiswa.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data user:", err);
    }
    setLoading(false);
  };

  const deleteUser = async (idUser) => {
    const konfirmasi = confirm("Yakin ingin menghapus pengguna ini?");
    if (!konfirmasi) return;

    try {
      await axios.delete(`${BASE_URL}/user?idUser=eq.${idUser}`, { headers });
      alert("Pengguna berhasil dihapus");
      fetchUsers(); // refresh data
    } catch (err) {
      console.error("❌ Gagal menghapus:", err);
      alert("Gagal menghapus pengguna");
    }
  };

  const renderTable = (data, color) => (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span
          className={`${
            color === "blue" ? "text-blue-500" : "text-green-500"
          } text-lg`}
        >
          {color === "blue" ? "🔷" : "🎓"}
        </span>
        {color === "blue" ? "Daftar Admin" : "Daftar Mahasiswa"}
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm">
          <thead
            className={`${
              color === "blue" ? "bg-blue-50" : "bg-green-50"
            } text-gray-700`}
          >
            <tr className="text-left">
              <th className="px-6 py-3 border-b">No</th>
              <th className="px-6 py-3 border-b">Nama</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={user.idUser}
                className="hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-3 border-b text-center">{index + 1}</td>
                <td className="px-6 py-3 border-b">{user.nama}</td>
                <td className="px-6 py-3 border-b">{user.email}</td>
                <td className="px-6 py-3 border-b text-center">
                  <button
                    onClick={() => deleteUser(user.idUser)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    title="Hapus pengguna"
                  >
                    <AiOutlineUserDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-10">
      {loading ? <p>Loading...</p> : renderTable(adminList, "blue")}
      {loading ? <p>Loading...</p> : renderTable(mahasiswaList, "green")}
    </div>
  );
}
