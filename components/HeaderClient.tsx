"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthUser } from "@/hooks/useAuthUser";
import { User } from "@/lib/generated/prisma/client";
import UserMenu from "./UserMenu";

type NavItem = {
  href: string;
  label: string;
};

export default function HeaderClient({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuthUser();

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Login */}
        {!loading && !user && (
          <Link
            href="/login"
            className="hidden md:inline-flex px-5 py-2 rounded-full bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition"
          >
            Đăng nhập
          </Link>
        )}

        {user && <UserMenu user={user as User} />}

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-neutral-800" />
          <span className="w-6 h-0.5 bg-neutral-800" />
          <span className="w-6 h-0.5 bg-neutral-800" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-t shadow-lg md:hidden"
        >
          <nav className="max-w-7xl mx-auto px-6 py-6">
            <ul className="flex flex-col gap-5 text-sm font-semibold text-neutral-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-rose-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  );
}