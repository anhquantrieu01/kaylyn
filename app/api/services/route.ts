import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import slugify from "slugify";
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(services, "Get services success", 200);
  } catch (error) {
    console.log(error);
    return errorResponse("Fetch services failed", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let slug = slugify(body.title, {
      lower: true,
      strict: true,
      locale: "vi",
    });

    const exist = await prisma.service.findUnique({
      where: { slug },
    });

    if (exist) {
      slug = `${slug}-${Date.now()}`;
    }

    const price = Number(body.price);
    const duration = body.duration ? Number(body.duration) : null;
    let salePrice = body.salePrice ? Number(body.salePrice) : null;
    let discountPercent = body.discountPercent
      ? Number(body.discountPercent)
      : null;

    if (!body.title || !price) {
      return errorResponse("Title and price are required", 400);
    }

    // tính discount
    if (salePrice && !discountPercent) {
      discountPercent = Math.round(((price - salePrice) / price) * 100);
    }

    // tính sale price
    if (discountPercent && !salePrice) {
      salePrice = Math.round(price - (price * discountPercent) / 100);
    }

    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug,
        description: body.description,
        price,
        salePrice,
        discountPercent,
        duration,
        image: body.image,
        categoryId: body.categoryId || null,
      },
    });

    return successResponse(service, "Create service success", 201);
  } catch (error) {
    console.log(error);
    return errorResponse("Create service failed", 500);
  }
}
