import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryItem.delete({ where: { id: parseInt(id) } });
    revalidatePath("/gallery");
    revalidatePath("/");
    return NextResponse.json({ message: "حذف شد" });
  } catch {
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}