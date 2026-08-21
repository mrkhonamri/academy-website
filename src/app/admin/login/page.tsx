"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("رمز عبور اشتباه است");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
            <Lock className="h-7 w-7 text-blue-700" />
          </div>
          <h1 className="text-xl font-black text-slate-900">ورود به پنل مدیریت</h1>
          <p className="mt-1 text-sm text-slate-500">رمز عبور را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            autoFocus
          />
          {error && (
            <p className="mt-3 text-center text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded-lg bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "در حال بررسی..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}