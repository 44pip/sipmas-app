import { useState } from "react";
import { FcPrivacy } from "react-icons/fc";
import { FaUserClock } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsFillSendCheckFill } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";

export default function HeaderGuest() {
  const [activeSection, setActiveSection] = useState("beranda");

  const navLinks = [
    { label: "Beranda", href: "#/", id: "beranda" },
    { label: "Tentang", href: "#tentang", id: "tentang" },
    { label: "Keunggulan", href: "#keunggulan", id: "keunggulan" },
    { label: "Alur Kerja", href: "#alurKerja", id: "alurKerja" },
    { label: "Testimoni", href: "#testimoni", id: "testimoni" },
  ];

  return (
    <LayoutGroup>
      <header className="sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-50">
        <div className="w-full px-8 md:px-16 py-3 flex justify-between items-center">
          {/* Logo dengan animasi */}
          <motion.img
            src="/img/logo.png"
            alt="Logo SIPMAS"
            className="w-24 cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`relative font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-blue-700 scale-105"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="group relative inline-block pb-1">
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-600 rounded"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </span>
              </motion.a>
            ))}

            {/* Tombol Login */}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 font-semibold transition"
            >
              Login
            </motion.a>
          </nav>
        </div>
      </header>
    </LayoutGroup>
  );
}
