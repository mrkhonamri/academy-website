"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

interface Settings {
  footer_address?: string;
  footer_phone?: string;
  footer_email?: string;
  footer_hours?: string;
  footer_map?: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ senderName: "", senderEmail: "", senderPhone: "", subject: "", message: "" });
    } else {
      alert("خطا در ارسال پیام. لطفا دوباره تلاش کنید.");
    }
    setLoading(false);
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "آدرس",
      lines: settings.footer_address ? settings.footer_address.split("،") : ["اطلاعات ثبت نشده"],
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "تلفن",
      lines: settings.footer_phone ? [settings.footer_phone] : ["اطلاعات ثبت نشده"],
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "ایمیل",
      lines: settings.footer_email ? [settings.footer_email] : ["اطلاعات ثبت نشده"],
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "ساعات کاری",
      lines: settings.footer_hours ? [settings.footer_hours] : ["اطلاعات ثبت نشده"],
    },
  ];

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">تماس با ما</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">با ما در ارتباط باشید</h1>
          <p className="mt-4 text-lg text-blue-100">برای هرگونه سوال، مشاوره یا ثبت‌نام با ما تماس بگیرید</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 -mt-8 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">{item.icon}</div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i} className="text-sm text-slate-500">{line.trim()}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">پیام خود را بنویسید</h2>
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-xl font-bold text-slate-900">پیام شما با موفقیت ارسال شد</h3>
                <p className="mt-2 text-slate-500">در اسرع وقت با شما تماس خواهیم گرفت.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-blue-600 hover:text-blue-700">ارسال پیام جدید</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">نام و نام خانوادگی *</label>
                  <input type="text" required value={form.senderName} onChange={(e) => setForm({ ...form, senderName: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="نام خود را وارد کنید" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">ایمیل *</label>
                  <input type="email" required value={form.senderEmail} onChange={(e) => setForm({ ...form, senderEmail: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">شماره تماس</label>
                  <input type="tel" value={form.senderPhone} onChange={(e) => setForm({ ...form, senderPhone: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">موضوع</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="موضوع پیام" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">پیام *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="پیام خود را بنویسید..." />
                </div>
                <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800 transition-colors disabled:opacity-50">
                  {loading ? "در حال ارسال..." : <><Send className="h-5 w-5" />ارسال پیام</>}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden min-h-[400px]">
            {settings.footer_map ? (
              <iframe
                src={settings.footer_map}
                width="100%"
                height="100%"
                className="min-h-[400px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="bg-slate-200 flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8">
                  <MapPin className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-4 text-slate-500 font-medium">نقشه موقعیت آکادمی</p>
                  <p className="mt-1 text-sm text-slate-400">لینک نقشه را در تنظیمات وارد کنید</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}