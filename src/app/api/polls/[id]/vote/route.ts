import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { optionId } = body;

    // Check if already voted (using cookie)
    const cookie = request.cookies.get(`voted_poll_${id}`);
    if (cookie) {
      return NextResponse.json({ error: "شما قبلا رای داده‌اید" }, { status: 400 });
    }

    await prisma.pollOption.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } },
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(`voted_poll_${id}`, "1", { maxAge: 60 * 60 * 24 * 30 });
    return response;
  } catch {
    return NextResponse.json({ error: "خطا در ثبت رای" }, { status: 500 });
  }
}