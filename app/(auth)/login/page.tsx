"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message || "Đăng nhập thất bại");
        return;
      }

      const { accessToken, user } = result.data;

      localStorage.setItem("accessToken", accessToken);

      if (user.role === "ADMIN") router.push("/admin");
      else if (user.role === "STAFF") router.push("/staff");
      else router.push("/");
    } catch {
      setError("Lỗi server, vui lòng thử lại.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-rose-50 px-4">

      {/* Card */}
      <section
        className="w-full max-w-md bg-white/80  p-8"
        aria-labelledby="login-heading"
      >

        {/* Header */}
        <header className="text-center mb-8">
          <h1
            id="login-heading"
            className="text-3xl font-bold bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
          >
            Đăng nhập
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Quản lý hệ thống Kaylyn Spa
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              autoComplete="email"
              placeholder="admin@email.com"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email không hợp lệ",
                },
              })}
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Mật khẩu
            </label>

            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password là bắt buộc",
                minLength: {
                  value: 6,
                  message: "Ít nhất 6 ký tự",
                },
              })}
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-linear-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg hover:scale-[1.02] transition disabled:opacity-60"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="text-pink-500 font-semibold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>

        {/* Back home */}
        <div className="mt-4 text-center text-sm">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </section>

    </main>
  );
}