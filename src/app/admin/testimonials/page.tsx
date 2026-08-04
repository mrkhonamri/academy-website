"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", text: "", stars: 5, isActive: true, sortOrder: 0 });

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  function resetForm() {
    setForm({ name: "", role: "", text: "", stars: 5, isActive: true, sortOrder: 0 });
    setEditingId(null); setShowForm(false);
  }

  function editItem(t: any) {
    setForm({ name: t.name, role: t.role, text: t.text, stars: t.stars, isActive: t.isActive, sortOrder: t.sortOrder });
    setEditingId(t.id); setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.text) { alert("نام و متن الزامی است"); return; }
    if (editingId) {
      await fetch(`/api/testimonials/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm(); router.refresh(); fetchItems();
  }

  async function deleteItem(id: number) {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    router.refresh(); fetchItems();
  }

  return (
    <div className="mx-auto max-w-4xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3"><Star className="h-8 w-8 text-blue-700" /><h1 className="text-2xl font-bold">مدیریت نظرات</h1></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"><Plus className="h-5 w-5" />نظر جدید</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">{editingId ? "ویرایش" : "جدید"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">نام *</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">نقش</label><input type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">متن *</label><textarea rows={3} value={form.text} onChange={e => setForm({...form, text: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">ستاره (۱-۵)</label><input type="number" min={1} max={5} value={form.stars} onChange={e => setForm({...form, stars: parseInt(e.target.value) || 5})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div className="mt-6 flex gap-3"><button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white">ذخیره</button><button type="button" onClick={resetForm} className="rounded-lg border px-6 py-2 text-sm">انصراف</button></div>
        </form>
      )}

      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="flex items-center justify-between rounded-xl border bg-white p-4">
            <div>
              <h3 className="font-bold">{t.name} <span className="text-amber-400">{"⭐".repeat(t.stars)}</span></h3>
              <p className="text-sm text-slate-500">{t.text}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editItem(t)} className="rounded-lg p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => deleteItem(t.id)} className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}