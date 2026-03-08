"use client";

import { Category } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



type FormData = {
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (editing) {
      await fetch(`/api/categories/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    setLoading(false);
    setEditing(null);
    reset();
    fetchCategories();
  };

  const startEdit = (cat: Category) => {
    setEditing(cat);
    setValue("name", cat.name);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xoá?")) return;

    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Quản lý Category
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow border border-pink-100 mb-8">
          <h2 className="text-lg font-semibold text-pink-500 mb-4">
            {editing ? "Cập nhật Category" : "Tạo Category"}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-3 items-start"
          >
            <div className="flex-1">
              <input
                {...register("name", {
                  required: "Tên category là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên quá ngắn",
                  },
                })}
                placeholder="Nhập tên category..."
                className="w-full border border-pink-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl transition"
            >
              {editing ? "Update" : "Create"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  reset();
                }}
                className="px-5 py-2 rounded-xl border border-pink-300 text-pink-500 hover:bg-pink-50"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white p-6 rounded-2xl shadow border border-pink-100">
          <h2 className="text-lg font-semibold text-pink-500 mb-4">
            Danh sách Category
          </h2>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center p-4 border border-pink-100 rounded-xl hover:bg-pink-50 transition"
              >
                <div>
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-sm text-gray-400">{cat.slug}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-500 rounded-lg hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <p className="text-center text-gray-400 py-6">
                Chưa có category
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}