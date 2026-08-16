import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const t = await prisma.testimonial.update({ where: { id: parseInt(id) }, data: body });
  revalidatePath("/");
  return NextResponse.json(t);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.testimonial.delete({ where: { id: parseInt(id) } });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}