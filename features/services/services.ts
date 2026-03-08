import { prisma } from "@/lib/prisma";

export async function getServices() {
  return prisma.service.findMany({
    include: {
      category: true,
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug },
    include: {
      category: true,
    },
  });
}

export async function getServicesGrouped() {
  return prisma.serviceCategory.findMany({
    include: {
      services: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    
  });
}