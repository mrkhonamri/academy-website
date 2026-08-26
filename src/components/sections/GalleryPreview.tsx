import Link from "next/link";
import { ArrowLeft, Video } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function GalleryPreview() {
  const featured = await prisma.galleryItem.findMany({
    where: { isFeatured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 4,
  });

  let items = featured;

  if (items.length < 4) {
    const regular = await prisma.galleryItem.findMany({
      where: { isFeatured: false },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 4 - items.length,
    });
    items = [...items, ...regular];
  }

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-blue-600">گالری</span>
          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">لحظات ماندگار</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">تصاویر و ویدیوهای کلاس‌ها و رویدادهای ما</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map(item => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 hover:scale-105 transition-all"
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                {item.type === "video" && (
                  <Video className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
            مشاهده گالری <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
