import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
const Loading = React.lazy(() => import("./components/Loading"));

//auth
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));

//mahasiswa
const MahasiswaLayout = React.lazy(() => import("./layouts/MahasiswaLayout"));
const MahasiswaDashboard = React.lazy(() => import("./pages/mahasiswa/Dashboard"));
const FormPengaduan = React.lazy(() => import("./pages/mahasiswa/FormPengaduan"));

//admin
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const DataPengaduan = React.lazy(() => import("./pages/admin/DataPengaduan"));

//guest
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const Guest = React.lazy(() => import("./pages/Guest"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="pengaduan" element={<DataPengaduan />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        <Route element={<MahasiswaLayout />}>
          <Route path="mahasiswaDashboard" element={<MahasiswaDashboard />} />
          <Route path="formPengaduan" element={<FormPengaduan />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Guest />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
