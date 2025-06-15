import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
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
