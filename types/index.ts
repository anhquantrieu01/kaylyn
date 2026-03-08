import { Prisma } from '@/lib/generated/prisma/client';

export type BookingsType = Prisma.BookingGetPayload<{
  include: { user: true; service: true; staff: true };
}>;

export type ServiceCategory = Prisma.ServiceCategoryGetPayload<{
  include: { services: true };
}>;

export type FAQ = {
  question: string
  answer: string
}

export type AccessPayload = {
  id: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
};