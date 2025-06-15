import { Link } from "react-router-dom";

export default function Guest() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Selamat Datang di SIPMAS
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Sistem Informasi Pengaduan Mahasiswa untuk menyampaikan aspirasi, keluhan, dan masukan demi perbaikan kampus tercinta.
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition">
              Register
            </button>
          </Link>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          SIPMAS adalah platform digital yang bertujuan untuk menjembatani komunikasi antara mahasiswa dan pihak kampus dalam bentuk pengaduan, masukan, dan saran. Transparansi dan respon yang cepat adalah prioritas kami.
        </p>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Mudah Digunakan</h3>
            <p className="text-gray-600">Tampilan antarmuka yang ramah pengguna membuat proses pelaporan menjadi sangat sederhana dan cepat.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Terintegrasi</h3>
            <p className="text-gray-600">Setiap laporan langsung diteruskan ke bagian terkait di lingkungan kampus untuk ditindaklanjuti.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Notifikasi Real-time</h3>
            <p className="text-gray-600">Dapatkan pembaruan status pengaduan langsung melalui email atau dashboard akun Anda.</p>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Apa Kata Mereka</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow text-left">
            <p className="text-gray-600 italic">"Sangat membantu! Saya bisa menyampaikan keluhan dengan mudah dan cepat ditanggapi."</p>
            <p className="mt-4 font-bold text-blue-700">Rizky, Mahasiswa Teknik</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-left">
            <p className="text-gray-600 italic">"SIPMAS bikin kampus makin transparan. Salut buat tim pengembang!"</p>
            <p className="mt-4 font-bold text-blue-700">Aulia, Mahasiswi Hukum</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-left">
            <p className="text-gray-600 italic">"Cocok untuk kampus zaman now. Wajib ada di semua universitas."</p>
            <p className="mt-4 font-bold text-blue-700">Bima, Mahasiswa Informatika</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 text-center">
        <p>© 2025 SIPMAS - Sistem Informasi Pengaduan Mahasiswa</p>
        <p className="text-sm text-blue-200">Dibuat dengan ❤️ untuk kampus yang lebih baik</p>
      </footer>
    </div>
  );
}