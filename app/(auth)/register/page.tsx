"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Đăng ký thất bại");
        return;
      }

      router.push("/login");
    } catch {
      setError("Lỗi server, vui lòng thử lại.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-rose-50">

      {/* Card */}
      <section className="w-full max-w-md bg-white/80 p-8">

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Tạo tài khoản
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Đăng ký để sử dụng hệ thống
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Họ và tên
            </label>

            <input
              type="text"
              autoComplete="name"
              placeholder="Nguyễn Văn A"
              {...register("name", {
                required: "Tên là bắt buộc",
                minLength: {
                  value: 2,
                  message: "Tên quá ngắn",
                },
              })}
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
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
              autoComplete="new-password"
              placeholder="Ít nhất 6 ký tự"
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

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Số điện thoại (không bắt buộc)
            </label>

            <input
              type="tel"
              autoComplete="tel"
              placeholder="09xxxxxxxx"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{9,11}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Server error */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-linear-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg hover:scale-[1.02] transition disabled:opacity-60"
          >
            {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="text-pink-500 font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        </p>

        {/* Back home */}
        <div className="mt-4 text-center text-sm">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ← Quay lại trang chủ
          </Link>
        </div>

      </section>

    </main>
  );
}