import React, { useEffect, useState } from "react";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/admin/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData) {
        navigate("/login");
        return;
      }

      if (userData.role !== "admin") {
        navigate("/forbidden");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAccess();
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // Only close sidebar on mobile devices
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, keep sidebar open by default
        setIsSidebarOpen(true);
      } else {
        // On mobile, keep sidebar closed by default
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 1024 && isSidebarOpen) {
        const sidebar = document.querySelector('[data-sidebar]');
        const toggleButton = document.querySelector('[data-sidebar-toggle]');
        
        if (sidebar && !sidebar.contains(event.target) && 
            toggleButton && !toggleButton.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-600 text-lg font-medium font-poppins">
            Memuat halaman...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen bg-secondary-50 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex flex-col flex-1 lg:ml-0 min-w-0">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-secondary-50 to-primary-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
