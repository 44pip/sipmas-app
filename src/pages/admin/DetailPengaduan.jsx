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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm font-poppins">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="bg-blue-600 text-white px-5 py-3 flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-2 font-bold">
            <BsInfoCircle className="text-xl"/>Detail Pengaduan
          </div>
          <button onClick={() => navigate("/pengaduan")}>Tutup</button>
        </div>

        <div className="p-5 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
          <div><strong>Nama:</strong> {data.nama}</div>
          <div><strong>NIM:</strong> {data.nim}</div>
          <div><strong>Kelas:</strong> {data.kelas}</div>
          <div><strong>Kategori:</strong> {data.kategori}</div>
          <div><strong>Jenis:</strong> {data.jenis}</div>
          <div><strong>Status:</strong> {data.status}</div>
          <div className="col-span-2">
            <strong>Subject:</strong> {data.subject}
          </div>
          <div><strong>Tag:</strong> {data.tag}</div>
          <div><strong>Tanggal:</strong>{" "}
            {new Date(data.created_at).toLocaleDateString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
}
