"use client";

import { useState } from "react";
import { Mail, Phone, Trash2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDateLong } from "@/utils/persian-date";

interface Message {
  id: number;
  senderName: string;
  senderEmail: string;
  senderPhone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  async function deleteMessage(id: number) {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function markAsRead(id: number) {
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    router.refresh();
  }

  if (initialMessages.length === 0) {
    return <div className="text-center py-12 text-slate-500">هیچ پیامی وجود ندارد.</div>;
  }

  return (
    <div className="space-y-3">
      {initialMessages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-xl border p-4 cursor-pointer transition-all ${
            msg.isRead ? "bg-white border-slate-200" : "bg-blue-50 border-blue-200"
          }`}
          onClick={() => {
            setExpandedId(expandedId === msg.id ? null : msg.id);
            if (!msg.isRead) markAsRead(msg.id);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {msg.isRead ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-blue-600" />}
              <div>
                <h3 className="font-bold text-slate-900">{msg.senderName}</h3>
                <p className="text-sm text-slate-500">{msg.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">{formatDateLong(msg.createdAt)}</span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {expandedId === msg.id && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              <div className="mt-4 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{msg.senderEmail}</span>
                {msg.senderPhone && (
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{msg.senderPhone}</span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}