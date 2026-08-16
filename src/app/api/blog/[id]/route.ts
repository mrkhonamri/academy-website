import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const post = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: body,
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "خطا در بروزرسانی" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id: parseInt(id) } });
    revalidatePath("/blog");
    revalidatePath("/");
    return NextResponse.json({ message: "حذف شد" });
  } catch {
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}