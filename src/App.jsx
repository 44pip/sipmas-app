import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
const Loading = React.lazy(() => import("./components/Loading"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MahasiswaLayout = React.lazy(() => import("./layouts/MahasiswaLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"))
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"))
const FormPengaduan = React.lazy(() => import("./pages/FormPengaduan"))
const DataPengaduan = React.lazy(() => import("./pages/DataPengaduan"))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="pengaduan" element={<DataPengaduan />} />
        </Route>

        <Route element={<AuthLayout />}>
         
        </Route>

        <Route element={<MahasiswaLayout />}>
          <Route path="formPengaduan" element={<FormPengaduan />} />
         
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
