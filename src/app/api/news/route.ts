import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - List all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اخبار" },
      { status: 500 }
    );
  }
}

// POST - Create news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, type, priority, expiresAt, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "عنوان و محتوا الزامی است" },
        { status: 400 }
      );
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        type: type || "announcement",
        priority: priority || "normal",
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isPublished: isPublished ?? false,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "خطا در ایجاد خبر" },
      { status: 500 }
    );
  }
}