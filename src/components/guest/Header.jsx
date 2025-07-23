import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function HeaderGuest() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "#/", id: "beranda" },
    { label: "Tentang", href: "#tentang", id: "tentang" },
    { label: "Keunggulan", href: "#keunggulan", id: "keunggulan" },
    { label: "Alur Kerja", href: "#alurKerja", id: "alurKerja" },
    { label: "Testimoni", href: "#testimoni", id: "testimoni" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <LayoutGroup>
      <header className="sticky top-0 bg-white/95 backdrop-blur-lg shadow-soft z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="/img/logo.png"
                alt="Logo SIPMAS"
                className="w-12 sm:w-16 cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-primary-700 bg-primary-50"
                      : "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.a>
              ))}
              
              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Link
                  to="/login"
                  className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-strong font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800"

                  // className="ml-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-xl shadow-medium hover:shadow-strong font-semibold transition-all duration-300 hover:from-primary-700 hover:to-primary-800"
                >
                  Login
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-secondary-700 hover:bg-secondary-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-secondary-200 bg-white/95 backdrop-blur-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.id);
                      closeMobileMenu();
                    }}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === link.id
                        ? "text-primary-700 bg-primary-50 border-l-4 border-primary-500"
                        : "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                    whileHover={{ x: 4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.div
                  className="pt-4 border-t border-secondary-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 rounded-xl shadow-medium font-semibold text-center transition-all duration-300 hover:from-primary-700 hover:to-primary-800"
                  >
                    Login
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </LayoutGroup>
  );
}
