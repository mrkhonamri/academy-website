import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const slide = await prisma.slide.update({ where: { id: parseInt(id) }, data: body });
  revalidatePath("/");
  return NextResponse.json(slide);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.slide.delete({ where: { id: parseInt(id) } });
  revalidatePath("/");
  return NextResponse.json({ message: "حذف شد" });
}