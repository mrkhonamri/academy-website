"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Image } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSlidersPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    backgroundType: "image",
    backgroundUrl: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
    isActive: true,
    sortOrder: 0,
  });

  useEffect(() => { fetchSlides(); }, []);

  async function fetchSlides() {
    const res = await fetch("/api/slides");
    const data = await res.json();
    setSlides(Array.isArray(data) ? data : []);
  }

  function resetForm() {
    setForm({ title: "", subtitle: "", backgroundType: "image", backgroundUrl: "", button1Text: "", button1Link: "", button2Text: "", button2Link: "", isActive: true, sortOrder: 0 });
    setEditingId(null);
    setShowForm(false);
  }

  function editSlide(slide: any) {
    setForm({
      title: slide.title, subtitle: slide.subtitle || "", backgroundType: slide.backgroundType, backgroundUrl: slide.backgroundUrl,
      button1Text: slide.button1Text || "", button1Link: slide.button1Link || "",
      button2Text: slide.button2Text || "", button2Link: slide.button2Link || "",
      isActive: slide.isActive, sortOrder: slide.sortOrder,
    });
    setEditingId(slide.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.backgroundUrl) { alert("عنوان و آدرس پس‌زمینه الزامی است"); return; }

    if (editingId) {
      await fetch(`/api/slides/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/slides", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    router.refresh();
    fetchSlides();
  }

  async function deleteSlide(id: number) {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/slides/${id}`, { method: "DELETE" });
    fetchSlides();
  }

  return (
    <div className="mx-auto max-w-4xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3"><Image className="h-8 w-8 text-blue-700" /><h1 className="text-2xl font-bold">مدیریت اسلایدر</h1></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"><Plus className="h-5 w-5" />اسلاید جدید</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">{editingId ? "ویرایش" : "جدید"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">عنوان *</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">زیرعنوان</label><input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">نوع پس‌زمینه</label><select value={form.backgroundType} onChange={(e) => setForm({ ...form, backgroundType: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm"><option value="image">تصویر</option><option value="video">ویدیو</option></select></div>
            <div><label className="mb-1 block text-sm font-medium">آدرس پس‌زمینه *</label><input type="text" value={form.backgroundUrl} onChange={(e) => setForm({ ...form, backgroundUrl: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="/uploads/slider/bg.jpg" /></div>
            <div><label className="mb-1 block text-sm font-medium">متن دکمه ۱</label><input type="text" value={form.button1Text} onChange={(e) => setForm({ ...form, button1Text: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">لینک دکمه ۱</label><input type="text" value={form.button1Link} onChange={(e) => setForm({ ...form, button1Link: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">متن دکمه ۲</label><input type="text" value={form.button2Text} onChange={(e) => setForm({ ...form, button2Text: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">لینک دکمه ۲</label><input type="text" value={form.button2Link} onChange={(e) => setForm({ ...form, button2Link: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div className="mt-6 flex gap-3"><button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white">ذخیره</button><button type="button" onClick={resetForm} className="rounded-lg border px-6 py-2 text-sm">انصراف</button></div>
        </form>
      )}

      <div className="space-y-3">
        {slides.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-xl border bg-white p-4">
            <div><h3 className="font-bold">{s.title}</h3><p className="text-sm text-slate-500">{s.subtitle}</p></div>
            <div className="flex gap-2"><button onClick={() => editSlide(s)} className="rounded-lg p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button><button onClick={() => deleteSlide(s.id)} className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}