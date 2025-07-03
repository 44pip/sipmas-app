import { FcPrivacy } from "react-icons/fc";
import { FaUserClock } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsFillSendCheckFill } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Guest() {
  return (
    <div className="bg-blue-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section
        id="/"
        className="min-h-screen flex items-center px-6 py-12 bg-blue-100 relative overflow-hidden"
      >
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-30 -top-40 -left-40 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Kiri: Konten Teks */}
          <div className="space-y-8">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-blue-700 leading-snug"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Selamat Datang di <span className="text-blue-600">SIPMAS</span>
            </motion.h1>
            <motion.p
              className="text-gray-700 text-xl max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Sampaikan aspirasi, keluhan, dan masukan Anda dengan mudah melalui
              platform pengaduan mahasiswa. Setiap suara Anda penting!
            </motion.p>
            <Link to="/formPengaduan">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl text-lg"
              >
                Buat Pengaduan
              </motion.button>
            </Link>
          </div>

          {/* Kanan: Gambar Besar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <img
              src="https://polilaman.ac.id/wp-content/uploads/2022/02/lulus-kuliah.jpg"
              alt="Ilustrasi Mahasiswa"
              className="w-full max-h-[1000px] object-cover rounded-xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Tentang Kami */}
      <section
        id="tentang"
        className="min-h-screen py-24 px-6 text-center bg-white flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/img/logo.png"
            alt="Logo SIPMAS"
            className="w-40 mx-auto mb-6 animate-bounce"
          />
          <h2 className="text-4xl font-bold text-blue-700 mb-6">
            Tentang SIPMAS
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            SIPMAS adalah sistem pengaduan mahasiswa berbasis digital yang
            bertujuan untuk mendukung komunikasi terbuka antara mahasiswa dan
            kampus. Setiap suara Anda penting dan akan kami tindaklanjuti dengan
            profesionalisme.
          </p>
        </motion.div>
      </section>

      {/* Fitur Unggulan */}
      <section
        id="keunggulan"
        className="min-h-screen py-24 px-6 bg-blue-50 flex items-center"
      >
        <motion.div
          className="max-w-6xl mx-auto w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-14">
            Mengapa Memilih SIPMAS?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <MdTouchApp size={70} />,
                title: "Antarmuka Ramah",
                desc: "Desain sederhana memudahkan siapa saja dalam menyampaikan laporan.",
              },
              {
                icon: <FaUserClock size={70} />,
                title: "Respon Cepat",
                desc: "Laporan langsung diteruskan ke pihak terkait tanpa birokrasi berbelit.",
              },
              {
                icon: <FcPrivacy size={70} />,
                title: "Privasi Terjamin",
                desc: "Setiap pengaduan dijaga kerahasiaannya dan ditangani secara profesional.",
              },
            ].map((fitur, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.07 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all hover:shadow-xl"
              >
                <div className="flex flex-col items-center gap-3">
                  {fitur.icon}
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    {fitur.title}
                  </h3>
                  <p className="text-gray-600 text-base">{fitur.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Cara Kerja */}
      <section
        id="alurKerja"
        className="min-h-screen py-24 px-6 bg-white text-center flex items-center"
      >
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-14">
            Cara Kerja SIPMAS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <IoIosPaper size={65} />,
                title: "Isi Formulir",
                desc: "Lengkapi pengaduan Anda secara detail.",
              },
              {
                icon: <BsFillSendCheckFill size={65} />,
                title: "Kirim Pengaduan",
                desc: "Pengaduan dikirim otomatis ke admin.",
              },
              {
                icon: <GiSandsOfTime size={65} />,
                title: "Diproses",
                desc: "Admin akan menindaklanjuti laporan Anda.",
              },
              {
                icon: <FcOk size={65} />,
                title: "Selesai",
                desc: "Anda akan menerima update status.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.07 }}
                className="bg-blue-50 p-6 rounded-2xl shadow-md"
              >
                <div className="flex flex-col items-center gap-3">
                  {step.icon}
                  <h4 className="font-semibold text-blue-700 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimoni */}
      <section
        id="testimoni"
        className="min-h-screen py-24 px-6 bg-blue-50 flex items-center"
      >
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-14">
            Apa Kata Mereka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Rizky, Mahasiswa Teknik",
                quote:
                  "Sangat membantu agar mahasiswa bisa menyampaikan keluhan dengan mudah dan cepat ditanggapi.",
              },
              {
                name: "Aulia, Mahasiswi Hukum",
                quote:
                  "SIPMAS bikin kampus makin transparan. Salut buat tim pengembang!",
              },
              {
                name: "Bima, Mahasiswa Informatika",
                quote:
                  "Cocok untuk kampus zaman now. Wajib ada di semua universitas.",
              },
            ].map((testi, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-left"
              >
                <p className="text-gray-600 italic text-base">
                  "{testi.quote}"
                </p>
                <p className="mt-4 font-bold text-blue-700 text-lg">
                  {testi.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        title="Kembali ke Atas"
      >
        ⬆
      </motion.button>
    </div>
  );
}
