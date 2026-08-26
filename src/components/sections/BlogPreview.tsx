import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/utils/persian-date";

const categoryLabels: Record<string, string> = {
  featured: "ویژه",
  general: "عمومی", learning: "یادگیری", tips: "نکات آموزشی",
  exams: "آزمون‌ها", pronunciation: "تلفظ", grammar: "گرامر",
};

export default async function BlogPreview() {
  const featured = await prisma.blogPost.findMany({
    where: { isPublished: true, category: "featured" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  let posts = featured;

  if (posts.length < 3) {
    const regular = await prisma.blogPost.findMany({
      where: { isPublished: true, category: { not: "featured" } },
      orderBy: { createdAt: "desc" },
      take: 3 - posts.length,
    });
    posts = [...posts, ...regular];
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-blue-600">وبلاگ</span>
          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">آخرین مقالات</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">نکات و راهنماهای مفید برای یادگیری بهتر انگلیسی</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-3 py-1">{categoryLabels[post.category] || post.category}</span>
              <h3 className="mt-3 font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{post.title}</h3>
              <p className="mt-2 text-xs text-slate-400">{formatDate(post.createdAt)}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
            مشاهده همه مقالات <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
