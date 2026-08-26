"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Image, Video, Pencil, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

const categories = [
  { value: "class", label: "کلاس‌ها" },
  { value: "performance", label: "اجراهای دانشجویان" },
  { value: "event", label: "رویدادها" },
  { value: "behind-scenes", label: "پشت صحنه" },
  { value: "general", label: "عمومی" },
];

interface GalleryItem {
  id: number;
  type: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  category: string;
  isFeatured: boolean;
  sortOrder: number;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    type: "image",
    title: "",
    description: "",
    url: "",
    category: "general",
    isFeatured: false,
    sortOrder: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function resetForm() {
    setForm({ type: "image", title: "", description: "", url: "", category: "general", isFeatured: false, sortOrder: 0 });
    setEditingId(null);
    setShowForm(false);
  }

  function editItem(item: GalleryItem) {
    setForm({
      type: item.type,
      title: item.title,
      description: item.description || "",
      url: item.url,
      category: item.category,
      isFeatured: item.isFeatured,
      sortOrder: item.sortOrder || 0,
    });
    setEditingId(item.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      alert("عنوان و آدرس فایل الزامی است");
      return;
    }

    if (editingId) {
      await fetch(`/api/gallery/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    resetForm();
    await fetchItems();
    router.refresh();
  }

  async function deleteItem(id: number) {
    if (!confirm("آیا از حذف این آیتم اطمینان دارید؟")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await fetchItems();
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image className="h-8 w-8 text-blue-700" />
          <h1 className="text-2xl font-bold text-slate-900">مدیریت گالری</h1>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          <Plus className="h-5 w-5" />
          افزودن آیتم
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{editingId ? "ویرایش آیتم" : "آیتم جدید"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">نوع</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="image">تصویر</option>
                <option value="video">ویدیو</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">دسته‌بندی</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">عنوان *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="عنوان آیتم" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">توضیحات</label>
              <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="توضیحات اختیاری" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">تصویر *</label>
              <ImageUpload
                currentUrl={form.url || undefined}
                onUpload={(url) => setForm({ ...form, url })}
                onClear={() => setForm({ ...form, url: "" })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">ترتیب</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="isFeatured" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="h-4 w-4" />
              <label htmlFor="isFeatured" className="flex items-center gap-1 text-sm font-medium text-slate-700">
                <Star className="h-4 w-4 text-amber-400" />
                نمایش در صفحه اصلی
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

      {loading ? (
        <div className="text-center py-12 text-slate-500">در حال بارگذاری...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500">هیچ آیتمی وجود ندارد.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="aspect-square bg-slate-100 flex items-center justify-center">
                {item.type === "video" ? (
                  <Video className="h-10 w-10 text-slate-400" />
                ) : (
                  <Image className="h-10 w-10 text-slate-400" />
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium text-slate-900 truncate flex-1">{item.title}</p>
                  {item.isFeatured && <Star className="h-3 w-3 text-amber-400 shrink-0" />}
                </div>
                <p className="text-xs text-slate-400">{item.category}</p>
              </div>
              <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => editItem(item)} className="rounded-lg bg-blue-500 p-1.5 text-white hover:bg-blue-600">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => deleteItem(item.id)} className="rounded-lg bg-red-500 p-1.5 text-white hover:bg-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
