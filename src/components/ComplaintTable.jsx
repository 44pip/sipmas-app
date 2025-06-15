import React from "react";

const complaints = [
  { id: 1, name: "Budi", subject: "Lampu jalan mati", status: "Belum Ditangani" },
  { id: 2, name: "Siti", subject: "Sampah menumpuk", status: "Sedang Diproses" },
  { id: 3, name: "Andi", subject: "Jalan berlubang", status: "Selesai" },
];

export default function ComplaintTable() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Pengaduan</h2>
      <table className="w-full table-auto text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Subjek</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.subject}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Sedang Diproses"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
