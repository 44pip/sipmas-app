import React, { useEffect, useState } from "react";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/admin/Footer";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="p-6 font-poppins">Memuat halaman...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
