import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import slugify from "slugify";

export async function GET() {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { name: "asc" },
    });

    return successResponse(categories, "Get service categories success", 200);
  } catch {
    return errorResponse("Fetch service categories failed", 500);
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

    const exist = await prisma.serviceCategory.findUnique({
      where: { slug },
    });

    if (exist) {
      slug = `${slug}-${Date.now()}`;
    }

    const category = await prisma.serviceCategory.create({
      data: {
        name: body.name,
        slug,
      },
    });

    return successResponse(category, "Create service category success", 201);
  } catch {
    return errorResponse("Create service category failed", 500);
  }
}
