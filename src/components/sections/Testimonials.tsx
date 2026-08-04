import { prisma } from "@/lib/prisma";

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-blue-600">نظرات دانشجویان</span>
          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">دانشجویان ما چه می‌گویند؟</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map(item => (
            <div key={item.id} className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-3">{Array.from({ length: item.stars }).map((_, i) => <span key={i} className="text-amber-400">⭐</span>)}</div>
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
  );
}