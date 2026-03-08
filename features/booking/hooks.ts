"use client";

import { useState } from "react";
import { createBooking } from "./api";
import { Booking } from "@/lib/generated/prisma/client";

export function useCreateBooking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreate = async (data: Booking) => {
    try {
      setLoading(true);
      setSuccess(false);

      await createBooking(data);

      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreate,
    loading,
    success,
  };
}