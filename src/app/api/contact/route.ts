import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderName, senderEmail, senderPhone, subject, message } = body;

    if (!senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: "نام، ایمیل و پیام الزامی است" },
        { status: 400 }
      );
    }

    const msg = await prisma.message.create({
      data: {
        senderName,
        senderEmail,
        senderPhone: senderPhone || null,
        subject: subject || "بدون عنوان",
        message,
      },
    });

    return NextResponse.json({ success: true, id: msg.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطا در ارسال پیام" }, { status: 500 });
  }
}