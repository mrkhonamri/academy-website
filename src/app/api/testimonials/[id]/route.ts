import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const t = await prisma.testimonial.update({ where: { id: parseInt(id) }, data: body });
  return NextResponse.json(t);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.testimonial.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}