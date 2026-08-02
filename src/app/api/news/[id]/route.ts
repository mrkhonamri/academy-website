import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Update news
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, type, priority, expiresAt, isPublished } = body;

    const news = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        type,
        priority,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isPublished,
      },
    });

    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { error: "خطا در بروزرسانی خبر" },
      { status: 500 }
    );
  }
}

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.news.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "خبر با موفقیت حذف شد" });
  } catch {
    return NextResponse.json(
      { error: "خطا در حذف خبر" },
      { status: 500 }
    );
  }
}