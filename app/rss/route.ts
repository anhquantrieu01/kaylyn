import { prisma } from "@/lib/prisma"
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
export async function GET() {

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 20
  })

  const items = posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/bai-viet/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${post.publishedAt}</pubDate>
    </item>
  `).join("")

  const xml = `
  <rss version="2.0">
    <channel>
      <title>Kaylyn Spa Blog</title>
      <link>${baseUrl}/bai-viet</link>
      <description>Chăm sóc da chuyên sâu</description>
      ${items}
    </channel>
  </rss>
  `

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  })
}