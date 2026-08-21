"use client";

import { useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (form.newPassword !== form.confirmPassword) {
      setError("رمز جدید و تکرار آن مطابقت ندارند");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin-change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setError(data.error || "خطا در تغییر رمز");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-md p-6" dir="rtl">
      <div className="mb-8 flex items-center gap-3">
        <KeyRound className="h-8 w-8 text-blue-700" />
        <h1 className="text-2xl font-bold text-slate-900">تغییر رمز عبور</h1>
      </div>

      {success && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
          رمز عبور با موفقیت تغییر کرد.
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">رمز فعلی *</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="رمز فعلی را وارد کنید"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">رمز جدید *</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="حداقل ۶ کاراکتر"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">تکرار رمز جدید *</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="رمز جدید را تکرار کنید"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading || !form.currentPassword || !form.newPassword || !form.confirmPassword}
          className="mt-6 w-full rounded-lg bg-blue-700 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {loading ? "در حال تغییر..." : "تغییر رمز"}
        </button>
      </form>
    </div>
  );
}