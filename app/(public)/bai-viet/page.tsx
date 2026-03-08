import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const revalidate = 604800;


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title: "Blog làm đẹp Pleiku | Kaylyn Spa",
  description:
    "Chia sẻ kiến thức chăm sóc da, trị nám, meso căng bóng, filler môi và các xu hướng làm đẹp mới nhất tại Pleiku Gia Lai.",
  alternates: {
    canonical: `${baseUrl}/bai-viet`
  },
  openGraph: {
    title: "Blog làm đẹp Pleiku | Kaylyn Spa",
    description:
      "Cập nhật kiến thức chăm sóc da, meso, filler và trị nám mới nhất.",
    url: `${baseUrl}/bai-viet`,
    siteName: "Kaylyn Spa",
    locale: "vi_VN",
    type: "website"
  }
}

export default async function BlogPage() {

  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const featured = posts[0]
  const restPosts = posts.slice(1)

  return (

    <section className="max-w-6xl mx-auto px-4 py-12">


      <header className="mb-14 text-center">

        <h1 className="text-4xl font-bold mb-4">
          Blog làm đẹp
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá bí quyết chăm sóc da, điều trị nám, meso căng bóng và các
          xu hướng làm đẹp mới nhất tại Pleiku Gia Lai.
        </p>

      </header>



      {featured && (

        <Link href={`/bai-viet/${featured.slug}`}>

          <article className="group mb-14 grid md:grid-cols-2 gap-8 items-center border rounded-2xl overflow-hidden hover:shadow-xl transition bg-white">

            {featured.thumbnail && (

              <div className="overflow-hidden">

                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  width={600}
                  height={400}
                  priority
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

            )}

            <div className="p-6">

              <p className="text-sm text-pink-500 font-medium mb-2">
                Bài viết nổi bật
              </p>

              <h2 className="text-2xl font-bold mb-4 group-hover:text-pink-600 transition">
                {featured.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {featured.excerpt}
              </p>

              <time
                dateTime={featured.createdAt.toISOString()}
                className="text-sm text-gray-400"
              >
                {new Date(featured.createdAt).toLocaleDateString("vi-VN")}
              </time>

              <div className="mt-4 text-pink-600 font-medium">
                Đọc bài viết
              </div>

            </div>

          </article>

        </Link>

      )}




      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {restPosts.map((post) => (

          <Link key={post.id} href={`/bai-viet/${post.slug}`}>

            <article className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">

              {post.thumbnail && (

                <div className="overflow-hidden">

                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>

              )}

              <div className="p-5">

                <time
                  dateTime={post.createdAt.toISOString()}
                  className="text-sm text-gray-400 mb-2 block"
                >
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </time>

                <h2 className="font-semibold text-lg mb-3 group-hover:text-pink-600 transition">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 text-sm font-medium text-pink-600">
                  Xem chi tiết
                </div>

              </div>

            </article>

          </Link>

        ))}

      </div>

    </section>

  )

}