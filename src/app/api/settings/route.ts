import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => (map[s.key] = s.value));
  return NextResponse.json(map);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  for (const [key, value] of Object.entries(body)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as string },
      create: { key, value: value as string },
    });
  }
  revalidatePath("/");
  revalidatePath("/contact");
  return NextResponse.json({ success: true });
}