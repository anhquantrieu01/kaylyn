import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      <div className="hidden lg:flex relative items-center justify-center bg-linear-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-white p-12 overflow-hidden">

        <div className="absolute w-96 h-96 bg-white/20 blur-3xl rounded-full top-10 left-10" />
        <div className="absolute w-96 h-96 bg-pink-300/30 blur-3xl rounded-full bottom-10 right-10" />

        <div className="relative max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-bold leading-tight">
            Kaylyn Spa
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Chuyên meso, filler môi, botox, peel da và trẻ hoá da tại Pleiku, Gia Lai.
          </p>

          <p className="text-white/70 text-sm">
            Quản lý lịch hẹn • Dịch vụ • Khách hàng
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-rose-50 px-6">

        <div className="w-full max-w-md">

          <div className="bg-white/80 backdrop-blur-xl border border-pink-100 shadow-xl rounded-3xl p-8">
            {children}
          </div>

        </div>
      </div>

    </div>
  );
}