import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import slugify from "slugify";
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return successResponse(categories, "Get categories success", 200);
  } catch (error) {
    console.log(error);
    return errorResponse("Failed to fetch categories", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return errorResponse("Name is required", 400);
    }

    let slug = slugify(body.name, {
      lower: true,
      strict: true,
      locale: "vi",
    });

    const exist = await prisma.category.findUnique({
      where: { slug },
    });

    if (exist) {
      slug = `${slug}-${Date.now()}`;
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug,
      },
    });

    return successResponse(category, "Create category success", 201);
  } catch (error) {
    console.log(error)
    return errorResponse("Create category failed", 500);
  }
}