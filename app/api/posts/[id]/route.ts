import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
      },
    });

    if (!post) {
      return errorResponse("Post not found", 404);
    }

    return successResponse(post, "Fetch post success", 200);
  } catch (error) {
    console.log(error)
    return errorResponse("Fetch post failed", 500);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    let slug = body.title
      ? slugify(body.title, {
          lower: true,
          strict: true,
          locale: "vi",
        })
      : undefined;
    const existing = await prisma.post.findUnique({
      where: { slug },
    });
    if (existing) {
      slug = slug + "-" + Date.now();
    }
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt,
        thumbnail: body.thumbnail,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        keywords: body.keywords,
        published: body.published,
        publishedAt: body.published ? new Date() : null,
        categoryId: body.categoryId,
      },
    });

    return successResponse(post, "Update post success");
  } catch (error) {
    console.log(error);
    return errorResponse("Update post failed", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.post.delete({
      where: { id },
    });

    return successResponse(null, "Delete success", 200);
  } catch (error) {
    console.log(error)
    return errorResponse("Delete post failed", 500);
  }
}
