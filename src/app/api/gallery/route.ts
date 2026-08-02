import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const items = await prisma.galleryItem.findMany({
      where: category && category !== "all" ? { category } : {},
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "خطا در دریافت گالری" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = await prisma.galleryItem.create({
      data: {
        type: body.type || "image",
        title: body.title,
        description: body.description || null,
        url: body.url,
        thumbnailUrl: body.thumbnailUrl || null,
        category: body.category || "general",
        isFeatured: body.isFeatured || false,
        sortOrder: body.sortOrder || 0,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطا در ایجاد آیتم" }, { status: 500 });
  }
}