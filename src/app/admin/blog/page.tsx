"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";

const categories = [
  { value: "general", label: "عمومی" },
  { value: "learning", label: "یادگیری" },
  { value: "tips", label: "نکات آموزشی" },
  { value: "exams", label: "آزمون‌ها" },
  { value: "pronunciation", label: "تلفظ" },
  { value: "grammar", label: "گرامر" },
];

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "general",
    imageUrl: "",
    isPublished: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function resetForm() {
    setForm({ title: "", slug: "", excerpt: "", content: "", category: "general", imageUrl: "", isPublished: false });
    setEditingId(null);
    setShowForm(false);
  }

  function editPost(post: any) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl || "",
      isPublished: post.isPublished,
    });
    setEditingId(post.id);
    setShowForm(true);
  }

  function generateSlug() {
    const slug = form.title
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    setForm({ ...form, slug });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      alert("عنوان، slug و محتوا الزامی است");
      return;
    }

    if (editingId) {
      await fetch(`/api/blog/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    resetForm();
    await fetchPosts();
    router.refresh();
  }

  async function deletePost(id: number) {
    if (!confirm("آیا از حذف این مقاله اطمینان دارید؟")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    await fetchPosts();
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-700" />
          <h1 className="text-2xl font-bold text-slate-900">مدیریت وبلاگ</h1>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          <Plus className="h-5 w-5" />
          مقاله جدید
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">{editingId ? "ویرایش مقاله" : "مقاله جدید"}</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">عنوان *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Slug *</label>
                <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
              <button type="button" onClick={generateSlug} className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600 hover:bg-slate-200">تولید خودکار</button>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">خلاصه</label>
              <input type="text" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">محتوا *</label>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">تصویر مقاله</label>
              <ImageUpload
                currentUrl={form.imageUrl || undefined}
                onUpload={(url) => setForm({ ...form, imageUrl: url })}
                onClear={() => setForm({ ...form, imageUrl: "" })}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">دسته‌بندی</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                <label className="text-sm font-medium">منتشر شود</label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white hover:bg-blue-800">{editingId ? "بروزرسانی" : "ذخیره"}</button>
            <button type="button" onClick={resetForm} className="rounded-lg border px-6 py-2 text-sm">انصراف</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-slate-500">هیچ مقاله‌ای وجود ندارد.</div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-start justify-between rounded-xl border bg-white p-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{post.title}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{post.category}</span>
                  {post.isPublished ? <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">منتشر شده</span> : <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">پیش‌نویس</span>}
                </div>
                <p className="text-sm text-slate-500">{post.excerpt}</p>
              </div>
              <div className="flex gap-2 mr-4">
                <button onClick={() => editPost(post)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => deletePost(post.id)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}