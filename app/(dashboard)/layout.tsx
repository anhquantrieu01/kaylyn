"use client";

import Link from "next/link";
import { useState } from "react";

type Role = "ADMIN" | "STAFF";

export default function DashboardLayout({
  children,
  role = "ADMIN",
}: {
  children: React.ReactNode;
  role?: Role;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>("admin");

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="flex min-h-screen bg-pink-50 overflow-x-hidden">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static z-50
        w-64 h-screen
        bg-white border-r
        transform transition
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold text-pink-500">
            Dashboard
          </h1>
        </div>

        <nav className="p-4 space-y-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded hover:bg-pink-50"
          >
            Trang chủ
          </Link>
          {role === "ADMIN" && (
            <div>
              <button
                onClick={() => toggleMenu("admin")}
                className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-pink-100"
              >
                Admin
                <span>{openMenu === "admin" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "admin" && (
                <div className="ml-3 mt-2 space-y-1">
                  <Link
                    href="/admin/users"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Người dùng
                  </Link>
                  <Link
                    href="/admin/categories"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Danh mục bài viết
                  </Link>
                  <Link
                    href="/admin/service-categories"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Danh mục dịch vụ
                  </Link>
                  <Link
                    href="/admin/services"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Dịch vụ
                  </Link>
                  <Link
                    href="/admin/posts"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Bài viết
                  </Link>
                  <Link
                    href="/admin/bookings"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Đặt lịch
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* STAFF MENU */}
          {(role === "ADMIN" || role === "STAFF") && (
            <div>
              <button
                onClick={() => toggleMenu("staff")}
                className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-pink-100"
              >
                Staff
                <span>{openMenu === "staff" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "staff" && (
                <div className="ml-3 mt-2 space-y-1">
                  <a
                    href="/staff/bookings"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Bookings
                  </a>
                  <a
                    href="/staff/customers"
                    className="block px-3 py-2 rounded hover:bg-pink-50"
                  >
                    Customers
                  </a>
                </div>
              )}
            </div>
          )}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center px-4">
          <button
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h2 className="font-semibold">Dashboard</h2>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}