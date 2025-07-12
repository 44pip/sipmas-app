import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { ToastProvider } from "./components/Toast";

const Loading = React.lazy(() => import("./components/Loading"));

//auth
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));

//mahasiswa
const MahasiswaLayout = React.lazy(() => import("./layouts/MahasiswaLayout"));
const FormPengaduan = React.lazy(() => import("./pages/mahasiswa/FormPengaduan"));
const Riwayat = React.lazy(() => import("./pages/mahasiswa/Riwayat"));

//admin
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const DataPengaduan = React.lazy(() => import("./pages/admin/DataPengaduan"));
const DetailPengaduan = React.lazy(() => import("./pages/admin/DetailPengaduan"));
const User = React.lazy(() => import("./pages/admin/User"));

//guest
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const Guest = React.lazy(() => import("./pages/Guest"));

function App() {
  return (
    <ToastProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="adminDashboard" element={<AdminDashboard />} />
            <Route path="pengaduan" element={<DataPengaduan />} />
            <Route path="detailPengaduan/:id" element={<DetailPengaduan />} />
            <Route path="users" element={<User />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<Forgot />} />
          </Route>

          <Route element={<MahasiswaLayout />}>
            <Route path="formPengaduan" element={<FormPengaduan />} />
            <Route path="riwayat" element={<Riwayat />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Guest />} />
          </Route>
        </Routes>
      </Suspense>
    </ToastProvider>
  );
}

export default App;
