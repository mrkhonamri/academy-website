import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const groups = await prisma.ageGroup.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { levels: { orderBy: { sortOrder: "asc" } } },
  });
  return NextResponse.json(groups);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const group = await prisma.ageGroup.create({ data: body });
  return NextResponse.json(group, { status: 201 });
}