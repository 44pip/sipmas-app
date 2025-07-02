import { BsInfoCircle } from "react-icons/bs"; 
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pengaduanAPI } from "../../services/pengaduanApi";


export default function DetailPengaduan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const all = await pengaduanAPI.fetchAll();
      const item = all.find((p) => p.idPengaduan === parseInt(id));
      setData(item);
    };
    fetchDetail();
  }, [id]);

  if (!data) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm font-poppins">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
        <div className="flex items-center gap-2 text-lg font-bold">
          <BsInfoCircle className="text-xl" />
          Detail Pengaduan Mahasiswa
        </div>
        <button
          onClick={() => navigate("/pengaduan")}
          className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition"
        >
          Tutup
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Nama:</strong> {data.nama}</div>
          <div><strong>NIM:</strong> {data.nim}</div>
          <div><strong>Kelas:</strong> {data.kelas}</div>
          <div><strong>Kategori:</strong> {data.kategori}</div>
          <div><strong>Jenis:</strong> {data.jenis}</div>
          <div><strong>Status:</strong> {data.status}</div>
          <div className="col-span-2"><strong>Subject:</strong> {data.subject}</div>
          <div><strong>Tag:</strong> {data.tag}</div>
          <div><strong>Tanggal:</strong> {new Date(data.created_at).toLocaleDateString("id-ID")}</div>
        </div>

        {/* Textarea Jawaban */}
        <div>
          <label className="block font-semibold mb-1">Balasan Admin:</label>
          <textarea
            rows="4"
            placeholder="Tulis balasan pengaduan di sini..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Ubah Status Pengaduan:</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={data.status}
          >
            <option value="Belum Ditangani">Belum Ditangani</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        {/* Tombol Kirim */}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
