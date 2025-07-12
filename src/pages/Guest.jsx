import { FcPrivacy } from "react-icons/fc";
import { FaUserClock, FaStar, FaQuoteLeft } from "react-icons/fa";
import { MdTouchApp, MdKeyboardArrowRight } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsFillSendCheckFill } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-400/15 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return [ref, isInView];
};

export default function Guest() {
  const [heroRef, heroInView] = useScrollAnimation();
  const [aboutRef, aboutInView] = useScrollAnimation();
  const [featuresRef, featuresInView] = useScrollAnimation();
  const [workflowRef, workflowInView] = useScrollAnimation();
  const [testimonialsRef, testimonialsInView] = useScrollAnimation();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Rizky Pratama",
      role: "Mahasiswa Teknik Informatika",
      quote: "SIPMAS sangat membantu dalam menyampaikan keluhan dengan mudah dan cepat. Responsnya juga sangat baik dari pihak kampus.",
      avatar: "https://avatar.iran.liara.run/public/1",
      rating: 5
    },
    {
      name: "Aulia Sari",
      role: "Mahasiswi Hukum",
      quote: "Platform yang sangat user-friendly dan transparan. Membuat komunikasi dengan pihak kampus jadi lebih efektif.",
      avatar: "https://avatar.iran.liara.run/public/2",
      rating: 5
    },
    {
      name: "Bima Sakti",
      role: "Mahasiswa Informatika",
      quote: "Fitur yang lengkap dan interface yang modern. Cocok banget untuk generasi digital seperti kita.",
      avatar: "https://avatar.iran.liara.run/public/3",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-50 font-sans text-gray-800 relative overflow-hidden scroll-smooth">
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Hero Section - Enhanced */}
      <section
        id="/"
        ref={heroRef}
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative overflow-hidden"
      >
        {/* Enhanced Background Elements */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-2xl -top-40 -left-40 z-0"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: heroInView ? 1 : 0, 
            rotate: [0, 360],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            scale: { duration: 1.2, ease: "easeOut" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-full blur-2xl -bottom-40 -right-40 z-0"
          initial={{ scale: 0 }}
          animate={{ 
            scale: heroInView ? 1 : 0,
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            scale: { duration: 1.5, delay: 0.3, ease: "easeOut" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 border-4 border-blue-400/20 rounded-lg rotate-45"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
            {/* Enhanced Left Content */}
            <motion.div
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0.8 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-200 shadow-lg"
              >
                <motion.div 
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                Platform Pengaduan Digital Terdepan
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: heroInView ? 1 : 0, x: heroInView ? 0 : -50 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: heroInView ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Selamat Datang di{" "}
                </motion.span>
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0.8 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  SIPMAS
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-gray-800 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: heroInView ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Sampaikan aspirasi, keluhan, dan masukan Anda dengan mudah melalui
                platform pengaduan mahasiswa yang modern dan responsif. Setiap suara Anda berharga untuk kemajuan kampus!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl text-base sm:text-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Buat Pengaduan
                      <MdKeyboardArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-600 text-blue-600 font-bold py-4 px-8 rounded-2xl text-base sm:text-lg transition-all duration-300 backdrop-blur-sm bg-white/50 w-full sm:w-auto"
                  onClick={() => document.getElementById('tentang').scrollIntoView({ behavior: 'smooth' })}
                >
                  Pelajari Lebih Lanjut
                </motion.button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 sm:gap-8 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {[
                  { number: "1000+", label: "Mahasiswa Aktif", color: "from-blue-500 to-blue-600" },
                  { number: "500+", label: "Pengaduan Selesai", color: "from-blue-500 to-blue-600" },
                  { number: "98%", label: "Tingkat Kepuasan", color: "from-blue-500 to-blue-600" },
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0.8 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div 
                      className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-gray-700 font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Right Image */}
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ 
                opacity: heroInView ? 1 : 0, 
                scale: heroInView ? 1 : 0.8,
                rotateY: heroInView ? 0 : -15
              }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative">
                {/* Enhanced Glow Effect */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-600/20 rounded-3xl blur-2xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Image with enhanced effects */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://polilaman.ac.id/wp-content/uploads/2022/02/lulus-kuliah.jpg"
                    alt="Ilustrasi Mahasiswa"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>
                </motion.div>

                {/* Floating Achievement Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-blue-100"
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0, rotate: heroInView ? 0 : -10 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-xs text-gray-600">Kepuasan</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tentang Kami - Enhanced */}
      <section
        id="tentang"
        ref={aboutRef}
        className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-2xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full blur-2xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Left: Logo and Visual Elements */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: aboutInView ? 1 : 0, x: aboutInView ? 0 : -50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: aboutInView ? 1 : 0, scale: aboutInView ? 1 : 0.5 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.img
                  src="/img/logo.png"
                  alt="Logo SIPMAS"
                  className="relative w-24 sm:w-32 mx-auto lg:mx-0 drop-shadow-2xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Floating Icons Around Logo */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <MdTouchApp className="text-white text-sm" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, 10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <FcOk className="text-sm" />
                </motion.div>
              </motion.div>

              {/* Mission Values */}
              <motion.div
                className="mt-8 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {[
                  { icon: "🎯", title: "Misi", desc: "Memudahkan komunikasi kampus" },
                  { icon: "💡", title: "Visi", desc: "Platform pengaduan terdepan" },
                  { icon: "🤝", title: "Nilai", desc: "Transparansi dan responsif" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: aboutInView ? 1 : 0, x: aboutInView ? 0 : -20 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="font-bold text-blue-700">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: aboutInView ? 1 : 0, x: aboutInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Tentang Platform
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 leading-tight">
                  Tentang{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    SIPMAS
                  </span>
                </h2>
              </motion.div>

              <motion.p
                className="text-gray-800 text-lg sm:text-xl leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
                transition={{ delay: 0.6 }}
              >
                SIPMAS adalah sistem pengaduan mahasiswa berbasis digital yang
                bertujuan untuk mendukung komunikasi terbuka antara mahasiswa dan
                kampus. Setiap suara Anda penting dan akan kami tindaklanjuti dengan
                profesionalisme tinggi.
              </motion.p>

              {/* Statistics */}
              <motion.div
                className="grid grid-cols-2 gap-6 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { number: "2023", label: "Tahun Berdiri", icon: "📅" },
                  { number: "24/7", label: "Layanan Aktif", icon: "⏰" },
                  { number: "5", label: "Kategori Layanan", icon: "📋" },
                  { number: "100%", label: "Aman & Terpercaya", icon: "🔒" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: aboutInView ? 1 : 0, scale: aboutInView ? 1 : 0.8 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Journey Timeline */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-secondary-50 rounded-2xl p-6 border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
                transition={{ delay: 1.2 }}
              >
                <h3 className="text-xl font-bold text-blue-700 mb-4">Perjalanan Kami</h3>
                <div className="space-y-3">
                  {[
                    "✨ Memulai dengan visi menciptakan komunikasi yang lebih baik",
                    "🚀 Mengembangkan platform digital yang user-friendly", 
                    "🎯 Fokus pada transparansi dan responsivitas layanan",
                    "🏆 Menjadi platform pengaduan terpercaya di kampus"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: aboutInView ? 1 : 0, x: aboutInView ? 0 : -20 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan - Enhanced */}
      <section
        id="keunggulan"
        ref={featuresRef}
        className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-2xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 25, 0],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: featuresInView ? 1 : 0, scale: featuresInView ? 1 : 0.8 }}
              transition={{ delay: 0.2 }}
            >
              Keunggulan Platform
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6">
              Mengapa Memilih{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                SIPMAS?
              </span>
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Platform modern dengan fitur-fitur canggih yang dirancang khusus untuk 
              memudahkan mahasiswa dalam menyampaikan aspirasi dan keluhan.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <MdTouchApp size={50} className="text-blue-500" />,
                title: "Antarmuka Ramah",
                desc: "Desain intuitif dan user-friendly yang memudahkan siapa saja dalam menyampaikan laporan tanpa kesulitan.",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
                delay: 0.1
              },
              {
                icon: <FaUserClock size={50} className="text-blue-500" />,
                title: "Respon Cepat",
                desc: "Sistem otomatis yang meneruskan laporan langsung ke pihak terkait tanpa birokrasi yang berbelit-belit.",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
                delay: 0.2
              },
              {
                icon: <FcPrivacy size={50} />,
                title: "Privasi Terjamin",
                desc: "Keamanan data tingkat tinggi dengan enkripsi end-to-end untuk melindungi identitas dan informasi Anda.",
                color: "from-secondary-500 to-secondary-600",
                bgColor: "from-secondary-50 to-secondary-100",
                delay: 0.3
              },
              {
                icon: <BsFillSendCheckFill size={50} className="text-blue-600" />,
                title: "Notifikasi Real-time",
                desc: "Update status pengaduan secara real-time melalui notifikasi push dan email untuk transparansi penuh.",
                color: "from-blue-600 to-blue-700",
                bgColor: "from-blue-50 to-blue-100",
                delay: 0.4
              },
              {
                icon: <IoIosPaper size={50} className="text-secondary-600" />,
                title: "Dokumentasi Lengkap",
                desc: "Sistem pencatatan komprehensif dengan riwayat lengkap setiap pengaduan untuk tracking yang akurat.",
                color: "from-secondary-600 to-secondary-700",
                bgColor: "from-secondary-50 to-secondary-100",
                delay: 0.5
              },
              {
                icon: <GiSandsOfTime size={50} className="text-secondary-700" />,
                title: "Tracking Progress",
                desc: "Pantau perkembangan pengaduan Anda dari awal hingga selesai dengan timeline yang jelas dan detail.",
                color: "from-secondary-700 to-secondary-800", 
                bgColor: "from-secondary-50 to-secondary-100",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ 
                  opacity: featuresInView ? 1 : 0, 
                  y: featuresInView ? 0 : 30,
                  scale: featuresInView ? 1 : 0.9
                }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Card Background with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-lg border border-white/20 group-hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Icon Container */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <div className="relative bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center w-20 h-20 mx-auto">
                      {feature.icon}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm font-medium">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ width: 0 }}
                    whileHover={{ width: 48 }}
                  />

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/30 rounded-full blur-sm"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: index * 0.2 
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-secondary-400/30 rounded-full blur-sm"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      delay: index * 0.3 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">
                  Siap Mencoba SIPMAS?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Bergabunglah dengan ribuan mahasiswa yang telah merasakan kemudahan 
                  menyampaikan aspirasi melalui platform digital terdepan.
                </p>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Mulai Sekarang
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cara Kerja - Enhanced */}
      <section
        id="alurKerja"
        ref={workflowRef}
        className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-blue-300/20 rounded-full blur-2xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-secondary-200/30 to-blue-200/30 rounded-full blur-2xl"
          animate={{ 
            x: [0, 60, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: workflowInView ? 1 : 0, y: workflowInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: workflowInView ? 1 : 0, scale: workflowInView ? 1 : 0.8 }}
              transition={{ delay: 0.2 }}
            >
              Alur Proses
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6">
              Cara Kerja{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                SIPMAS
              </span>
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Proses yang sederhana dan efisien untuk memastikan setiap pengaduan 
              Anda ditangani dengan profesional dan transparan.
            </p>
          </motion.div>

          {/* Workflow Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-full transform -translate-y-1/2 hidden lg:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: workflowInView ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Animated Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full transform -translate-y-1/2 hidden lg:block"
              initial={{ width: 0 }}
              animate={{ width: workflowInView ? "100%" : 0 }}
              transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  icon: <IoIosPaper size={50} className="text-blue-500" />,
                  title: "Isi Formulir",
                  desc: "Lengkapi pengaduan Anda dengan detail yang jelas dan spesifik melalui form yang user-friendly.",
                  color: "from-blue-500 to-blue-600",
                  bgGradient: "from-blue-50 to-blue-100",
                  number: "01",
                  delay: 0.1
                },
                {
                  icon: <BsFillSendCheckFill size={50} className="text-blue-600" />,
                  title: "Kirim Pengaduan",
                  desc: "Sistem otomatis akan memproses dan meneruskan pengaduan ke departemen yang tepat secara real-time.",
                  color: "from-blue-600 to-blue-700",
                  bgGradient: "from-blue-50 to-blue-100",
                  number: "02",
                  delay: 0.2
                },
                {
                  icon: <GiSandsOfTime size={50} className="text-blue-600" />,
                  title: "Diproses",
                  desc: "Tim admin akan meninjau dan menindaklanjuti pengaduan Anda dengan standar waktu yang telah ditetapkan.",
                  color: "from-blue-600 to-blue-700",
                  bgGradient: "from-blue-50 to-blue-100",
                  number: "03",
                  delay: 0.3
                },
                {
                  icon: <FcOk size={50} />,
                  title: "Selesai",
                  desc: "Anda akan menerima notifikasi update status dan solusi yang komprehensif untuk masalah Anda.",
                  color: "from-blue-700 to-blue-800",
                  bgGradient: "from-blue-50 to-blue-100",
                  number: "04",
                  delay: 0.4
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ 
                    opacity: workflowInView ? 1 : 0, 
                    y: workflowInView ? 0 : 50,
                    scale: workflowInView ? 1 : 0.8
                  }}
                  transition={{ delay: step.delay, duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Step Number Badge */}
                  <motion.div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-20`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: workflowInView ? 1 : 0, 
                      rotate: workflowInView ? 0 : -180 
                    }}
                    transition={{ delay: step.delay + 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Hover Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Main Card */}
                  <div className="relative bg-white/95 backdrop-blur-sm border border-white/20 p-6 sm:p-8 pt-12 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Icon Container */}
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                      <div className="relative bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center w-20 h-20 mx-auto">
                        {step.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-200 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: workflowInView ? 1 : 0 }}
                      transition={{ delay: step.delay + 0.5 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: workflowInView ? "100%" : 0 }}
                        transition={{ delay: step.delay + 0.8, duration: 1 }}
                      />
                    </motion.div>

                    {/* Floating Particles */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: index * 0.2 
                      }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-secondary-400/40 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        delay: index * 0.3 
                      }}
                    />
                  </div>

                  {/* Connection Arrow (Desktop Only) */}
                  {index < 3 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-30"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: workflowInView ? 1 : 0, x: workflowInView ? 0 : -10 }}
                      transition={{ delay: step.delay + 0.6, duration: 0.5 }}
                    >
                      <MdKeyboardArrowRight 
                        className="text-blue-400 w-8 h-8 animate-pulse" 
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <motion.div
            className="text-center mt-16 bg-gradient-to-r from-blue-50 to-secondary-50 rounded-3xl p-8 border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: workflowInView ? 1 : 0, y: workflowInView ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              Estimasi Waktu Penyelesaian
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: "Keluhan Teknis", time: "1-2 Hari Kerja", icon: "⚡" },
                { type: "Masalah Akademik", time: "3-5 Hari Kerja", icon: "📚" },
                { type: "Fasilitas Kampus", time: "5-7 Hari Kerja", icon: "🏢" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: workflowInView ? 1 : 0, scale: workflowInView ? 1 : 0.9 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{item.type}</div>
                    <div className="text-sm text-blue-600 font-medium">{item.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimoni - Enhanced */}
      <section
        id="testimoni"
        ref={testimonialsRef}
        className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-blue-300/20 rounded-full blur-2xl"
          animate={{ 
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-secondary-200/20 rounded-full blur-2xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 120, 240]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: testimonialsInView ? 1 : 0, scale: testimonialsInView ? 1 : 0.8 }}
              transition={{ delay: 0.2 }}
            >
              Testimoni Pengguna
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6">
              Apa Kata{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Mereka
              </span>
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Dengarkan pengalaman langsung dari mahasiswa yang telah merasakan 
              kemudahan dan efektivitas platform SIPMAS.
            </p>
          </motion.div>

          {/* Main Testimonial Carousel */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: testimonialsInView ? 1 : 0, scale: testimonialsInView ? 1 : 0.9 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />

              {/* Quote Icon */}
              <motion.div
                className="absolute top-8 left-8 text-6xl text-blue-200"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: testimonialsInView ? 1 : 0, scale: testimonialsInView ? 1 : 0 }}
                transition={{ delay: 0.6 }}
              >
                <FaQuoteLeft />
              </motion.div>

              {/* Testimonial Content */}
              <div className="relative z-10 text-center">
                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-800 italic leading-relaxed mb-8 max-w-4xl mx-auto font-medium"
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  "{testimonials[currentTestimonial].quote}"
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  key={`${currentTestimonial}-author`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full shadow-lg border-4 border-blue-100"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-gray-800 text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-blue-600 font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <div className="flex justify-center sm:justify-start gap-1 mt-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <FaStar className="text-yellow-400 w-4 h-4" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiChevronLeft className="text-blue-600 w-5 h-5" />
              </motion.button>
              
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiChevronRight className="text-blue-600 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Secondary Testimonials Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`group relative ${index === currentTestimonial ? 'scale-105 z-10' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 20 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border cursor-pointer transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'border-blue-300 shadow-2xl bg-blue-50/50' 
                    : 'border-gray-200 hover:border-blue-200 hover:shadow-xl'
                }`}>
                  {/* Mini Quote */}
                  <motion.div
                    className="text-2xl text-blue-300 mb-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <FaQuoteLeft />
                  </motion.div>

                  <p className="text-gray-600 text-sm italic leading-relaxed mb-4 line-clamp-3">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full border-2 border-blue-100"
                    />
                    <div>
                      <h5 className="font-semibold text-gray-800 text-sm">
                        {testimonial.name}
                      </h5>
                      <p className="text-blue-600 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {index === currentTestimonial && (
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId="activeTestimonial"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 20 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                animate={{ 
                  x: [-100, 100],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Jadilah Bagian dari Perubahan!
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Bergabunglah dengan ribuan mahasiswa yang telah merasakan perbedaan 
                  dalam menyampaikan aspirasi. Suara Anda sangat berarti!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-600 font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Mulai Sekarang
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-2xl transition-all duration-300"
                    onClick={() => document.getElementById('/').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Pelajari Lebih Lanjut
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-3 sm:p-4 rounded-full shadow-strong transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 10, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        title="Kembali ke Atas"
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          ⬆️
        </motion.div>
      </motion.button>
    </div>
  );
}
