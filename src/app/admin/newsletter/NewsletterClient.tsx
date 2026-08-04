"use client";

import { useState } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDateLong } from "@/utils/persian-date";

interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}

export default function NewsletterClient({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  async function deleteSubscriber(id: number) {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function copyAllEmails() {
    const emails = initialSubscribers.map((s) => s.email).join("\n");
    await navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (initialSubscribers.length === 0) {
    return <div className="text-center py-12 text-slate-500">هیچ مشترکی وجود ندارد.</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={copyAllEmails}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "کپی شد" : "کپی همه ایمیل‌ها"}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-right font-bold text-slate-700">#</th>
              <th className="px-4 py-3 text-right font-bold text-slate-700">ایمیل</th>
              <th className="px-4 py-3 text-right font-bold text-slate-700">تاریخ</th>
              <th className="px-4 py-3 text-right font-bold text-slate-700 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {initialSubscribers.map((sub, i) => (
              <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{sub.email}</td>
                <td className="px-4 py-3 text-slate-500">{formatDateLong(sub.createdAt)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteSubscriber(sub.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}