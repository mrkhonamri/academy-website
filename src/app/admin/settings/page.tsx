"use client";

import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    footer_about: "", footer_address: "", footer_phone: "", footer_email: "", footer_hours: "", footer_map: "",
    stat_students: "", stat_teachers: "", stat_years: "", stat_satisfaction: "",
    footer_instagram: "", footer_telegram: "", footer_whatsapp: "", footer_aparat: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => setForm(p => ({ ...p, ...d })));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaved(true); setTimeout(() => setSaved(false), 2000); router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl p-6" dir="rtl">
      <div className="mb-8 flex items-center gap-3"><Settings className="h-8 w-8 text-blue-700" /><h1 className="text-2xl font-bold">تنظیمات سایت</h1></div>
      <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold">فوتر</h2>
        {[
          { key: "footer_about", label: "متن درباره", type: "textarea" },
          { key: "footer_address", label: "آدرس", type: "text" },
          { key: "footer_phone", label: "تلفن", type: "text" },
          { key: "footer_email", label: "ایمیل", type: "text" },
          { key: "footer_hours", label: "ساعات کاری", type: "text" },
          { key: "footer_map", label: "لینک نقشه", type: "text" },
        ].map(f => (
          <div key={f.key}><label className="mb-1 block text-sm font-medium">{f.label}</label>
            {f.type === "textarea" ? <textarea value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" /> :
            <input type="text" value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" />}
          </div>
        ))}

        <h2 className="text-lg font-bold pt-4">آمار</h2>
        {[
          { key: "stat_students", label: "تعداد دانشجویان" },
          { key: "stat_teachers", label: "تعداد اساتید" },
          { key: "stat_years", label: "سال تجربه" },
          { key: "stat_satisfaction", label: "درصد رضایت" },
        ].map(f => (
          <div key={f.key}><label className="mb-1 block text-sm font-medium">{f.label}</label>
            <input type="text" value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
        ))}

        <h2 className="text-lg font-bold pt-4">شبکه‌های اجتماعی</h2>
        {["footer_instagram","footer_telegram","footer_whatsapp","footer_aparat"].map(k => (
          <div key={k}><label className="mb-1 block text-sm font-medium">{k.replace("footer_","")}</label>
            <input type="text" value={(form as any)[k]} onChange={e => setForm({...form, [k]: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="لینک" />
          </div>
        ))}

        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white hover:bg-blue-800"><Save className="h-4 w-4" />{saved ? "ذخیره شد ✓" : "ذخیره"}</button>
      </form>
    </div>
  );
}