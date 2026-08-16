import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const t = await prisma.testimonial.create({ data: body });
  revalidatePath("/");
  return NextResponse.json(t, { status: 201 });
}