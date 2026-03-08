import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("User not found", 404);
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return errorResponse("Wrong password", 401);
    }

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      id: user.id,
      role: user.role,
    });

    const response = successResponse(
      {
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Login success",
    );
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 phút
    });
    // lưu refresh token vào cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log(error);
    return errorResponse("Server error", 500);
  }
}
