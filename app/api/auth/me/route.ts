import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return errorResponse("Unauthorized", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse("User not found", 404);
    }

    return successResponse({ user }, "Get user success");
  } catch (error) {
    console.log(error);
    return errorResponse("Invalid token", 401);
  }
}
