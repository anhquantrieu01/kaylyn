import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import slugify from "slugify";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const category = await prisma.serviceCategory.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });

    if (!category) {
      return errorResponse("Service category not found", 404);
    }

    return successResponse(category, "Get service category success", 200);
  } catch {
    return errorResponse("Fetch service category failed", 500);
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

    const updatedCategory = await prisma.serviceCategory.update({
      where: { id },
      data: {
        name: body.name,
        slug,
      },
    });

    return successResponse(
      updatedCategory,
      "Update service category success",
      200,
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    if (error.code === "P2002") {
      return errorResponse("Slug already exists", 400);
    }

    return errorResponse("Update service category failed", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const count = await prisma.service.count({
      where: { categoryId: id },
    });

    if (count > 0) {
      return errorResponse("Cannot delete category with services", 400);
    }

    await prisma.serviceCategory.delete({
      where: { id },
    });

    return successResponse(null, "Delete service category success", 200);
  } catch {
    return errorResponse("Delete service category failed", 500);
  }
}
