"use client";

import { Service, ServiceCategory } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description?: string;
  price: number;
  salePrice?: number;
  discountPercent?: number;
  duration?: number;
  categoryId?: string;
  image?: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  // xác định user đang nhập ô nào
  const [editingField, setEditingField] = useState<
    "salePrice" | "discountPercent" | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const price = watch("price");
  const salePrice = watch("salePrice");
  const discountPercent = watch("discountPercent");

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/service-categories");
    const data = await res.json();
    setCategories(data.data);
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  // auto calculate đúng chiều (không còn nhảy số)
  useEffect(() => {
    if (!price) return;

    if (editingField === "salePrice") {
      if (salePrice === undefined || salePrice === null) return;

      const discount = Math.round(((price - salePrice) / price) * 100);

      if (!isNaN(discount)) {
        setValue("discountPercent", discount, {
          shouldDirty: true,
          shouldValidate: false,
        });
      }
    }

    if (editingField === "discountPercent") {
      if (discountPercent === undefined || discountPercent === null) return;

      const sale = Math.round(price - (price * discountPercent) / 100);

      if (!isNaN(sale)) {
        setValue("salePrice", sale, {
          shouldDirty: true,
          shouldValidate: false,
        });
      }
    }
  }, [salePrice, discountPercent, price, editingField, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (editing) {
      await fetch(`/api/services/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    reset();
    setEditing(null);
    setEditingField(null);
    setLoading(false);
    fetchServices();
  };

  const startEdit = (service: Service) => {
    setEditing(service);

    Object.entries(service).forEach(([key, value]) => {
      setValue(key as keyof FormData, value as unknown as string);
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa dịch vụ này?")) return;

    await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    fetchServices();
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Quản lý Services
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow border border-pink-100 mb-10">
          <h2 className="text-lg font-semibold text-pink-500 mb-4">
            {editing ? "Cập nhật dịch vụ" : "Tạo dịch vụ"}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              {...register("title", { required: "Tên dịch vụ bắt buộc" })}
              placeholder="Tên dịch vụ"
              className="input"
            />

            <select {...register("categoryId")} className="input">
              <option value="">Chọn danh mục</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              {...register("price", {
                required: "Nhập giá",
                valueAsNumber: true,
              })}
              placeholder="Giá"
              className="input"
            />

            <input
              type="number"
              {...register("salePrice", { valueAsNumber: true })}
              placeholder="Giá khuyến mãi"
              className="input"
              onFocus={() => setEditingField("salePrice")}
            />

            <input
              type="number"
              {...register("discountPercent", { valueAsNumber: true })}
              placeholder="% giảm"
              className="input"
              onFocus={() => setEditingField("discountPercent")}
            />

            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              placeholder="Thời gian (phút)"
              className="input"
            />

            <input
              {...register("image")}
              placeholder="URL hình ảnh"
              className="input md:col-span-2"
            />

            <textarea
              {...register("description")}
              placeholder="Mô tả dịch vụ"
              className="input md:col-span-2"
            />

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl"
                disabled={loading}
              >
                {editing ? "Update" : "Create"}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setEditingField(null);
                    reset();
                  }}
                  className="border border-pink-300 px-6 py-2 rounded-xl text-pink-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white p-6 rounded-2xl shadow border border-pink-100">
          <h2 className="text-lg font-semibold text-pink-500 mb-4">
            Danh sách dịch vụ
          </h2>

          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-4 border border-pink-100 rounded-xl flex justify-between items-center hover:bg-pink-50"
              >
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-gray-500">
                    Giá: {s.price?.toLocaleString()}đ
                  </p>
                  {s.salePrice && (
                    <p className="text-sm text-pink-500">
                      Sale: {s.salePrice.toLocaleString()}đ
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(s)}
                    className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1 bg-red-100 text-red-500 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <p className="text-center text-gray-400 py-6">
                Chưa có dịch vụ
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          border: 1px solid #fbcfe8;
          padding: 10px;
          border-radius: 12px;
          outline: none;
        }
        .input:focus {
          border-color: #f472b6;
          box-shadow: 0 0 0 2px #fbcfe8;
        }
      `}</style>
    </div>
  );
}