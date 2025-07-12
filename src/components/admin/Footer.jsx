import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-lg border-t border-secondary-200 shadow-soft">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-secondary-600 gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="Logo SIPMAS"
              className="w-6"
            />
            <span className="font-montserrat">
              © {new Date().getFullYear()} SIPMAS - Sistem Pengaduan Mahasiswa
            </span>
          </div>
          <p className="font-montserrat">
            Dibuat dengan{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-blue-500"
            >
              ❤️
            </motion.span>{" "}
            untuk kampus yang lebih baik
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
