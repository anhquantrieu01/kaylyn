"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const changePage = (page: number) => {

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
    router.refresh();
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="
        flex items-center justify-center
        h-10 w-10
        rounded-lg
        border
        bg-white
        hover:bg-gray-100
        transition
        disabled:opacity-40
        disabled:cursor-not-allowed
        "
      >
        <ArrowLeft size={18} />
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => changePage(p)}
          className={`
            h-10 min-w-10
            px-3
            rounded-lg
            border
            text-sm font-medium
            transition
            ${
              p === currentPage
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white hover:bg-gray-100"
            }
          `}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="
        flex items-center justify-center
        h-10 w-10
        rounded-lg
        border
        bg-white
        hover:bg-gray-100
        transition
        disabled:opacity-40
        disabled:cursor-not-allowed
        "
      >
        <ArrowRight size={18} />
      </button>

    </div>
  );
}