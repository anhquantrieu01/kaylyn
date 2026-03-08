import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { hashPassword } from "@/lib/hash";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return successResponse(users);
  } catch {
    return errorResponse("Server error", 500);
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    const exist = await prisma.user.findUnique({
      where: { email },
    });

    if (exist) {
      return errorResponse("Email already exists", 400);
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role || "STAFF",
      },
    });

    return successResponse(user, "Create user success");
  } catch {
    return errorResponse("Server error", 500);
  }
}
