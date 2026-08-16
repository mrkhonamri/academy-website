import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, text, stars } = body;

    if (!name || !text) {
      return NextResponse.json({ error: "نام و متن الزامی است" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role: role || "دانشجو",
        text,
        stars: stars || 5,
        isApproved: false,
        isActive: true,
        sortOrder: 0,
      },
    });

    return NextResponse.json({ success: true, id: testimonial.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطا در ثبت نظر" }, { status: 500 });
  }
}