import { prisma } from "@/lib/prisma"
import { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    select: {
      slug: true,
      updatedAt: true
    }
  })

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/bai-viet/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: `${baseUrl}/bai-viet`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...postUrls
  ]
}