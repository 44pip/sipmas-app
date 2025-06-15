import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiUsers } from "react-icons/fi";

const menus = [
  { name: "Dashboard", path: "/adminDashboard", icon: <FiHome size={18} /> },
  { name: "Pengaduan", path: "/pengaduan", icon: <FiFileText size={18} /> },
  { name: "User", path: "/admin/users", icon: <FiUsers size={18} /> },
];

export default function SidebarMenu() {
  return (
    <nav className="mt-6 flex flex-col gap-2">
      {menus.map((menu, index) => (
        <NavLink
          key={index}
          to={menu.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow"
                : "text-gray-300 hover:bg-blue-700 hover:text-white"
            }`
          }
        >
          {menu.icon}
          <span>{menu.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
