import { prisma } from "@/lib/prisma";
import { formatDateLong } from "@/utils/persian-date";
import { MessageSquare, Mail, Phone, Trash2 } from "lucide-react";
import MessagesClient from "./MessagesClient";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-5xl p-6" dir="rtl">
      <div className="mb-8 flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-blue-700" />
        <h1 className="text-2xl font-bold">پیام‌های دریافتی</h1>
      </div>

      <MessagesClient initialMessages={serialized} />
    </div>
  );
}