import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Sparkles,
} from "lucide-react";

import Pagination from "@/components/Pagination";

// export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Blog làm đẹp Pleiku | Kaylyn Spa",
  description:
    "Chia sẻ kiến thức chăm sóc da, trị nám, meso căng bóng, filler môi tại Pleiku Gia Lai.",
  alternates: {
    canonical: `${baseUrl}/bai-viet`,
  },
};

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function BlogPage({
  searchParams,
}: Props) {


  const params = await searchParams;
  const page = Math.max(
    1,
    Number(params?.page ?? 1) || 1
  );
  const skip = (page - 1) * PAGE_SIZE;

  const [totalPosts, posts] = await Promise.all([
    prisma.post.count({
      where: { published: true },
    }),

    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(
    totalPosts / PAGE_SIZE
  );

  const featured = page === 1 ? posts[0] : null;
  const restPosts = featured
    ? posts.slice(1)
    : posts;

  return (
    <main className="bg-linear-to-b from-pink-50 via-white to-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.15),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Beauty Blog
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Blog làm đẹp
              <span className="block text-pink-500">
                Kaylyn Spa
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
        {/* FEATURED (chỉ page 1) */}
        {featured && (
          <Link
            href={`/bai-viet/${featured.slug}`}
            className="block mb-16"
          >
            <article className="grid lg:grid-cols-2 bg-white rounded-4xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-xl transition">
              {featured.thumbnail && (
                <div className="relative h-80">
                  <Image
                    src={featured.thumbnail}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 leading-7 line-clamp-2 group-hover:text-pink-600">
                  {featured.title}
                </h2>

                <p className="text-gray-600 line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>
            </article>
          </Link>
        )}

        {/* POSTS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {restPosts.map((post) => (
            <Link
              key={post.id}
              href={`/bai-viet/${post.slug}`}
              className="group"
            >
              <article className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">
                {post.thumbnail && (
                  <div className="relative h-60">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold group-hover:text-pink-600 leading-7 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            Chưa có bài viết nào
          </div>
        )}

        {/* PAGINATION COMPONENT */}
        <Pagination totalPages={totalPages} />
      </section>
    </main>
  );
}