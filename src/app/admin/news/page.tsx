import { prisma } from "@/lib/prisma";
import { Megaphone } from "lucide-react";
import NewsClient from "./NewsClient";

const typeLabels: Record<string, string> = {
  announcement: "اطلاعیه",
  cancellation: "کنسلی",
  makeup: "جبرانی",
  exam: "امتحان",
  other: "سایر",
};

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedNews = news.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    expiresAt: item.expiresAt ? item.expiresAt.toISOString() : null,
  }));

  return (
    <div className="mx-auto max-w-5xl p-6" dir="rtl">
      <div className="mb-8 flex items-center gap-3">
        <Megaphone className="h-8 w-8 text-blue-700" />
        <h1 className="text-2xl font-bold text-slate-900">مدیریت اخبار</h1>
      </div>

      <NewsClient initialNews={serializedNews} typeLabels={typeLabels} />
    </div>
  );
}