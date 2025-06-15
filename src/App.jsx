import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
const Loading = React.lazy(() => import("./components/Loading"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MahasiswaLayout = React.lazy(() => import("./layouts/MahasiswaLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const FormPengaduan = React.lazy(() => import("./pages/FormPengaduan"));
const DataPengaduan = React.lazy(() => import("./pages/DataPengaduan"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/forgot"));
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
          <Route path="dashboard" element={<Dashboard />} />
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
