import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { signAccessToken } from "@/lib/jwt";
export async function GET(
  req: Request,
   { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return errorResponse("User not found", 404);
    }

    return successResponse(user);
  } catch {
    return errorResponse("Server error", 500);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: body,
    });

    const response = successResponse(updatedUser, "Update success", 200);
    if (body.role) {
      const newToken = signAccessToken({
        id: updatedUser.id,
        role: updatedUser.role,
      });

      response.cookies.set("accessToken", newToken, {
        httpOnly: true,
        path: "/",
      });
    }
    return response;
  } catch (error) {
    console.log(error)
    return errorResponse("Update failed", 500);
  }
}

export async function DELETE(
  req: Request,
   { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id },
    });

    return successResponse(null, "Delete success", 200);
  } catch {
    return errorResponse("Delete failed", 500);
  }
}
