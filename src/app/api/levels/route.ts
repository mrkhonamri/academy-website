import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const level = await prisma.level.create({ data: body });
  return NextResponse.json(level, { status: 201 });
}