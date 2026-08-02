import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      where: { isActive: true },
      include: { options: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(polls);
  } catch {
    return NextResponse.json({ error: "خطا" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, options } = body;

    if (!question || !options || options.length < 2) {
      return NextResponse.json({ error: "سوال و حداقل ۲ گزینه الزامی است" }, { status: 400 });
    }

    const poll = await prisma.poll.create({
      data: {
        question,
        options: {
          create: options.map((text: string) => ({ optionText: text })),
        },
      },
      include: { options: true },
    });

    return NextResponse.json(poll, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطا در ایجاد نظرسنجی" }, { status: 500 });
  }
}