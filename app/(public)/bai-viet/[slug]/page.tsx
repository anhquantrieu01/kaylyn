import { notFound } from "next/navigation";
import Link from "next/link";
import { FAQ } from "@/types";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  CalendarDays,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL;

// export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  });

  if (!post) return {};

  const title = post.seoTitle || post.title;

  const description =
    post.seoDesc ||
    post.excerpt ||
    post.title;

  const url =
    `${baseUrl}/bai-viet/${post.slug}`;

  return {
    title,

    description,

    keywords: post.keywords
      ?.split(",")
      .map((k) => k.trim()),

    authors: [
      {
        name:
          post.author?.name ||
          "Kaylyn Spa",
      },
    ],

    robots: {
      index: post.published,
      follow: post.published,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,

      url,

      siteName: "Kaylyn Spa",

      locale: "vi_VN",

      type: "article",

      publishedTime:
        post.createdAt.toISOString(),

      modifiedTime:
        post.updatedAt.toISOString(),

      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [post.thumbnail],
    },
  };
}

// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     select: { slug: true },
//   });

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },

    include: {
      author: true,
      category: true,
    },
  });

  if (!post) return notFound();

  const relatedPosts =
    await prisma.post.findMany({
      where: {
        published: true,

        categoryId: post.categoryId,

        slug: {
          not: post.slug,
        },
      },

      select: {
        title: true,
        slug: true,
        thumbnail: true,
        excerpt: true,
        createdAt: true,
      },

      take: 4,
    });

  const faq = post.faq as FAQ[] | null;

  const content =
    typeof post.content === "string"
      ? post.content
      : "";

  return (
    <main className="bg-linear-to-b from-pink-50 via-white to-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-pink-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.15),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
            <Link
              href="/"
              className="hover:text-pink-600 transition"
            >
              Trang chủ
            </Link>

            <ChevronRight className="w-4 h-4" />

            <Link
              href="/bai-viet"
              className="hover:text-pink-600 transition"
            >
              Bài viết
            </Link>

            <ChevronRight className="w-4 h-4" />

            <span className="text-gray-800 line-clamp-1">
              {post.title}
            </span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Beauty Blog
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 leading-8 mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />

                <time
                  dateTime={post.createdAt.toISOString()}
                >
                  {new Date(
                    post.createdAt
                  ).toLocaleDateString("vi-VN")}
                </time>
              </div>

              

              {post.category?.name && (
                <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                  {post.category.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* MAIN */}
          <article className="min-w-0">
            {post.thumbnail && (
              <div className="relative overflow-hidden rounded-4xl mb-10 shadow-xl">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={1200}
                  height={700}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-4xl border border-gray-100 shadow-sm p-6 md:p-10">
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>

            {/* FAQ */}
            {faq && faq.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Câu hỏi thường gặp
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Giải đáp nhanh các thắc mắc phổ
                      biến
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {faq.map(
                    (item: FAQ, i: number) => (
                      <div
                        key={i}
                        className="bg-white border border-pink-100 rounded-3xl p-6 shadow-sm"
                      >
                        <h3 className="font-bold text-lg text-gray-900 mb-3">
                          {item.question}
                        </h3>

                        <p className="text-gray-600 leading-8">
                          {item.answer}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="sticky top-24">
              <div className="bg-white border border-pink-100 rounded-4xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  Bài viết liên quan
                </h3>

                <div className="space-y-5">
                  {relatedPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/bai-viet/${p.slug}`}
                      className="group flex gap-4"
                    >
                      {p.thumbnail && (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                          <Image
                            src={p.thumbnail}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition">
                          {p.title}
                        </h4>

                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(
                            p.createdAt
                          ).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 bg-linear-to-br from-pink-500 to-rose-500 rounded-4xl p-8 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold leading-tight mb-4">
                    Đặt lịch chăm sóc da tại Kaylyn
                    Spa
                  </h3>

                  <p className="text-pink-100 leading-7 mb-6">
                    Tư vấn miễn phí cùng chuyên viên
                    giàu kinh nghiệm.
                  </p>

                  <Link
                    href="/dich-vu"
                    className="inline-flex items-center gap-2 bg-white text-pink-600 px-5 py-3 rounded-2xl font-semibold hover:bg-pink-50 transition"
                  >
                    Xem dịch vụ
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ARTICLE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",

            "@type": "Article",

            headline: post.title,

            description: post.excerpt,

            image: post.thumbnail,

            datePublished:
              post.createdAt,

            dateModified:
              post.updatedAt,

            author: {
              "@type": "Person",
              name: post.author?.name,
            },

            publisher: {
              "@type": "Organization",

              name: "Kaylyn Spa",

              logo: {
                "@type": "ImageObject",

                url: `${baseUrl}/logo.png`,
              },
            },

            mainEntityOfPage: {
              "@type": "WebPage",

              "@id": `${baseUrl}/bai-viet/${post.slug}`,
            },
          }),
        }}
      />

      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",

            "@type":
              "BreadcrumbList",

            itemListElement: [
              {
                "@type": "ListItem",

                position: 1,

                name: "Trang chủ",

                item: baseUrl,
              },

              {
                "@type": "ListItem",

                position: 2,

                name: "Bài viết",

                item: `${baseUrl}/bai-viet`,
              },

              {
                "@type": "ListItem",

                position: 3,

                name: post.title,

                item: `${baseUrl}/bai-viet/${post.slug}`,
              },
            ],
          }),
        }}
      />

      {/* FAQ SCHEMA */}
      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context":
                "https://schema.org",

              "@type": "FAQPage",

              mainEntity: faq.map(
                (item) => ({
                  "@type":
                    "Question",

                  name: item.question,

                  acceptedAnswer: {
                    "@type":
                      "Answer",

                    text: item.answer,
                  },
                })
              ),
            }),
          }}
        />
      )}
    </main>
  );
}