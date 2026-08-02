"use client";

import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    footer_about: "",
    footer_address: "",
    footer_phone: "",
    footer_email: "",
    footer_hours: "",
    footer_map: "",
    footer_instagram: "",
    footer_telegram: "",
    footer_whatsapp: "",
    footer_aparat: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setForm((prev) => ({ ...prev, ...data })));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl p-6" dir="rtl">
      <div className="mb-8 flex items-center gap-3">
        <Settings className="h-8 w-8 text-blue-700" />
        <h1 className="text-2xl font-bold">تنظیمات سایت</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold">فوتر</h2>
        
        {[
          { key: "footer_about", label: "متن درباره آکادمی", type: "textarea" },
          { key: "footer_address", label: "آدرس", type: "text" },
          { key: "footer_phone", label: "تلفن", type: "text" },
          { key: "footer_email", label: "ایمیل", type: "text" },
          { key: "footer_hours", label: "ساعات کاری", type: "text" },
          { key: "footer_map", label: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d802.1004438113843!2d52.877764599135624!3d36.472010931546556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f85430077b87565%3A0xe569d7550e2573ca!2zbWF6YW5kYXJpYSBsYW5ndWFnZSBpbnN0aXR1dGVcINmF2YjYs9iz2Ycg2LLYqNin2YYg2YXYp9iy2YbYr9ii2LHbjNin!5e0!3m2!1sen!2s!4v1785612429514!5m2!1sen!2s", type: "text" },
        ].map((field) => (
          <div key={field.key}>
            <label className="mb-1 block text-sm font-medium">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                rows={3}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            ) : (
              <input
                type="text"
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            )}
          </div>
        ))}

        <h2 className="text-lg font-bold pt-4">شبکه‌های اجتماعی</h2>
        {[
          { key: "footer_instagram", label: "اینستاگرام" },
          { key: "footer_telegram", label: "تلگرام" },
          { key: "footer_whatsapp", label: "واتساپ" },
          { key: "footer_aparat", label: "آپارات" },
        ].map((field) => (
          <div key={field.key}>
            <label className="mb-1 block text-sm font-medium">{field.label}</label>
            <input
              type="text"
              value={(form as any)[field.key]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="لینک"
            />
          </div>
        ))}

        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white hover:bg-blue-800">
          <Save className="h-4 w-4" />
          {saved ? "ذخیره شد ✓" : "ذخیره تنظیمات"}
        </button>
      </form>
    </div>
  );
}