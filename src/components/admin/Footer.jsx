import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-center text-sm font-barlow text-teksSamping py-3">
      © {new Date().getFullYear()} SIPMAS. All rights reserved.
    </footer>
  );
}
