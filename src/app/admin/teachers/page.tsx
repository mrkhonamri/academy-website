"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminTeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    bio: "",
    experience: "",
    students: 0,
    imageUrl: "",
    isActive: true,
    sortOrder: 0,
  });

  useEffect(() => { fetchTeachers(); }, []);

  async function fetchTeachers() {
    const res = await fetch("/api/teachers");
    const data = await res.json();
    setTeachers(Array.isArray(data) ? data : []);
  }

  function resetForm() {
    setForm({ name: "", specialization: "", bio: "", experience: "", students: 0, imageUrl: "", isActive: true, sortOrder: 0 });
    setEditingId(null);
    setShowForm(false);
  }

  function editTeacher(t: any) {
    setForm({
      name: t.name, specialization: t.specialization, bio: t.bio,
      experience: t.experience, students: t.students, imageUrl: t.imageUrl || "",
      isActive: t.isActive, sortOrder: t.sortOrder,
    });
    setEditingId(t.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.specialization || !form.bio) {
      alert("نام، تخصص و بیوگرافی الزامی است");
      return;
    }

    if (editingId) {
      await fetch(`/api/teachers/${editingId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/teachers", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
    }

    resetForm();
    router.refresh();
    fetchTeachers();
  }

  async function deleteTeacher(id: number) {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/teachers/${id}`, { method: "DELETE" });
    router.refresh();
    fetchTeachers();
  }

  return (
    <div className="mx-auto max-w-4xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3"><Users className="h-8 w-8 text-blue-700" /><h1 className="text-2xl font-bold">مدیریت اساتید</h1></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"><Plus className="h-5 w-5" />استاد جدید</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">{editingId ? "ویرایش" : "جدید"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">نام *</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">تخصص *</label><input type="text" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">بیوگرافی *</label><textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">سابقه</label><input type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">تعداد دانشجو</label><input type="number" value={form.students} onChange={(e) => setForm({ ...form, students: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">تصویر استاد</label>
              <ImageUpload
                currentUrl={form.imageUrl || undefined}
                onUpload={(url) => setForm({ ...form, imageUrl: url })}
                onClear={() => setForm({ ...form, imageUrl: "" })}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3"><button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white">ذخیره</button><button type="button" onClick={resetForm} className="rounded-lg border px-6 py-2 text-sm">انصراف</button></div>
        </form>
      )}

      <div className="space-y-3">
        {teachers.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-xl border bg-white p-4">
            <div>
              <h3 className="font-bold">{t.name}</h3>
              <p className="text-sm text-slate-500">{t.specialization} • {t.experience}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editTeacher(t)} className="rounded-lg p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => deleteTeacher(t.id)} className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}