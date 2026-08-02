import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, ArrowRight } from "lucide-react";
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {categoryLabels[post.category] || post.category}
          </span>
          <h1 className="mt-6 text-3xl font-black text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-4 flex items-center justify-center gap-1 text-blue-100">
            <Calendar className="h-4 w-4" />
            {formatDate(post.createdAt)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="prose prose-slate max-w-none leading-relaxed whitespace-pre-wrap text-slate-700">
            {post.content}
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به وبلاگ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}