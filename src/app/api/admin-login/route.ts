import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  // Check DB first
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

  if (password === validPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
}