import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  req: Request,
   { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        service: true,
        staff: true,
      },
    });

    if (!booking) {
      return errorResponse("Booking not found", 404);
    }

    return successResponse(booking);
  } catch {
    return errorResponse("Get booking failed", 500);
  }
}

export async function PUT(
  req: Request,
 { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        serviceId: body.serviceId,
        staffId: body.staffId || null,
        userId: body.userId || null,
        date: body.date ? new Date(body.date) : undefined,
        status: body.status,
        note: body.note,
        phone: body.phone
      },
      include: {
        user: true,
        service: true,
        staff: true,
      },
    });

    return successResponse(booking, "Update booking success", 200);
  } catch (error) {
    console.log(error);
    return errorResponse("Update booking failed", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.booking.delete({
      where: { id },
    });

    return successResponse(null, "Delete booking success", 204);
  } catch {
    return errorResponse("Delete booking failed", 500);
  }
}