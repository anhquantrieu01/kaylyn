"use client";

import { BookingsType } from "@/types";
import { useEffect, useState } from "react";

type Booking = BookingsType;

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data.data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, []);

  const deleteBooking = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xoá booking?")) return;

    await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    fetchBookings();
  };

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Booking</h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        {/* MOBILE */}
        <div className="md:hidden divide-y">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 space-y-2">

              <div className="flex justify-between">
                <p className="font-semibold">{b.user?.name}</p>

                <span
                  className={`px-2 py-1 text-xs rounded ${statusColor[b.status]}`}
                >
                  {b.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Dịch vụ: {b.service?.title}
              </p>

              <p className="text-sm text-gray-600">
                Phone: {b.phone}
              </p>

              <p className="text-sm text-gray-600">
                {new Date(b.date).toLocaleString("vi-VN")}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSelected(b)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Sửa
                </button>

                <button
                  onClick={() => deleteBooking(b.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Xoá
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 text-left">Khách hàng</th>
                <th className="p-3 text-left">Dịch vụ</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Ngày</th>
                <th className="p-3 text-left">Trạng thái</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{b.user?.name}</td>
                  <td className="p-3">{b.service?.title}</td>
                  <td className="p-3">{b.phone}</td>

                  <td className="p-3">
                    {new Date(b.date).toLocaleString("vi-VN")}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${statusColor[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setSelected(b)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {selected && (
        <EditBookingModal
          booking={selected}
          onClose={() => setSelected(null)}
          onSuccess={fetchBookings}
        />
      )}
    </div>
  );
}

function EditBookingModal({
  booking,
  onClose,
  onSuccess,
}: {
  booking: Booking;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [date, setDate] = useState(
    new Date(booking.date).toISOString().slice(0, 16)
  );
  const [status, setStatus] = useState(booking.status);
  const [note, setNote] = useState(booking.note || "");
  const [loading, setLoading] = useState(false);

  const updateBooking = async () => {
    setLoading(true);

    await fetch(`/api/bookings/${booking.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: new Date(date).toISOString(),
        status,
        note,
      }),
    });

    setLoading(false);
    onClose();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

  <div className="bg-white rounded-xl p-6 w-full max-w-md">

    <h2 className="text-xl font-semibold mb-4">
      Cập nhật lịch đặt
    </h2>

    <div className="space-y-4">

      <div>
        <label className="text-sm">Ngày đặt</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="text-sm">Trạng thái</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as Booking["status"])
          }
          className="w-full border rounded p-2"
        >
          <option value="PENDING">Đang chờ</option>
          <option value="CONFIRMED">Đã xác nhận</option>
          <option value="DONE">Hoàn thành</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Ghi chú</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

    </div>

    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-5">

      <button
        onClick={onClose}
        className="px-4 py-2 border rounded"
      >
        Huỷ
      </button>

      <button
        onClick={updateBooking}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Đang lưu..." : "Cập nhật"}
      </button>

    </div>

  </div>

</div>
  );
}