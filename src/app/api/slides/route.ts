import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const slides = await prisma.slide.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(slides);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const slide = await prisma.slide.create({ data: body });
  return NextResponse.json(slide, { status: 201 });
}