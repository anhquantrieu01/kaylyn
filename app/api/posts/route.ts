import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import { successResponse, errorResponse } from "@/lib/api-response";
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(posts, "Fetch posts success", 200);
  } catch (error) {
    console.log(error)
    return errorResponse("Fetch posts failed", 500);
  }
}

// CREATE POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    let slug = slugify(body.title, {
      lower: true,
      strict: true,
      locale: "vi",
    });

    const existing = await prisma.post.findUnique({
      where: { slug },
    });
    if (existing) {
      slug = slug + "-" + Date.now();
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt,
        thumbnail: body.thumbnail,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        keywords: body.keywords,
        faq: body.faq,
        published: body.published ?? false,
        publishedAt: body.published ? new Date() : null,
        authorId: body.authorId,
        categoryId: body.categoryId,
      },
    });

    return successResponse(post, "Create post success", 201);
  } catch (error) {
    console.log(error);
    return errorResponse("Create post failed", 500);
    
  }
}
