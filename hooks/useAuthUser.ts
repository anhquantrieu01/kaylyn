"use client";

import { User } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.status === 401) {
        await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        const retry = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!retry.ok) {
          setUser(null);
          return;
        }

        const data = await retry.json();
        setUser(data.data.user);
        return;
      }

      const data = await res.json();
      setUser(data.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refetchUser: fetchUser };
}