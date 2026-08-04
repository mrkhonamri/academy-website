import { prisma } from "@/lib/prisma";
import { Mail } from "lucide-react";
import NewsletterClient from "./NewsletterClient";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = subscribers.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-5xl p-6" dir="rtl">
      <div className="mb-8 flex items-center gap-3">
        <Mail className="h-8 w-8 text-green-700" />
        <h1 className="text-2xl font-bold">خبرنامه</h1>
        <span className="text-sm text-slate-500">({subscribers.length} مشترک)</span>
      </div>

      <NewsletterClient initialSubscribers={serialized} />
    </div>
  );
}