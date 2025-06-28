import { FcPrivacy } from "react-icons/fc"; 
import { FaUserClock } from "react-icons/fa"; 
import { MdTouchApp } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsFillSendCheckFill } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Guest() {
  return (
    <div className="bg-blue-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-100 min-h-[600px] flex items-center px-6 py-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* Kiri: Konten Teks */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-snug">
              Selamat Datang di <span className="text-blue-600">SIPMAS</span>
            </h1>
            <p className="text-gray-700 text-lg max-w-md">
              Sampaikan aspirasi, keluhan, dan masukan Anda dengan mudah melalui
              platform pengaduan mahasiswa. Setiap suara Anda penting!
            </p>
            <Link to="/formPengaduan">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg transition">
                Buat Pengaduan
              </button>
            </Link>
          </div>

          {/* Kanan: Gambar Besar */}
          <div>
            <img
              src="https://polilaman.ac.id/wp-content/uploads/2022/02/lulus-kuliah.jpg"
              alt="Ilustrasi Mahasiswa"
              className="w-full max-h-[1000px] object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>


      {/* Tentang Kami */}
      <section className="py-16 px-6 text-center bg-white">
        <img
          src="/public/img/logo.png"
          alt="Logo SIPMAS"
          className="w-40 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Tentang SIPMAS</h2>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          SIPMAS adalah sistem pengaduan mahasiswa berbasis digital yang
          bertujuan untuk mendukung komunikasi terbuka antara mahasiswa dan
          kampus. Setiap suara Anda penting.
        </p>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Mengapa Memilih SIPMAS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="flex flex-col items-center">
              <MdTouchApp size={60} /><h3 className="text-lg font-semibold text-blue-700 mb-2">Antarmuka Ramah</h3>
              <p className="text-gray-600">Desain sederhana memudahkan siapa saja dalam menyampaikan laporan.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="flex flex-col items-center">
              <FaUserClock size={60}/><h3 className="text-lg font-semibold text-blue-700 mb-2">Respon Cepat</h3>
              <p className="text-gray-600">Laporan langsung diteruskan ke pihak terkait tanpa birokrasi berbelit.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="flex flex-col items-center">
              <FcPrivacy size={60}/><h3 className="text-lg font-semibold text-blue-700 mb-2">Privasi Terjamin</h3>
              <p className="text-gray-600">Setiap pengaduan dijaga kerahasiaannya dan ditangani secara profesional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-12">Cara Kerja SIPMAS</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <IoIosPaper size={60} /><h4 className="font-semibold text-blue-700 mb-1">Isi Formulir</h4>
            <p className="text-sm text-gray-600">Lengkapi pengaduan Anda secara detail.</p>
          </div>
          <div className="flex flex-col items-center">
            <BsFillSendCheckFill size={60} /><h4 className="font-semibold text-blue-700 mb-1">Kirim Pengaduan</h4>
            <p className="text-sm text-gray-600">Pengaduan dikirim otomatis ke admin.</p>
          </div>
          <div className="flex flex-col items-center">
            <GiSandsOfTime size={60} /><h4 className="font-semibold text-blue-700 mb-1">Diproses</h4>
            <p className="text-sm text-gray-600">Admin akan menindaklanjuti laporan Anda.</p>
          </div>
          <div className="flex flex-col items-center">
            <FcOk size={60} /><h4 className="font-semibold text-blue-700 mb-1">Selesai</h4>
            <p className="text-sm text-gray-600">Anda akan menerima update status.</p>
          </div>
        </div>
      </section>

      {/* Testimoni / Feedback */}
      <section className="py-16 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Apa Kata Mereka</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow text-left">
            <p className="text-gray-600 italic">"Sangat membantu agar mahasiswa bisa menyampaikan keluhan dengan mudah dan cepat ditanggapi."</p>
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
    </div>
  );
}
