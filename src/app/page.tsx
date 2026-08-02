import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LatestNews from "@/components/sections/LatestNews";
import HeroSlider from "@/components/sections/HeroSlider";

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
              { image: "/images/kids.png", title: "کودکان", age: "۴ تا ۷ سال", desc: "یادگیری با بازی، شعر و داستان‌های جذاب", color: "from-pink-500 to-rose-500" },
              { image: "/images/teens.png", title: "نوجوانان", age: "۸ تا ۱۶ سال", desc: "یادگیری ساختاریافته با تمرکز بر مکالمه", color: "from-blue-500 to-cyan-500" },
              { image: "/images/adults.png", title: "بزرگسالان", age: "۱۷ سال به بالا", desc: "آموزش حرفه‌ای با متدهای بین‌المللی", color: "from-violet-500 to-purple-500" },
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
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              ما متفاوت هستیم
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              ویژگی‌هایی که ما را از بقیه متمایز می‌کند
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { image: "/images/teachers.png", title: "اساتید مجرب", desc: "تمام اساتید ما دارای مدارک بین‌المللی و حداقل ۵ سال سابقه تدریس هستند" },
              { image: "/images/methods.png", title: "متدهای نوین", desc: "از جدیدترین روش‌های آموزشی دنیا مانند CLT و TBLT استفاده می‌کنیم" },
              { image: "/images/classes.png", title: "کلاس‌های کوچک", desc: "حداکثر ۸ نفر در هر کلاس تا توجه کافی به هر زبان‌آموز داشته باشیم" },
              { image: "/images/support.png", title: "پشتیبانی آنلاین", desc: "دسترسی به محتوای آموزشی و پشتیبانی از طریق پورتال دانشجویی" },
              { image: "/images/results.png", title: "نتایج اثبات‌شده", desc: "۹۸٪ دانشجویان ما در آزمون‌های بین‌المللی نمره مورد نظر را کسب کرده‌اند" },
              { image: "/images/personalized.png", title: "برنامه شخصی‌سازی‌شده", desc: "برای هر زبان‌آموز برنامه آموزشی متناسب با هدف و سطح او طراحی می‌شود" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { number: "۵۰۰۰", label: "دانشجوی موفق", suffix: "+" },
              { number: "۵۰", label: "استاد مجرب", suffix: "+" },
              { number: "۱۵", label: "سال تجربه", suffix: "+" },
              { number: "۹۸", label: "رضایت دانشجویان", suffix: "٪" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-white sm:text-5xl">
                  {stat.number}<span className="text-amber-400">{stat.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600">نظرات دانشجویان</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              دانشجویان ما چه می‌گویند؟
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              افتخار می‌کنیم که توانسته‌ایم رضایت زبان‌آموزان را جلب کنیم
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: "نیما رضایی", role: "دانشجوی آیلتس", text: "بعد از ۶ ماه کلاس در این آکادمی، نمره آیلتس من از ۵.۵ به ۷ رسید. واقعا ممنونم از اساتید عالی.", stars: 5 },
              { name: "سارا حسینی", role: "دانشجوی مکالمه", text: "فضای کلاس‌ها خیلی دوستانه و حرفه‌ایه. من که خیلی از انگلیسی متنفر بودم الان عاشقش شدم!", stars: 5 },
              { name: "امیر کریمی", role: "والدین دانشجو", text: "پسرم ۲ ساله که اینجا درس میخونه و پیشرفتش واقعا قابل توجهه. روش تدریس برای بچه‌ها عالیه.", stars: 5 },
            ].map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i} className="text-amber-400">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Gallery */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600">گالری</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              لحظات ماندگار
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              تصاویری از کلاس‌ها و رویدادهای آکادمی
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href="/gallery"
                className="group aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
              مشاهده گالری
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600">وبلاگ</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              آخرین مقالات
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              نکات و راهنماهای مفید برای یادگیری بهتر انگلیسی
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: "۱۰ روش سریع یادگیری لغات انگلیسی", date: "۱۴۰۵/۰۵/۰۱", cat: "یادگیری" },
              { title: "چگونه تلفظ خود را تقویت کنیم؟", date: "۱۴۰۵/۰۴/۲۰", cat: "تلفظ" },
              { title: "معرفی بهترین منابع آیلتس ۲۰۲۶", date: "۱۴۰۵/۰۴/۱۰", cat: "آزمون" },
            ].map((post) => (
              <Link
                key={post.title}
                href="/blog"
                className="group rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <span className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-3 py-1">{post.cat}</span>
                <h3 className="mt-3 font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{post.title}</h3>
                <p className="mt-2 text-xs text-slate-400">{post.date}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
              مشاهده همه مقالات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            آماده شروع هستید؟
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            همین امروز ثبت‌نام کنید و اولین قدم را به سمت تسلط بر انگلیسی بردارید
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="rounded-2xl bg-amber-400 px-8 py-4 font-bold text-slate-900 hover:bg-amber-300 transition-all text-lg shadow-xl shadow-amber-400/20"
            >
              🚀 شروع یادگیری
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border-2 border-slate-600 px-8 py-4 font-bold text-white hover:bg-slate-800 transition-all text-lg"
            >
              📞 مشاوره رایگان
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}