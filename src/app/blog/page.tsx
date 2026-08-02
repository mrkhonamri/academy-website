import { prisma } from "@/lib/prisma";
import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/persian-date";

const categoryLabels: Record<string, string> = {
  general: "عمومی",
  learning: "یادگیری",
  tips: "نکات آموزشی",
  exams: "آزمون‌ها",
  pronunciation: "تلفظ",
  grammar: "گرامر",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">وبلاگ</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">مقالات آموزشی</h1>
          <p className="mt-4 text-lg text-blue-100">نکات، راهنماها و مقالات مفید برای یادگیری بهتر انگلیسی</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto h-16 w-16 text-slate-300" />
            <p className="mt-4 text-slate-500">هنوز مقاله‌ای منتشر نشده است.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700">
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{post.title}</h2>
                <p className="mt-2 text-slate-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  ادامه مطلب
                  <ArrowLeft className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}