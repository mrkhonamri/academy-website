import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const teachers = await prisma.teacher.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(teachers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const teacher = await prisma.teacher.create({ data: body });
  revalidatePath("/teachers");
  return NextResponse.json(teacher, { status: 201 });
}