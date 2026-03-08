import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import slugify from "slugify";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!service) {
      return errorResponse("Service not found", 404);
    }

    return successResponse(service, "Get service success", 200);
  } catch {
    return errorResponse("Fetch service failed", 500);
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

    if (body.title) {
      slug = slugify(body.title, {
        lower: true,
        strict: true,
        locale: "vi",
      });
    }

    const exist = await prisma.service.findUnique({
      where: { slug },
    });

    if (exist) {
      slug = `${slug}-${Date.now()}`;
    }

    const price = body.price !== undefined ? Number(body.price) : undefined;

    const duration =
      body.duration !== undefined ? Number(body.duration) : undefined;

    let salePrice =
      body.salePrice !== undefined ? Number(body.salePrice) : undefined;

    let discountPercent =
      body.discountPercent !== undefined
        ? Number(body.discountPercent)
        : undefined;

    // nếu có price thì mới tính lại discount / salePrice
    if (price !== undefined) {
      if (salePrice !== undefined && discountPercent === undefined) {
        discountPercent = Math.round(((price - salePrice) / price) * 100);
      }

      if (discountPercent !== undefined && salePrice === undefined) {
        salePrice = Math.round(price - (price * discountPercent) / 100);
      }
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        slug,
        description: body.description,
        price,
        salePrice,
        discountPercent,
        duration,
        image: body.image,
        categoryId: body.categoryId ?? null,
      },
    });

    return successResponse(updatedService, "Update service success", 200);
  } catch (error) {
    console.log(error);
    return errorResponse("Update service failed", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.service.delete({
      where: { id },
    });

    return successResponse(null, "Delete service success", 200);
  } catch {
    return errorResponse("Delete service failed", 500);
  }
}
