import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "ایمیل الزامی است" }, { status: 400 });
    await prisma.newsletterSubscriber.create({ data: { email } });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "قبلا ثبت شده یا خطا" }, { status: 400 });
  }
}