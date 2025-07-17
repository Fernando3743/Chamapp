"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full -top-72 -right-48 bg-primary-gradient blur-[100px] opacity-50 animate-float"></div>
        <div
          className="absolute w-96 h-96 rounded-full -bottom-48 -left-24 bg-gradient-to-br from-[#f093fb] to-[#f5576c] blur-[100px] opacity-50 animate-float"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute w-72 h-72 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] blur-[100px] opacity-50 animate-float"
          style={{ animationDelay: "10s" }}
        ></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary-gradient p-2 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 md:ml-[280px] relative z-10">
        {children}
      </div>
    </div>
  );
}