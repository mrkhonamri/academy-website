import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  return NextResponse.json(t, { status: 201 });
}