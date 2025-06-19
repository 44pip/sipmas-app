import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 overflow-x-hidden px-4 font-poppins">
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-xl max-w-md w-full transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 leading-snug font-lato bold">
            Sistem Pengaduan Mahasiswa
          </h1>
        </div>

        <Outlet />

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6 font-montserrat italic">
          © 2025 Sistem Pengaduan Mahasiswa <br className="sm:hidden" />
          All rights reserved.
        </p>
      </div>
    </div>
  );
}

