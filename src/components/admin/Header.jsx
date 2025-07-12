import React, { useEffect, useState } from "react";
import { HiMenu, HiBell, HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";

export default function Header({ onToggleSidebar }) {
  const [tanggal, setTanggal] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateFormatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      });
      const timeFormatter = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      });
      setTanggal(dateFormatter.format(now));
      setCurrentTime(timeFormatter.format(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-30 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl border-b border-secondary-200 shadow-lg"
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu button and title */}
          <div className="flex items-center gap-4">
            <motion.button
              data-sidebar-toggle
              onClick={onToggleSidebar}
              className="lg:hidden p-2.5 rounded-xl text-secondary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50 hover:text-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ 
                scale: 1.05, 
                rotate: 5,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
              }}
              whileTap={{ 
                scale: 0.95,
                rotate: -5
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              <HiMenu className="w-6 h-6" />
            </motion.button>
            
            <div className="hidden sm:block">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="text-xl lg:text-2xl font-poppins font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent"
              >
                Dashboard Admin
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="text-sm text-secondary-600 font-montserrat"
              >
                Kelola pengaduan mahasiswa dengan efisien
              </motion.p>
            </div>
          </div>

          {/* Center: Date and time for larger screens */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            className="hidden md:block text-center bg-gradient-to-br from-primary-50 to-blue-50 px-4 py-2 rounded-xl border border-primary-100 shadow-sm"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-semibold text-secondary-800 font-poppins">
              {tanggal}
            </div>
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs text-primary-600 font-montserrat font-medium"
            >
              {currentTime} WIB
            </motion.div>
          </motion.div>

          {/* Right: Search, notifications, and profile */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search button */}
            <motion.button
              className="p-2.5 text-secondary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50 hover:text-primary-700 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ 
                scale: 1.05, 
                rotate: -5,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
              title="Pencarian"
            >
              <HiSearch className="w-5 h-5" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-2.5 text-secondary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50 hover:text-primary-700 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ 
                scale: 1.05, 
                rotate: 5,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
              title="Notifikasi"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              >
                <HiBell className="w-5 h-5" />
              </motion.div>
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"
              ></motion.span>
            </motion.button>

            {/* Profile */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-secondary-200"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              <div className="hidden sm:block text-right">
                <motion.div 
                  className="text-sm font-semibold text-secondary-800 font-poppins"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Admin
                </motion.div>
                <motion.div 
                  className="text-xs text-primary-600 font-montserrat font-medium"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Administrator
                </motion.div>
              </div>
              <motion.div className="relative">
                <motion.img
                  src="https://avatar.iran.liara.run/public/24"
                  alt="Admin Avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-primary-200 shadow-md cursor-pointer"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 8px 25px -5px rgba(59, 130, 246, 0.3)",
                    rotate: [0, 5, -5, 0]
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
