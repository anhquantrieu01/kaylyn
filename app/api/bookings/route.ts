import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(bookings);
  } catch {
    return errorResponse("Get bookings failed", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        userId: body.userId || null,
        serviceId: body.serviceId,
        staffId: body.staffId || null,
        date: new Date(body.date),
        note: body.note,
        phone: body.phone
      },
      include: {
        user: true,
        service: true,
        staff: true,
      },
    });

    return successResponse(booking, "Booking created", 201);
  } catch (error) {
    console.log(error);
    return errorResponse("Create booking failed", 500);
  }
}