"use client";

import { User } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


type FormValues = User;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      role: "STAFF",
    },
  });

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (editingId) {
      await fetch(`/api/users/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      fetchUsers();
    } else {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      fetchUsers();
    }

    reset({
      name: "",
      email: "",
      password: "",
      role: "STAFF",
    });

    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("role", user.role);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete user?")) return;

    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-pink-600">
          User Management
        </h1>
        <p className="text-gray-500">
          Create, update and manage users
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow border space-y-4"
      >
        <h2 className="font-semibold text-lg">
          {editingId ? "Update User" : "Create User"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <input
              placeholder="Name"
              className="border p-2 rounded-lg w-full"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              placeholder="Email"
              className="border p-2 rounded-lg w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-lg w-full"
              {...register("password", {
                required: editingId
                  ? false
                  : "Password is required",
              })}
            />
          </div>

          {/* Role */}
          <div>
            <select
              className="border p-2 rounded-lg w-full"
              {...register("role")}
            >
              <option value="STAFF">Nhân viên</option>
              <option value="ADMIN">Quản trị</option>
              <option value="CUSTOMER">Khách hàng</option>
            </select>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          {editingId ? "Update User" : "Create User"}
        </button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-pink-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-pink-50"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded text-sm">
                    {user.role}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
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
  );
}