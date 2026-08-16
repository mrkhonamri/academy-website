"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function TestimonialForm() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    text: "",
    stars: 5,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      setError("نام و متن الزامی است");
      return;
    }
    setError("");
    setStatus("loading");

    const res = await fetch("/api/testimonials/public", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("done");
      setForm({ name: "", role: "", text: "", stars: 5 });
    } else {
      setError("خطا در ثبت. دوباره تلاش کنید.");
      setStatus("idle");
    }
  }

  return (
    <section className="bg-slate-100 py-12">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">نظر شما</h2>
        <p className="text-sm text-slate-500 text-center mb-6">تجربه خود را با ما به اشتراک بگذارید</p>

        {status === "done" ? (
          <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
            <p className="text-green-700 font-medium">با تشکر! نظر شما ثبت شد و پس از تایید نمایش داده می‌شود.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">نام *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="نام شما"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">نقش</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="مثلا: دانشجو، والدین"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">نظر شما *</label>
                <textarea
                  rows={4}
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="تجربه خود را بنویسید..."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">امتیاز</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, stars: star })}
                      className={`text-2xl transition-colors ${
                        star <= form.stars ? "text-amber-400" : "text-slate-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full rounded-lg bg-blue-700 py-3 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {status === "loading" ? "در حال ثبت..." : "ثبت نظر"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}