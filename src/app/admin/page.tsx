import Link from "next/link";
import { Image, Megaphone, BookOpen, BarChart3, Settings, MessageSquare, Users, Sliders, Star } from "lucide-react";

const sections = [
  { title: "اسلایدر", href: "/admin/sliders", icon: <Sliders className="h-8 w-8" />, color: "from-pink-500 to-rose-500", desc: "مدیریت اسلایدهای صفحه اصلی" },
  { title: "اخبار", href: "/admin/news", icon: <Megaphone className="h-8 w-8" />, color: "from-amber-500 to-orange-500", desc: "اخبار و اطلاعیه‌ها" },
  { title: "گالری", href: "/admin/gallery", icon: <Image className="h-8 w-8" />, color: "from-emerald-500 to-teal-500", desc: "تصاویر و ویدیوها" },
  { title: "اساتید", href: "/admin/teachers", icon: <Users className="h-8 w-8" />, color: "from-red-500 to-rose-500", desc: "مدیریت اساتید" },
  { title: "وبلاگ", href: "/admin/blog", icon: <BookOpen className="h-8 w-8" />, color: "from-violet-500 to-purple-500", desc: "مقالات آموزشی" },
  { title: "نظرسنجی", href: "/admin/polls", icon: <BarChart3 className="h-8 w-8" />, color: "from-cyan-500 to-blue-500", desc: "نظرسنجی‌ها و آرا" },
  { title: "پیام‌ها", href: "/admin/messages", icon: <MessageSquare className="h-8 w-8" />, color: "from-blue-500 to-indigo-500", desc: "پیام‌های دریافتی" },
  { title: "تنظیمات", href: "/admin/settings", icon: <Settings className="h-8 w-8" />, color: "from-slate-500 to-slate-700", desc: "تنظیمات فوتر و سایت" },
  { title: "نظرات", href: "/admin/testimonials", icon: <Star className="h-8 w-8" />, color: "from-amber-500 to-yellow-500", desc: "مدیریت نظرات دانشجویان" },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-5xl p-6" dir="rtl">
      <h1 className="text-3xl font-black text-slate-900 mb-8">پنل مدیریت</h1>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-blue-300 transition-all hover:-translate-y-1"
          >
            <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-white`}>
              {section.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              {section.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}