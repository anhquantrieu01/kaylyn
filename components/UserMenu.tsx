
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/generated/prisma/client";



export default function UserMenu({ user }: { user: User }) {

  if (!user) return null;

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={'/images/avatar.webp'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1 text-sm font-medium">{user.name}</div>

        {user.role === "ADMIN" ? (
          <DropdownMenuItem asChild>
            <Link href="/admin">Trang quản trị</Link>
          </DropdownMenuItem>
        ) : user.role === "STAFF" ? (
          <DropdownMenuItem asChild>
            <Link href="/staff">Trang quản trị</Link>
          </DropdownMenuItem>
        ) : null}

        

        <DropdownMenuItem
          onClick={async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
            });
            window.location.reload();
          }}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}