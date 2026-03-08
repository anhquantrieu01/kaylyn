import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { autoInternalLink } from "@/lib/autoInternalLink"
import { getHeadings } from "@/lib/getHeadings"
import { addHeadingId } from "@/lib/addHeadingId"
import { FAQ } from "@/types"
import Image from "next/image"
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
export const revalidate = 604800;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug }
  })

  if (!post) return {}

  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc,
    keywords: post.keywords?.split(",").map(k => k.trim()),
    alternates: {
      canonical: `${baseUrl}/bai-viet/${post.slug}`
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc,
      images: [post.thumbnail]
    }
  }
}

export async function generateStaticParams() {

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true }
  })

  return posts.map(post => ({
    slug: post.slug
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true
    }
  })

  if (!post) return notFound()

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      title: true,
      slug: true
    }
  })

  const linkedContent = autoInternalLink(
    post.content || "",
    posts,
    post.slug
  )

  const content = addHeadingId(linkedContent)

  const headings = getHeadings(post.content || "")

  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      categoryId: post.categoryId,
      slug: {
        not: post.slug
      }
    },
    select: {
      title: true,
      slug: true,
      thumbnail: true
    },
    take: 4
  })

  const faq = post.faq as FAQ[] | null

  return (

    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}

      <nav className="text-sm text-gray-500 mb-6">

        <Link href="/">Trang chủ</Link>
        {" / "}
        <Link href="/bai-viet">Bài Viết</Link>
        {" / "}
        <span className="text-gray-700">{post.title}</span>

      </nav>


      <div className="grid lg:grid-cols-[1fr_300px] gap-10">


        {/* MAIN CONTENT */}

        <article>

          <h1 className="text-3xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-500 mb-6 font-semibold">
            {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </p>


          {post.thumbnail && (

            <Image
              src={post.thumbnail}
              alt={post.title}
              className="rounded-xl mb-8 w-full object-cover"
              width={800}
              height={500}
              priority
              sizes="(max-width:768px) 100vw, 800px"
            />

          )}


          <p className="text-lg text-gray-700 mb-6">
            {post.excerpt}
          </p>


          {/* TOC MOBILE */}

          {headings.length > 0 && (

            <div className="lg:hidden border rounded-xl p-5 mb-8 bg-gray-50">

              <h3 className="font-bold mb-4">
                Mục lục
              </h3>

              <ul className="space-y-2 text-sm">

                {headings.map((h, i) => {

                  const id = h
                    .toLowerCase()
                    .replace(/[^a-z0-9à-ỹ\s]/g, "")
                    .trim()
                    .replace(/\s+/g, "-")

                  return (

                    <li key={i}>

                      <a
                        href={`#${id}-${i}`}
                        className="text-gray-600 hover:text-pink-600"
                      >
                        {h}
                      </a>

                    </li>

                  )

                })}

              </ul>

            </div>

          )}


          {/* CONTENT */}

          <div
            className="tiptap-content"
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />


          {/* FAQ */}

          {faq && faq.length > 0 && (

            <div className="mt-16">

              <h2 className="text-2xl font-bold mb-6">
                Câu hỏi thường gặp
              </h2>

              <div className="space-y-4">

                {faq.map((item: FAQ, i: number) => (

                  <div
                    key={i}
                    className="border rounded-xl p-5 bg-gray-50"
                  >

                    <p className="font-semibold">
                      {item.question}
                    </p>

                    <p className="text-gray-700 mt-2">
                      {item.answer}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          )}

        </article>



        {/* SIDEBAR DESKTOP */}

        <aside className="space-y-8">

          {headings.length > 0 && (

            <div className="hidden lg:block border rounded-xl p-5 bg-white lg:sticky lg:top-24 lg:max-h-[70vh] overflow-auto">

              <h3 className="font-bold mb-4">
                Mục lục
              </h3>

              <ul className="space-y-2 text-sm">

                {headings.map((h, i) => {

                  const id = h
                    .toLowerCase()
                    .replace(/[^a-z0-9à-ỹ\s]/g, "")
                    .trim()
                    .replace(/\s+/g, "-")

                  return (

                    <li key={i}>

                      <a
                        href={`#${id}-${i}`}
                        className="text-gray-600 hover:text-pink-600"
                      >
                        {h}
                      </a>

                    </li>

                  )

                })}

              </ul>

            </div>

          )}

        </aside>


      </div>



      {/* RELATED POSTS */}

      {relatedPosts.length > 0 && (

        <section className="mt-20">

          <h2 className="text-2xl font-bold mb-8">
            Bài viết liên quan
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedPosts.map(p => (

              <Link
                key={p.slug}
                href={`/bai-viet/${p.slug}`}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                {p.thumbnail && (

                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-40 w-full object-cover"
                    width={400}
                    height={300}
                    priority
                    sizes="(max-width:768px) 100vw, 800px"
                  />

                )}

                <div className="p-4">

                  <h3 className="font-semibold text-sm hover:text-pink-600">
                    {p.title}
                  </h3>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.thumbnail,
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            author: {
              "@type": "Person",
              name: post.author?.name
            },
            publisher: {
              "@type": "Organization",
              name: "Kaylyn Spa",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`
              }
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${baseUrl}/bai-viet/${post.slug}`
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: baseUrl
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Bài viết",
                item: `${baseUrl}/bai-viet`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${baseUrl}/bai-viet/${post.slug}`
              }
            ]
          })
        }}
      />

      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map(item => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer
                }
              }))
            })
          }}
        />
      )}

    </main>

  )

}