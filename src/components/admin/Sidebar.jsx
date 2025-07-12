import { IoIosLock } from "react-icons/io";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from "react-router-dom";
import { HiSpeakerphone } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleMenuClick = () => {
    // Only close sidebar on mobile when menu item is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        data-sidebar
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          mass: 0.8
        }}
        className={`fixed lg:relative lg:translate-x-0 z-50 w-72 lg:w-64 bg-gradient-to-b from-primary-800 via-primary-900 to-blue-900 text-white flex flex-col justify-between min-h-screen shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="p-6 lg:p-4 xl:p-6 text-center border-b border-primary-700/30 relative"
          >
            {/* Mobile Close Button */}
            <motion.button
              onClick={onClose}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
              whileHover={{ 
                scale: 1.1,
                rotate: 90,
                backgroundColor: "rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </motion.button>
            
            <div className="flex items-center justify-center gap-3 text-2xl lg:text-xl xl:text-2xl font-poppins font-extrabold tracking-wide">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatDelay: 6,
                  ease: "easeInOut"
                }}
                className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.6 }
                }}
              >
                <HiSpeakerphone className="text-white" />
              </motion.div>
              <motion.span 
                className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                SIPMAS
              </motion.span>
            </div>
            <motion.div 
              className="text-xs font-montserrat text-primary-200 mt-2 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Sistem Pengaduan Mahasiswa
            </motion.div>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "3rem", opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 mx-auto mt-3 rounded-full shadow-lg"
            />
          </motion.div>
          
          <SidebarMenu onItemClick={handleMenuClick} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="p-4 lg:p-3 xl:p-4 border-t border-primary-700/30 text-sm font-montserrat text-primary-200 bg-gradient-to-t from-primary-900/50 to-transparent"
        >
          <motion.div 
            className="mb-3 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs bg-primary-700/50 px-2 py-1 rounded-full">
              Versi 1.0.0
            </span>
          </motion.div>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -3px rgba(239, 68, 68, 0.4)",
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <IoIosLock size={18} />
            </motion.div>
            Keluar
          </motion.button>
        </motion.div>
      </motion.aside>
    </>
  );
}
