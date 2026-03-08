"use client";

import { useForm } from "react-hook-form";
import { useCreateBooking } from "../hooks";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Booking } from "@/lib/generated/prisma/client";

type FormValues = Booking

type Props = {
  serviceId: string;
};

export default function BookingForm({ serviceId }: Props) {
  const { handleCreate, loading, success } = useCreateBooking();
  const { user, loading: userLoading } = useAuthUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    
    await handleCreate({
      ...data,
      userId: user?.id || null,
      serviceId,
    });

    reset();
  };

  if (userLoading) return <p>Đang tải...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-xl rounded-2xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold">Đặt lịch spa</h2>

      {/* Date */}
      <div>
        <label className="block font-medium">Chọn thời gian</label>
        <input
          type="datetime-local"
          min={new Date().toISOString().slice(0, 16)}
          {...register("date", { required: "Vui lòng chọn thời gian" })}
          className="w-full border rounded-lg p-2"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-medium">Số điện thoại</label>
        <input
          type="tel"
          {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
          className="w-full border rounded-lg p-2"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Note */}
      <div>
        <label className="block font-medium">Ghi chú</label>
        <textarea
          {...register("note")}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-linear-to-r from-pink-500 to-purple-500 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        {loading ? "Đang xử lý..." : "Đặt lịch"}
      </button>

      {success && (
        <p className="text-green-600 font-semibold">
          Đặt lịch thành công 🎉
        </p>
      )}
    </form>
  );
}