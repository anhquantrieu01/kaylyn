"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-500 via-rose-500 to-fuchsia-600 px-6">
      <div className="absolute w-125 h-125 bg-pink-400 blur-[150px] opacity-30 rounded-full -top-25" />
      <div className="absolute w-100 h-100 bg-fuchsia-500 blur-[140px] opacity-30 rounded-full -bottom-30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 max-w-xl w-full text-center text-white shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">
            🔒
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-3">
          403 - Không có quyền truy cập
        </h1>

        <p className="text-white/80 mb-8">
          Trang này yêu cầu quyền truy cập đặc biệt. Có thể bạn chưa đăng nhập
          hoặc tài khoản của bạn không có quyền vào khu vực này.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-pink-600 font-semibold hover:scale-105 transition"
          >
            Trang chủ
          </Link>


        </div>

        <p className="text-xs text-white/70 mt-8">
          Nếu bạn nghĩ đây là lỗi, hãy liên hệ quản trị viên.
        </p>
      </motion.div>
    </div>
  );
}