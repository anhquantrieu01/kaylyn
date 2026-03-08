"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceCategory } from "@/types";
import { Service } from "@/lib/generated/prisma/client";

export default function ServicesFilter({
  categories,
}: {
  categories: ServiceCategory[];
}) {
  const [selected, setSelected] = useState("all");

  const filtered =
    selected === "all"
      ? categories
      : categories.filter((c: ServiceCategory) => c.slug === selected);

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-linear-to-b from-pink-50 via-white to-purple-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Dịch vụ của chúng tôi
          </h1>
          <p className="text-gray-500 mt-3">
            Chăm sóc sắc đẹp chuyên nghiệp – công nghệ hiện đại
          </p>
        </div>

        {/* Select */}
        <div className="flex justify-center mb-14">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-200 shadow-sm px-6 py-3 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="all">Tất cả dịch vụ</option>
              {categories.map((c: ServiceCategory) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
        </div>

        {filtered.map((category: ServiceCategory) => (
          <section key={category.id} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-8 bg-pink-400 rounded-full" />
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service: Service) => (
                <article
                  key={service.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                >
                  {service.image && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={500}
                        height={350}
                        className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                      />

                      {service.discountPercent && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                          -{service.discountPercent}%
                        </span>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {service.title}
                    </h3>

                    {service.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {service.description}
                      </p>
                    )}

                    {/* price */}
                    <div className="flex items-center gap-3 mt-4">
                      {service.salePrice || service.salePrice === 0 ? (
                        <>
                          <span className="text-pink-600 font-bold text-lg">
                            {service.salePrice.toLocaleString()}đ
                          </span>
                          <span className="line-through text-gray-400 text-sm">
                            {service.price.toLocaleString()}đ
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">
                          {service.price.toLocaleString()}đ
                        </span>
                      )}
                    </div>

                    {service.duration && (
                      <p className="text-xs text-gray-400 mt-2">
                        ⏱ {service.duration} phút
                      </p>
                    )}

                    <Link
                      href={`/dich-vu/${service.slug}/dat-lich`}
                      className="mt-auto  w-full text-center bg-linear-to-r from-pink-500 to-purple-500 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition"
                    >
                      Đặt lịch ngay
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}