"use client";

import Tiptap from "@/components/Tiptap";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Post } from "@/lib/generated/prisma/client";
import { FAQ } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import slugify from "slugify";

type Category = {
  id: string;
  name: string;
};

type PostWithCategory = Post & {
  category?: Category | null;
};

type FormData = {
  title: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  categoryId?: string;
  published: boolean;
  keywords?: string;
  faq: FAQ[]
};

export default function PostsPage() {
  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<FormData>({
      defaultValues: {
        faq: []
      }
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faq"
  })

  const [posts, setPosts] = useState<PostWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthUser();

  const slug = slugify(watch("title") || "", {
    lower: true,
    strict: true,
    locale: "vi",
  });

  const fetchPosts = async () => {
    const res = await fetch("/api/posts", {
      cache: "no-store",
    });
    const data = await res.json();
    setPosts(data.data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.data);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const uploadThumbnail = async (file: File) => {
    try {
      if (!slug) {
        return alert("Vui lòng nhập tiêu đề trước khi upload thumbnail");
      }
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slug);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setValue("thumbnail", data.url);

    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (editingId) {
      await fetch(`/api/posts/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          authorId: user?.id,
        }),
      });
    }

    reset();
    setEditingId(null);
    fetchPosts();
  };

  const editPost = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    console.log(data)

    reset({
      title: data.data.title || "",
      excerpt: data.data.excerpt || "",
      content: data.data.content || "",
      thumbnail: data.data.thumbnail || "",
      categoryId: data.data.categoryId || "",
      published: data.data.published ?? false,
      keywords: data.data.keywords || "",
      faq: data.data.faq || []
    });

    setEditingId(id);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    fetchPosts();
  };

  return (
  <div className="min-h-screen bg-pink-50 py-8 px-4">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* FORM */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-pink-100">
        <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-6">
          {editingId ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              (e.target as HTMLElement).tagName !== "TEXTAREA"
            ) {
              e.preventDefault();
            }
          }}
        >

          {/* TITLE */}
          <input
            {...register("title")}
            placeholder="Tiêu đề bài viết"
            className="w-full border border-pink-200 focus:border-pink-400 outline-none p-3 rounded-xl"
          />

          {/* KEYWORDS */}
          <input
            {...register("keywords")}
            placeholder="Keywords (cách nhau dấu phẩy)"
            className="w-full border border-pink-200 p-3 rounded-xl"
          />

          {/* THUMBNAIL */}
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadThumbnail(file);
              }}
              className="w-full border border-pink-200 p-2 rounded-xl"
            />

            {uploading && (
              <p className="text-sm text-gray-500">Đang upload...</p>
            )}

            {watch("thumbnail") && (
              <Image
                src={watch("thumbnail") || ""}
                alt="Thumbnail"
                width={300}
                height={180}
                className="rounded-lg border"
              />
            )}
          </div>

          {/* EXCERPT */}
          <textarea
            {...register("excerpt")}
            placeholder="Mô tả ngắn (SEO)"
            className="w-full border border-pink-200 focus:border-pink-400 outline-none p-3 rounded-xl"
          />

          {/* CATEGORY */}
          <select
            {...register("categoryId")}
            className="w-full border border-pink-200 p-3 rounded-xl"
          >
            <option value="">-- Chọn category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* FAQ */}
          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">FAQ</h3>

              <button
                type="button"
                onClick={() => append({ question: "", answer: "" })}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
              >
                + Thêm FAQ
              </button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-xl space-y-2 bg-gray-50"
              >
                <input
                  {...register(`faq.${index}.question`)}
                  placeholder="Câu hỏi"
                  className="w-full border p-2 rounded"
                />

                <textarea
                  {...register(`faq.${index}.answer`)}
                  placeholder="Câu trả lời"
                  className="w-full border p-2 rounded"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          {/* EDITOR */}
          <Tiptap
            value={watch("content") || ""}
            slug={slug}
            onChange={(content) => setValue("content", content)}
          />

          {/* PUBLISHED */}
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("published")} />
            Xuất bản
          </label>

          {/* ACTION */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl">
              {editingId ? "Cập nhật" : "Tạo bài viết"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  reset({
                    title: "",
                    excerpt: "",
                    content: "",
                    thumbnail: "",
                    categoryId: "",
                    published: false,
                    keywords: "",
                    faq: [],
                  });
                  setEditingId(null);
                }}
                className="bg-gray-200 px-5 py-2 rounded-xl"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* POSTS LIST */}
      <div className="bg-white shadow-xl rounded-2xl border border-pink-100 overflow-hidden">

        <div className="p-4 bg-pink-50 border-b">
          <h2 className="font-semibold text-pink-600 text-lg">
            Danh sách bài viết
          </h2>
        </div>

        {/* MOBILE LIST */}
        <div className="md:hidden divide-y">
          {posts.map((post) => (
            <div key={post.id} className="p-4 space-y-2">

              <p className="font-semibold">{post.title}</p>

              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={200}
                  height={120}
                  className="rounded"
                />
              )}

              <p className="text-sm text-gray-500">{post.slug}</p>

              <p className="text-sm">
                Category: {post.category?.name || "—"}
              </p>

              <p className="text-sm">
                Status:{" "}
                {post.published ? (
                  <span className="text-green-600">Published</span>
                ) : (
                  <span className="text-gray-400">Draft</span>
                )}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => editPost(post.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Ảnh</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-t hover:bg-pink-50 transition"
                >
                  <td className="p-3 font-medium">{post.title}</td>

                  <td className="p-3 text-center">
                    {post.thumbnail && (
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={80}
                        height={60}
                        className="rounded object-cover"
                      />
                    )}
                  </td>

                  <td className="p-3 text-gray-500">{post.slug}</td>

                  <td className="p-3 text-center">
                    {post.category?.name || "—"}
                  </td>

                  <td className="p-3 text-center">
                    {post.published ? (
                      <span className="text-green-600 font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="text-gray-400">Draft</span>
                    )}
                  </td>

                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => editPost(post.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
);
}