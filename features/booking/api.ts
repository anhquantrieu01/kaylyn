import { fetchAuth } from "@/lib/fetchAuth";
import { Booking } from "@/lib/generated/prisma/client";

export async function createBooking(data: Booking) {
  const res = await fetchAuth("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res) throw new Error("Unauthorized");

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Create booking failed");
  }

  return json.data;
}

export async function getMyBookings() {
  const res = await fetchAuth("/api/bookings");

  if (!res) throw new Error("Unauthorized");

  const json = await res.json();

  return json.data;
}