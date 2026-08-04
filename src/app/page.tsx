import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LatestNews from "@/components/sections/LatestNews";
import HeroSlider from "@/components/sections/HeroSlider";
import StatsCounter from "@/components/sections/StatsCounter";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <LatestNews />

      {/* Programs Preview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600">برنامه‌های آموزشی</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              مسیر یادگیری خود را انتخاب کنید
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              برنامه‌های آموزشی ما برای تمام سنین و سطوح طراحی شده است
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
          {[
             { image: "/images/kids.png", title: "کودکان", age: "4 تا 6 سال و 7 تا 9 سال", desc: "یادگیری با بازی، شعر و داستان‌های جذاب", color: "from-pink-500 to-rose-500" },
             { image: "/images/teens.png", title: "نوجوانان", age: "10 تا 12 سال", desc: "یادگیری ساختاریافته با تمرکز بر مکالمه", color: "from-blue-500 to-cyan-500" },
             { image: "/images/adults.png", title: "بزرگسالان", age: "18 سال به بالا", desc: "آموزش حرفه‌ای با متدهای بین‌المللی", color: "from-violet-500 to-purple-500" },
           ].map((item) => (
              <Link
                key={item.title}
                href="/programs"
                className="group rounded-2xl border border-slate-200 p-8 text-center hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
                  <img src={item.image} alt={item.title} className="h-24 w-24 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium mt-1">{item.age}</p>
                <p className="text-sm text-slate-500 mt-3">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  مشاهده برنامه‌ها
                  <ArrowLeft className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600">چرا آکادمی ما؟</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">ما متفاوت هستیم</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">ویژگی‌هایی که ما را از بقیه متمایز می‌کند</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { image: "/images/teachers.png", title: "اساتید مجرب", desc: "تمام اساتید ما دارای مدارک بین‌المللی و حداقل ۵ سال سابقه تدریس هستند" },
              { image: "/images/methods.png", title: "متدهای نوین", desc: "از جدیدترین روش‌های آموزشی دنیا استفاده می‌کنیم" },
              { image: "/images/classes.png", title: "کلاس‌های کوچک", desc: "حداکثر ۸ نفر در هر کلاس" },
              { image: "/images/support.png", title: "پشتیبانی آنلاین", desc: "دسترسی به پورتال دانشجویی" },
              { image: "/images/results.png", title: "نتایج اثبات‌شده", desc: "۹۸٪ دانشجویان نمره مورد نظر را کسب کرده‌اند" },
              { image: "/images/personalized.png", title: "برنامه شخصی‌سازی‌شده", desc: "برنامه متناسب با هدف و سطح شما" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 border border-slate-200 hover:shadow-lg transition-all text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Testimonials */}
      <Testimonials />

      {/* Gallery + Blog + CTA (keep existing) */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-sm font-medium text-blue-600">گالری</span>
          <h2 className="mt-2 text-3xl font-black">لحظات ماندگار</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[1,2,3,4].map(i => (
              <Link key={i} href="/gallery" className="group aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center hover:scale-105 transition-all">
                <span className="text-4xl opacity-0 group-hover:opacity-100">🔍</span>
              </Link>
            ))}
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium">مشاهده گالری <ArrowLeft className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-sm font-medium text-blue-600">وبلاگ</span>
          <h2 className="mt-2 text-3xl font-black">آخرین مقالات</h2>
          <div className="grid gap-6 sm:grid-cols-3 mt-8">
            {[
              { title: "۱۰ روش سریع یادگیری لغات", date: "۱۴۰۵/۰۵/۰۱", cat: "یادگیری" },
              { title: "چگونه تلفظ خود را تقویت کنیم؟", date: "۱۴۰۵/۰۴/۲۰", cat: "تلفظ" },
              { title: "منابع آیلتس ۲۰۲۶", date: "۱۴۰۵/۰۴/۱۰", cat: "آزمون" },
            ].map(post => (
              <Link key={post.title} href="/blog" className="rounded-2xl border p-6 text-right hover:shadow-lg hover:border-blue-300 transition-all">
                <span className="text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1">{post.cat}</span>
                <h3 className="mt-3 font-bold hover:text-blue-700">{post.title}</h3>
                <p className="mt-2 text-xs text-slate-400">{post.date}</p>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium">مشاهده همه <ArrowLeft className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black text-white sm:text-4xl">آماده شروع هستید؟</h2>
          <p className="mt-4 text-lg text-slate-300">همین امروز ثبت‌نام کنید</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="rounded-2xl bg-amber-400 px-8 py-4 font-bold text-slate-900 hover:bg-amber-300 text-lg shadow-xl">🚀 شروع یادگیری</Link>
            <Link href="/contact" className="rounded-2xl border-2 border-slate-600 px-8 py-4 font-bold text-white hover:bg-slate-800 text-lg">📞 مشاوره رایگان</Link>
          </div>
        </div>
      </section>
    </main>
  );
}