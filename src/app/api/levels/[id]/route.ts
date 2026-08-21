import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const level = await prisma.level.update({ where: { id: parseInt(id) }, data: body });
  return NextResponse.json(level);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.level.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}