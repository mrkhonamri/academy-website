import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.poll.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "حذف شد" });
  } catch {
    return NextResponse.json({ error: "خطا" }, { status: 500 });
  }
}