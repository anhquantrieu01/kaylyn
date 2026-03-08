import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!email || !password) {
      return errorResponse("Missing email or password", 400);
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existing) {
      return errorResponse("User already exists", 400);
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    return successResponse(user, "User created", 201);
  } catch (error) {
    console.log(error)
    return errorResponse("Server error", 500);
  }
}