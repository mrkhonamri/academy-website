import Link from "next/link";
import { Phone, Mail, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">ثبت‌نام</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">همین امروز شروع کنید</h1>
          <p className="mt-4 text-lg text-blue-100">برای ثبت‌نام یا رزرو تست تعیین سطح با ما تماس بگیرید</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: <Phone className="h-8 w-8" />, title: "تماس بگیرید", desc: "۰۲۱-۱۲۳۴۵۶۷۸", color: "from-blue-500 to-cyan-500" },
            { icon: <Mail className="h-8 w-8" />, title: "ایمیل بزنید", desc: "info@academy.ir", color: "from-amber-500 to-orange-500" },
            { icon: <User className="h-8 w-8" />, title: "حضوری مراجعه کنید", desc: "تهران، خیابان ولیعصر", color: "from-emerald-500 to-teal-500" },
          ].map(item => (
            <div key={item.title} className="rounded-2xl bg-white border border-slate-200 p-8 text-center hover:shadow-lg transition-all">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white`}>{item.icon}</div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center rounded-2xl bg-white border border-slate-200 p-8">
          <h2 className="text-2xl font-black text-slate-900">تست تعیین سطح رایگان</h2>
          <p className="mt-2 text-slate-500">برای تعیین سطح دقیق خود با ما تماس بگیرید یا به آکادمی مراجعه کنید</p>
          <Link href="/contact" className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800 transition-colors">تماس با ما</Link>
        </div>
      </section>
    </div>
  );
}