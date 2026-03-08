import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import slugify from "slugify";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!category) {
      return errorResponse("Category not found", 404);
    }

    return successResponse(category, "Get category success", 200);
  } catch (error) {
    console.log(error)
    return errorResponse("Fetch category failed", 500);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    let slug;

    if (body.name) {
      slug = slugify(body.name, {
        lower: true,
        strict: true,
        locale: "vi",
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        slug,
      },
    });

    return successResponse(updatedCategory, "Update category success", 200);
  } catch {
    return errorResponse("Update category failed", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.category.delete({
      where: { id },
    });

    return successResponse(null, "Delete category success", 200);
  } catch (error) {
    console.log(error)
    return errorResponse("Delete category failed", 500);
  }
}
