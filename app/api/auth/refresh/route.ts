import { cookies } from "next/headers";
import { verifyRefreshToken, signAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return errorResponse("No refresh token", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = verifyRefreshToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return errorResponse("User not found", 404);
    }

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
    });

    const response = successResponse(
      { accessToken },
      "Token refreshed"
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch (error) {
    console.log(error)
    return errorResponse("Invalid refresh token", 401);
  }
}