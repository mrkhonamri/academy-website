import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "خطا در دریافت مقالات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, imageUrl, isPublished } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "عنوان، slug و محتوا الزامی است" }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || "",
        content,
        category: category || "general",
        imageUrl: imageUrl || null,
        isPublished: isPublished || false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطا در ایجاد مقاله" }, { status: 500 });
  }
}