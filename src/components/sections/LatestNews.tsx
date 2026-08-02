import { prisma } from "@/lib/prisma";
import { formatDateRelative } from "@/utils/persian-date";
import { Megaphone, AlertTriangle, Calendar, FileText, Info } from "lucide-react";

const typeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  cancellation: {
    label: "کنسلی",
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "bg-red-100 text-red-700",
  },
  makeup: {
    label: "جبرانی",
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-orange-100 text-orange-700",
  },
  exam: {
    label: "امتحان",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-700",
  },
  announcement: {
    label: "اطلاعیه",
    icon: <Megaphone className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-700",
  },
  other: {
    label: "سایر",
    icon: <Info className="h-4 w-4" />,
    color: "bg-slate-100 text-slate-700",
  },
};

const priorityConfig: Record<string, string> = {
  urgent: "border-r-4 border-red-500",
  high: "border-r-4 border-orange-500",
  normal: "border-r-4 border-blue-500",
  low: "border-r-4 border-slate-300",
};

export default async function LatestNews() {
  const news = await prisma.news.findMany({
    where: {
      isPublished: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gte: new Date() } },
      ],
    },
    orderBy: [
      { createdAt: "desc" },
    ],
    take: 5,
  });

  if (news.length === 0) {
    return null; // Don't show section if no news
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Megaphone className="h-7 w-7 text-primary-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            آخرین اخبار و اطلاعیه‌ها
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => {
            const type = typeConfig[item.type] || typeConfig.other;
            const priority = priorityConfig[item.priority] || "";

            return (
              <div
                key={item.id}
                className={`rounded-xl bg-slate-50 p-5 ${priority} hover:shadow-md transition-shadow ${news.length === 1 ? "lg:col-span-3" : news.length === 2 ? "lg:col-span-3 sm:col-span-2" : ""}`}
                >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${type.color}`}
                  >
                    {type.icon}
                    {type.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatDateRelative(item.createdAt)}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}