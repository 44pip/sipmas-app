import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";

const menus = [
  { name: "Dashboard", path: "/adminDashboard", icon: <FiHome size={18} /> },
  { name: "Pengaduan", path: "/pengaduan", icon: <FiFileText size={18} /> },
  { name: "User", path: "/users", icon: <FiUsers size={18} /> },
];

export default function SidebarMenu({ onItemClick }) {
  return (
    <nav className="mt-6 px-3 lg:px-2 xl:px-3 flex flex-col gap-2">
      {menus.map((menu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            delay: 0.1 + (index * 0.1), 
            duration: 0.5,
            type: "spring",
            stiffness: 150,
            damping: 15
          }}
          whileHover={{ 
            x: 4,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        >
          <NavLink
            to={menu.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 text-sm lg:text-xs xl:text-sm font-poppins font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20"
                  : "text-primary-200 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    rotate: isActive ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 12,
                    rotate: { duration: 0.8, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 8, -8, 0],
                    transition: { duration: 0.4 }
                  }}
                  className={`relative z-10 ${isActive ? "text-blue-500" : "text-gray-300 group-hover:text-blue-500"}`}
                >
                  {menu.icon}
                </motion.div>
                <motion.span 
                  className="select-none relative z-10 font-medium"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {menu.name}
                </motion.span>
                
                {/* Background glow effect for active item */}
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto relative z-10 flex items-center gap-1"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 bg-blue-400 rounded-full shadow-lg"
                    />
                    <motion.div
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 h-1 bg-blue-300 rounded-full"
                    />
                  </motion.div>
                )}
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/2 rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-xl opacity-0"
                  whileTap={{ 
                    scale: 0.95,
                    opacity: [0, 0.3, 0],
                    transition: { duration: 0.3 }
                  }}
                />
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </nav>
  );
}
