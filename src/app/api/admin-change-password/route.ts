import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "همه فیلدها الزامی است" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "رمز جدید باید حداقل ۶ کاراکتر باشد" }, { status: 400 });
    }

    // Get current stored password
    let storedPassword: string | null = null;
    try {
      const setting = await prisma.siteSetting.findUnique({
        where: { key: "admin_password" },
      });
      storedPassword = setting?.value || null;
    } catch {
      storedPassword = null;
    }

    const validPassword = storedPassword || process.env.ADMIN_PASSWORD;

    if (currentPassword !== validPassword) {
      return NextResponse.json({ error: "رمز فعلی اشتباه است" }, { status: 401 });
    }

    // Save new password
    await prisma.siteSetting.upsert({
      where: { key: "admin_password" },
      update: { value: newPassword },
      create: { key: "admin_password", value: newPassword },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطا در تغییر رمز" }, { status: 500 });
  }
}