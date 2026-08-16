"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: string;
  expiresAt: string | null;
  isPublished: boolean;
  createdAt: string;
}

const priorityLabels: Record<string, string> = {
  low: "کم",
  normal: "عادی",
  high: "مهم",
  urgent: "فوری",
};

export default function NewsClient({
  initialNews,
  typeLabels,
}: {
  initialNews: NewsItem[];
  typeLabels: Record<string, string>;
}) {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "announcement",
    priority: "normal",
    expiresAt: "",
    isPublished: false,
  });

  async function fetchNews() {
    const res = await fetch("/api/news");
    const data = await res.json();
    if (Array.isArray(data)) setNews(data);
  }

  function resetForm() {
    setForm({
      title: "",
      content: "",
      type: "announcement",
      priority: "normal",
      expiresAt: "",
      isPublished: false,
    });
    setEditingId(null);
    setShowForm(false);
  }

  function editNews(item: NewsItem) {
    setForm({
      title: item.title,
      content: item.content,
      type: item.type,
      priority: item.priority,
      expiresAt: item.expiresAt ? item.expiresAt.slice(0, 10) : "",
      isPublished: item.isPublished,
    });
    setEditingId(item.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("عنوان و محتوا الزامی است");
      return;
    }

    const body = {
      ...form,
      expiresAt: form.expiresAt || null,
    };

    if (editingId) {
      await fetch(`/api/news/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    await fetchNews();
    router.refresh();
  }

  async function deleteNews(id: number) {
    if (!confirm("آیا از حذف این خبر اطمینان دارید؟")) return;

    await fetch(`/api/news/${id}`, { method: "DELETE" });
    await fetchNews();
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="mb-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
      >
        <Plus className="h-5 w-5" />
        خبر جدید
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            {editingId ? "ویرایش خبر" : "خبر جدید"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">عنوان *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="عنوان خبر"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">محتوا *</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="متن خبر"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">نوع</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {Object.entries(typeLabels).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">اولویت</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {Object.entries(priorityLabels).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">تاریخ انقضا</label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isPublished"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-slate-700">
                منتشر شود
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white hover:bg-blue-800">
              {editingId ? "بروزرسانی" : "ذخیره"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-6 py-2 text-sm text-slate-700 hover:bg-slate-50">
              انصراف
            </button>
          </div>
        </form>
      )}

      {news.length === 0 ? (
        <div className="text-center py-12 text-slate-500">هیچ خبری وجود ندارد.</div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {typeLabels[item.type]}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      item.priority === "urgent" ? "bg-red-100 text-red-700" :
                      item.priority === "high" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {priorityLabels[item.priority]}
                    </span>
                    {item.isPublished ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">منتشر شده</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">پیش‌نویس</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{item.content}</p>
                </div>
                <div className="flex items-center gap-2 mr-4">
                  <button onClick={() => editNews(item)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteNews(item.id)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}